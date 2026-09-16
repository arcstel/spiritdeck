import { Input, Scene } from "./engine";
import { HallScene } from "./hall";
import {
  DIR_VEC,
  Dungeon,
  ITEMS,
  Member,
  MonsterInstance,
  SPELLS,
  TILE_CHEST,
  TILE_STAIRS,
  TILE_WALL,
  elementMult,
  rollEncounter,
} from "./data";
import {
  C,
  drawAutomap,
  drawCompass,
  drawMemberCard,
  drawMessage,
  drawMonsterCard,
  frame,
  rect,
  renderView,
  text,
  textCenter,
} from "./render";
import type { ViewState } from "./view3d";

export interface Host {
  party: Member[];
  inventory: Record<string, number>;
  gold: number;
  dungeon: Dungeon;
  gpu: boolean;
  setScene(s: Scene): void;
}

const LX = 0;
const RX = 308;
const PANEL_W = 76;
export const VIEW = { x: 80, y: 6, w: 224, h: 134 };
const MSG = { x: 80, y: 150, w: 224, h: 62 };
const FACING = ["N", "E", "S", "W"];
const ENCOUNTERS = false;

/* ================================================================== */
/* Title                                                              */
/* ================================================================== */

export class TitleScene implements Scene {
  private t = 0;
  constructor(private host: Host) {}

  update(dt: number, input: Input): void {
    this.t += dt;
    if (input.justPressed("confirm")) this.host.setScene(new HallScene(this.host));
  }

  render(ctx: CanvasRenderingContext2D): void {
    rect(ctx, 0, 0, 256, 224, C.bg);
    for (let y = 20; y < 120; y += 4) {
      const a = 0.06 + 0.05 * Math.sin((y + this.t * 30) * 0.2);
      rect(ctx, 0, y, 256, 2, `rgba(200,140,60,${a.toFixed(3)})`);
    }
    textCenter(ctx, "S P I R I T D E C K", 192, 62, C.gold, 16);
    textCenter(ctx, "a first-person deck-delve", 192, 84, C.dim, 8);
    if (Math.floor(this.t * 2) % 2 === 0) textCenter(ctx, "PRESS  ENTER", 192, 140, C.text, 8);
    textCenter(ctx, "arrows / WASD    M map    Z confirm    X cancel", 192, 198, C.dim, 8);
  }
}

/* ================================================================== */
/* Dungeon explorer                                                    */
/* ================================================================== */

export class DungeonScene implements Scene {
  private seen: Uint8Array;
  private px: number;
  private py: number;
  private dir: number;
  private msg: string[];
  private showMap = false;
  private stepTimer = 0;
  private shake = 0;
  private time = 0;

  constructor(private host: Host) {
    this.seen = new Uint8Array(host.dungeon.w * host.dungeon.h);
    this.px = host.dungeon.start.x;
    this.py = host.dungeon.start.y;
    this.dir = host.dungeon.start.dir;
    this.discover();
    this.msg = [`${host.dungeon.name}. The air is cold and still.`];
  }

  private get d(): Dungeon {
    return this.host.dungeon;
  }

  private discover(): void {
    for (let y = this.py - 2; y <= this.py + 2; y++) {
      for (let x = this.px - 2; x <= this.px + 2; x++) {
        if (x < 0 || y < 0 || x >= this.d.w || y >= this.d.h) continue;
        this.seen[y * this.d.w + x] = 1;
      }
    }
  }

  setPose(x: number, y: number, dir: number): void {
    this.px = x;
    this.py = y;
    this.dir = dir;
    this.discover();
    this.msg = [`Facing ${FACING[this.dir]}.`];
  }

  viewState(): ViewState | null {
    if (this.showMap) return null;
    return { map: this.d, pos: [this.px + 0.5, this.py + 0.5], dir: this.dir, time: this.time };
  }

  update(dt: number, input: Input): void {
    this.stepTimer -= dt;
    this.shake = Math.max(0, this.shake - dt);
    this.time += dt;
    if (input.justPressed("map")) this.showMap = !this.showMap;
    if (this.stepTimer > 0) return;

    if (input.held("left")) {
      this.dir = (this.dir + 3) % 4;
      this.stepTimer = 0.16;
    } else if (input.held("right")) {
      this.dir = (this.dir + 1) % 4;
      this.stepTimer = 0.16;
    } else if (input.held("up")) {
      this.step(1);
      this.stepTimer = 0.18;
    } else if (input.held("down")) {
      this.step(-1);
      this.stepTimer = 0.18;
    }
  }

  private step(sign: number): void {
    const v = DIR_VEC[this.dir];
    const nx = this.px + v.x * sign;
    const ny = this.py + v.y * sign;
    if (nx < 0 || ny < 0 || nx >= this.d.w || ny >= this.d.h) return;
    const t = this.d.tiles[ny * this.d.w + nx];
    if (t === TILE_WALL) {
      this.msg = ["A rough stone wall blocks the way."];
      this.shake = 0.12;
      return;
    }
    this.px = nx;
    this.py = ny;
    this.discover();

    if (t === TILE_CHEST) {
      this.d.tiles[ny * this.d.w + nx] = 0;
      const roll = Math.random();
      if (roll < 0.5) {
        this.host.inventory.draught = (this.host.inventory.draught ?? 0) + 1;
        this.msg = ["A reliquary! You gain a Cinder Draught."];
      } else if (roll < 0.8) {
        this.host.inventory.dew = (this.host.inventory.dew ?? 0) + 1;
        this.msg = ["A vellum pouch. You gain Spirit Dew."];
      } else {
        this.host.gold += 30;
        this.msg = ["Loose coins spill from a broken casket. +30 gold."];
      }
      return;
    }
    if (t === TILE_STAIRS) {
      this.msg = ["A stair spirals down, but the way is sealed. (End of slice.)"];
      return;
    }

    if (ENCOUNTERS && sign > 0 && Math.random() < 0.16) {
      const size = Math.random() < 0.3 ? 3 : 2;
      const monsters = rollEncounter((Math.random() * 1e9) | 0, size);
      const battle = new BattleScene(this.host, monsters, (result) => {
        if (result === "win") {
          this.msg = ["The corridor falls silent again."];
        } else {
          this.msg = ["You wake at the vault mouth, bruised."];
          for (const m of this.host.party) m.hp = Math.max(1, Math.floor(m.maxHp / 2));
          this.px = this.d.start.x;
          this.py = this.d.start.y;
          this.dir = this.d.start.dir;
          this.discover();
        }
        this.host.setScene(this);
      });
      this.host.setScene(battle);
      return;
    }
    this.msg = [`Corridor. Facing ${FACING[this.dir]}.`];
  }

  render(ctx: CanvasRenderingContext2D): void {
    rect(ctx, 0, 0, 256, 224, C.bg);
    const ox = this.shake > 0 ? (Math.random() < 0.5 ? -1 : 1) : 0;

    if (this.showMap) {
      ctx.save();
      ctx.translate(ox, 0);
      drawAutomap(ctx, this.d, this.seen, this.px, this.py, this.dir, VIEW.x, VIEW.y, VIEW.w, VIEW.h);
      ctx.restore();
    } else if (!this.host.gpu) {
      ctx.save();
      ctx.translate(ox, 0);
      renderView(ctx, this.d, this.px, this.py, this.dir, VIEW.x, VIEW.y, VIEW.w, VIEW.h, this.time);
      ctx.restore();
    } else {
      ctx.clearRect(VIEW.x, VIEW.y, VIEW.w, VIEW.h);
    }

    viewBorder(ctx);

    drawMemberCard(ctx, this.host.party[0], LX, 4, PANEL_W, 100, false);
    drawMemberCard(ctx, this.host.party[1], LX, 108, PANEL_W, 100, false);
    drawMemberCard(ctx, this.host.party[2], RX, 4, PANEL_W, 100, false);
    drawMemberCard(ctx, this.host.party[3], RX, 108, PANEL_W, 100, false);

    drawCompass(ctx, this.dir, 192, 124);
    drawMessage(ctx, MSG.x, MSG.y, MSG.w, MSG.h, [...this.msg, "", `Gold ${this.host.gold}`]);
    text(ctx, this.showMap ? "[M] view" : "[M] map", MSG.x + 4, MSG.y - 9, C.dim, 8);
  }
}

function viewBorder(ctx: CanvasRenderingContext2D): void {
  rect(ctx, VIEW.x - 2, VIEW.y - 2, VIEW.w + 4, 1, C.gold);
  rect(ctx, VIEW.x - 2, VIEW.y + VIEW.h + 1, VIEW.w + 4, 1, C.gold);
  rect(ctx, VIEW.x - 2, VIEW.y - 2, 1, VIEW.h + 4, C.gold);
  rect(ctx, VIEW.x + VIEW.w + 1, VIEW.y - 2, 1, VIEW.h + 4, C.gold);
}

/* ================================================================== */
/* Card battle                                                         */
/* ================================================================== */

type BPhase =
  | "intro"
  | "command"
  | "target"
  | "skill"
  | "ally"
  | "item"
  | "busy"
  | "victory"
  | "defeat";

export class BattleScene implements Scene {
  private phase: BPhase = "intro";
  private log: string[] = [];
  private wait = 0;
  private queue: number[] = [];
  private qi = 0;
  private enemyQ: number[] = [];
  private ei = 0;
  private menu = 0;
  private sub = 0;
  private target = 0;
  private flash: number[];
  private shake = 0;
  private pendingSpell: string | null = null;
  private pendingItem: string | null = null;
  private readonly menuOptions = ["Attack", "Skill", "Item", "Guard"];

  constructor(
    private host: Host,
    private monsters: MonsterInstance[],
    private onEnd: (result: "win" | "lose") => void
  ) {
    this.flash = monsters.map(() => 0);
    this.push([`${monsters.length} cards are dealt!`]);
    this.beginRound();
  }

  private actor(): Member {
    return this.host.party[this.queue[this.qi]];
  }
  private actorIndex(): number {
    return this.phase === "command" ? this.queue[this.qi] : -1;
  }
  private livingEnemies(): number[] {
    return this.monsters.map((m, i) => (m.hp > 0 ? i : -1)).filter((i) => i >= 0);
  }
  private livingAllies(): number[] {
    return this.host.party.map((m, i) => (m.hp > 0 ? i : -1)).filter((i) => i >= 0);
  }
  private push(lines: string[]): void {
    this.log.push(...lines);
    if (this.log.length > 6) this.log = this.log.slice(-6);
  }

  private beginRound(): void {
    this.queue = this.host.party
      .map((m, i) => ({ i, s: m.spd }))
      .filter((o) => this.host.party[o.i].hp > 0)
      .sort((a, b) => b.s - a.s)
      .map((o) => o.i);
    this.qi = 0;
    this.beginActor();
  }

  private beginActor(): void {
    if (this.qi >= this.queue.length) {
      this.phase = "busy";
      this.enemyQ = this.livingEnemies();
      this.ei = 0;
      this.wait = 0.35;
      return;
    }
    this.phase = "command";
    this.menu = 0;
  }

  private endActor(): void {
    this.qi++;
    this.beginActor();
  }

  private resolveAttack(atk: Member, targetIdx: number): void {
    const m = this.monsters[targetIdx];
    const mult = elementMult(atk.element, m.element);
    const dmg = Math.max(1, Math.round((atk.atk * 2 - m.def) * mult * (0.9 + Math.random() * 0.2)));
    m.hp = Math.max(0, m.hp - dmg);
    this.flash[targetIdx] = 0.5;
    this.shake = 0.15;
    const verb = mult > 1 ? "crushes" : mult < 1 ? "clips" : "strikes";
    this.push([`${atk.name} ${verb} ${m.name} — ${dmg} dmg.`]);
    if (m.hp <= 0) this.push([`${m.name} shatters into light.`]);
  }

  private resolveSpell(atk: Member, spellId: string, targetIdx: number): void {
    const sp = SPELLS[spellId];
    atk.mp -= sp.cost;
    if (sp.kind === "attack") {
      if (sp.target === "all-enemies") {
        for (let i = 0; i < this.monsters.length; i++) {
          const m = this.monsters[i];
          if (m.hp <= 0) continue;
          const mult = elementMult(sp.element, m.element);
          const dmg = Math.max(1, Math.round((sp.power + atk.atk) * mult));
          m.hp = Math.max(0, m.hp - dmg);
          this.flash[i] = 0.5;
          if (m.hp <= 0) this.push([`${m.name} shatters into light.`]);
        }
        this.shake = 0.2;
        this.push([`${atk.name} looses ${sp.name} at every foe!`]);
      } else {
        const m = this.monsters[targetIdx];
        const mult = elementMult(sp.element, m.element);
        const dmg = Math.max(1, Math.round((sp.power + atk.atk) * mult));
        m.hp = Math.max(0, m.hp - dmg);
        this.flash[targetIdx] = 0.6;
        this.shake = 0.18;
        this.push([`${atk.name} casts ${sp.name} — ${dmg} dmg.`]);
        if (m.hp <= 0) this.push([`${m.name} shatters into light.`]);
      }
    } else if (sp.kind === "heal") {
      const ally = this.host.party[targetIdx];
      const heal = Math.min(ally.maxHp - ally.hp, sp.power + atk.lv * 2);
      ally.hp += heal;
      this.push([`${atk.name} casts ${sp.name}. ${ally.name} recovers ${heal} HP.`]);
    } else {
      const ally = this.host.party[targetIdx];
      ally.guard += sp.power;
      this.push([`${atk.name} casts ${sp.name}. ${ally.name}'s guard rises.`]);
    }
  }

  private useItem(user: Member, itemId: string, targetIdx: number): void {
    const it = ITEMS[itemId];
    this.host.inventory[itemId] = (this.host.inventory[itemId] ?? 0) - 1;
    const ally = this.host.party[targetIdx];
    if (it.kind === "heal") {
      const h = Math.min(ally.maxHp - ally.hp, it.power);
      ally.hp += h;
      this.push([`${user.name} uses ${it.name}. ${ally.name} recovers ${h} HP.`]);
    } else {
      const h = Math.min(ally.maxMp - ally.mp, it.power);
      ally.mp += h;
      this.push([`${user.name} uses ${it.name}. ${ally.name} recovers ${h} MP.`]);
    }
  }

  private checkEnd(): boolean {
    if (this.livingEnemies().length === 0) {
      this.phase = "victory";
      const xp = this.monsters.reduce((s, m) => s + m.xp, 0);
      const gold = this.monsters.reduce((s, m) => s + m.gold, 0);
      this.host.gold += gold;
      this.push([`Victory! +${xp} XP, +${gold} gold.`, "Press Z."]);
      return true;
    }
    if (this.livingAllies().length === 0) {
      this.phase = "defeat";
      this.push(["The party falls...", "Press Z."]);
      return true;
    }
    return false;
  }

  private enemyAct(): void {
    const living = this.livingAllies();
    const targetIdx = living[(Math.random() * living.length) | 0];
    const ally = this.host.party[targetIdx];
    const ei = this.enemyQ[this.ei];
    const m = this.monsters[ei];
    if (!m || m.hp <= 0) {
      this.ei++;
      return;
    }
    const mult = elementMult(m.element, ally.element);
    const dmg = Math.max(
      1,
      Math.round((m.atk * 2 - (ally.def + ally.guard)) * mult * (0.9 + Math.random() * 0.2))
    );
    ally.hp = Math.max(0, ally.hp - dmg);
    this.shake = 0.18;
    this.push([`${m.name} strikes ${ally.name} — ${dmg} dmg.`]);
    if (ally.hp <= 0) this.push([`${ally.name} can fight no longer!`]);
    this.ei++;
  }

  update(dt: number, input: Input): void {
    this.flash = this.flash.map((f) => Math.max(0, f - dt * 2.5));
    this.shake = Math.max(0, this.shake - dt);
    for (const m of this.host.party) m.guard = Math.max(0, m.guard - dt * 4);

    if (this.wait > 0) {
      this.wait -= dt;
      return;
    }

    switch (this.phase) {
      case "intro":
        this.phase = "command";
        break;

      case "busy":
        if (this.checkEnd()) return;
        if (this.ei < this.enemyQ.length) {
          this.enemyAct();
          this.wait = 0.5;
          if (this.checkEnd()) return;
          if (this.ei >= this.enemyQ.length) this.beginRound();
        } else {
          this.beginRound();
        }
        break;

      case "command": {
        if (input.justPressed("up")) this.menu = (this.menu + 3) % 4;
        if (input.justPressed("down")) this.menu = (this.menu + 1) % 4;
        if (input.justPressed("confirm")) {
          const a = this.actor();
          if (this.menu === 0) {
            this.phase = "target";
            this.target = this.livingEnemies()[0] ?? 0;
          } else if (this.menu === 1) {
            if (a.spells.length === 0) this.push([`${a.name} knows no arts.`]);
            else {
              this.phase = "skill";
              this.sub = 0;
            }
          } else if (this.menu === 2) {
            this.phase = "item";
            this.sub = 0;
          } else {
            a.guard += 6;
            this.push([`${a.name} guards.`]);
            this.endActor();
          }
        }
        break;
      }

      case "target": {
        const living = this.livingEnemies();
        const pos = Math.max(0, living.indexOf(this.target));
        if (input.justPressed("left")) this.target = living[(pos + living.length - 1) % living.length];
        if (input.justPressed("right")) this.target = living[(pos + 1) % living.length];
        if (input.justPressed("cancel")) {
          this.phase = "command";
          this.pendingSpell = null;
        }
        if (input.justPressed("confirm")) {
          if (this.pendingSpell) {
            this.resolveSpell(this.actor(), this.pendingSpell, this.target);
            this.pendingSpell = null;
          } else {
            this.resolveAttack(this.actor(), this.target);
          }
          if (this.checkEnd()) return;
          this.wait = 0.45;
          this.endActor();
        }
        break;
      }

      case "skill": {
        const a = this.actor();
        if (a.spells.length === 0) {
          this.phase = "command";
          break;
        }
        if (input.justPressed("up")) this.sub = (this.sub + a.spells.length - 1) % a.spells.length;
        if (input.justPressed("down")) this.sub = (this.sub + 1) % a.spells.length;
        if (input.justPressed("cancel")) this.phase = "command";
        if (input.justPressed("confirm")) {
          const sp = SPELLS[a.spells[this.sub]];
          if (a.mp < sp.cost) {
            this.push([`Not enough MP for ${sp.name}.`]);
          } else if (sp.target === "enemy") {
            this.pendingSpell = sp.id;
            this.phase = "target";
            this.target = this.livingEnemies()[0] ?? 0;
          } else if (sp.target === "all-enemies") {
            this.resolveSpell(a, sp.id, 0);
            if (this.checkEnd()) return;
            this.wait = 0.5;
            this.endActor();
          } else {
            this.pendingSpell = sp.id;
            this.phase = "ally";
            this.target = this.livingAllies()[0] ?? 0;
          }
        }
        break;
      }

      case "ally": {
        const living = this.livingAllies();
        const pos = Math.max(0, living.indexOf(this.target));
        if (input.justPressed("left")) this.target = living[(pos + living.length - 1) % living.length];
        if (input.justPressed("right")) this.target = living[(pos + 1) % living.length];
        if (input.justPressed("cancel")) {
          this.pendingSpell = null;
          this.pendingItem = null;
          this.phase = "command";
        }
        if (input.justPressed("confirm")) {
          if (this.pendingItem) this.useItem(this.actor(), this.pendingItem, this.target);
          else if (this.pendingSpell) this.resolveSpell(this.actor(), this.pendingSpell, this.target);
          this.pendingSpell = null;
          this.pendingItem = null;
          this.wait = 0.45;
          this.endActor();
        }
        break;
      }

      case "item": {
        const items = Object.keys(this.host.inventory).filter((k) => (this.host.inventory[k] ?? 0) > 0);
        if (items.length === 0) {
          this.phase = "command";
          break;
        }
        if (input.justPressed("up")) this.sub = (this.sub + items.length - 1) % items.length;
        if (input.justPressed("down")) this.sub = (this.sub + 1) % items.length;
        if (input.justPressed("cancel")) this.phase = "command";
        if (input.justPressed("confirm")) {
          this.pendingItem = items[this.sub];
          this.phase = "ally";
          this.target = this.livingAllies()[0] ?? 0;
        }
        break;
      }

      case "victory":
      case "defeat":
        if (input.justPressed("confirm")) this.onEnd(this.phase === "victory" ? "win" : "lose");
        break;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    rect(ctx, 0, 0, 256, 224, C.bg);
    const ox = this.shake > 0 ? (Math.random() < 0.5 ? -1 : 1) : 0;
    ctx.save();
    ctx.translate(ox, 0);

    frame(ctx, VIEW.x - 2, VIEW.y - 2, VIEW.w + 4, VIEW.h + 4, "#0a0a10", C.gold, C.goldLo);
    const n = this.monsters.length;
    const cw = 36;
    const gap = Math.min(10, Math.max(2, Math.floor((VIEW.w - n * cw) / (n + 1))));
    const total = n * cw + (n - 1) * gap;
    let cx = VIEW.x + (VIEW.w - total) / 2;
    for (let i = 0; i < n; i++) {
      const m = this.monsters[i];
      const selected = this.phase === "target" && this.target === i;
      if (m.hp > 0) {
        drawMonsterCard(ctx, m, cx, VIEW.y + 26, cw, 74, selected, this.flash[i]);
      } else {
        rect(ctx, cx, VIEW.y + 26, cw, 74, "#101018");
        textCenter(ctx, "—", cx + cw / 2, VIEW.y + 58, C.dim, 8);
      }
      cx += cw + gap;
    }
    ctx.restore();

    const ai = this.actorIndex();
    drawMemberCard(ctx, this.host.party[0], LX, 4, PANEL_W, 100, ai === 0);
    drawMemberCard(ctx, this.host.party[1], LX, 108, PANEL_W, 100, ai === 1);
    drawMemberCard(ctx, this.host.party[2], RX, 4, PANEL_W, 100, ai === 2);
    drawMemberCard(ctx, this.host.party[3], RX, 108, PANEL_W, 100, ai === 3);

    if (this.phase === "command") {
      this.drawMenu(ctx, this.menuOptions, this.menu, "Command");
    } else if (this.phase === "skill") {
      const a = this.actor();
      this.drawMenu(ctx, a.spells.map((s) => `${SPELLS[s].name}  ${SPELLS[s].cost}mp`), this.sub, "Arts");
    } else if (this.phase === "item") {
      const items = Object.keys(this.host.inventory).filter((k) => (this.host.inventory[k] ?? 0) > 0);
      this.drawMenu(
        ctx,
        items.length ? items.map((k) => `${ITEMS[k].name} x${this.host.inventory[k]}`) : ["(none)"],
        this.sub,
        "Items"
      );
    } else if (this.phase === "target" || this.phase === "ally") {
      drawMessage(ctx, MSG.x, MSG.y, MSG.w, MSG.h, ["Choose a card.  < >  pick,  Z  confirm,  X  back."]);
    } else {
      drawMessage(ctx, MSG.x, MSG.y, MSG.w, MSG.h, this.log);
    }
  }

  private drawMenu(ctx: CanvasRenderingContext2D, opts: string[], sel: number, title: string): void {
    drawMessage(ctx, MSG.x, MSG.y, MSG.w, MSG.h, this.log);
    frame(ctx, MSG.x + 4, MSG.y + 4, MSG.w - 8, MSG.h - 8, "#101018", C.bevelHi, C.bevelLo);
    text(ctx, title, MSG.x + 8, MSG.y + 7, C.gold, 8);
    let oy = MSG.y + 19;
    for (let i = 0; i < opts.length; i++) {
      const on = i === sel;
      text(ctx, `${on ? ">" : " "} ${opts[i]}`, MSG.x + 8, oy, on ? C.gold : C.text, 8);
      oy += 11;
    }
  }
}
