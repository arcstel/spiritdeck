import bpy
import math
import random
import os

OUT = "/home/xyzam/games/spiritdeck/public/textures"
RES_X = 512
RES_Y = 448
W = 4.0
H = 3.5
FRONT = -0.16


def clear():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def cube(name, cx, cy, cz, sx, sy, sz, ry=0.0, rz=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(cx, cy, cz))
    ob = bpy.context.active_object
    ob.name = name
    ob.scale = (sx, sy, sz)
    ob.rotation_euler = (0.0, ry, rz)
    return ob


def make_stone_material():
    mat = bpy.data.materials.new("stone")
    mat.use_nodes = True
    nt = mat.node_tree
    nodes, links = nt.nodes, nt.links
    bsdf = nodes.get("Principled BSDF")

    n1 = nodes.new("ShaderNodeTexNoise")
    n1.inputs["Scale"].default_value = 7.0
    n1.inputs["Detail"].default_value = 10.0
    node = nodes.new("ShaderNodeTexVoronoi")
    node.inputs["Scale"].default_value = 22.0

    ramp = nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.28
    ramp.color_ramp.elements[0].color = (0.10, 0.095, 0.082, 1)
    ramp.color_ramp.elements[1].position = 0.78
    ramp.color_ramp.elements[1].color = (0.40, 0.37, 0.31, 1)
    links.new(n1.outputs["Fac"], ramp.inputs["Fac"])

    mix = nodes.new("ShaderNodeMixRGB")
    mix.blend_type = "OVERLAY"
    mix.inputs["Fac"].default_value = 0.45
    links.new(ramp.outputs["Color"], mix.inputs["Color1"])
    links.new(node.outputs["Distance"], mix.inputs["Color2"])
    links.new(mix.outputs["Color"], bsdf.inputs["Base Color"])

    n2 = nodes.new("ShaderNodeTexNoise")
    n2.inputs["Scale"].default_value = 60.0
    n2.inputs["Detail"].default_value = 8.0
    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.7
    links.new(n2.outputs["Fac"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    bsdf.inputs["Roughness"].default_value = 0.95
    return mat


def build_wall(seed):
    random.seed(seed)
    rows = 6
    row_h = H / rows
    for r in range(rows):
        z = (r + 0.5) * row_h
        x = -W / 2 - random.uniform(0, 0.4)
        while x < W / 2 - 0.04:
            bw = random.uniform(0.5, 1.25)
            if x + bw > W / 2:
                bw = W / 2 - x
            gap = random.uniform(0.02, 0.06)
            w = max(0.18, bw - gap)
            depth = random.uniform(0.30, 0.46)
            recess = random.uniform(0.0, 0.09)
            if random.random() < 0.08:
                recess += random.uniform(0.08, 0.16)
            yc = FRONT + recess + depth / 2
            zz = z + random.uniform(-0.012, 0.012)
            cube(
                f"b_{r}",
                x + w / 2,
                yc,
                zz,
                w,
                depth,
                row_h - gap,
                ry=random.uniform(-0.012, 0.012),
                rz=random.uniform(-0.006, 0.006),
            )
            x += bw

    # plinth + cornice for structure
    cube("plinth", 0, FRONT + 0.22, 0.09, W + 0.2, 0.44, 0.18)
    cube("cornice", 0, FRONT + 0.34, H - 0.06, W + 0.2, 0.5, 0.16)


def setup_lighting_camera():
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 72
    scene.cycles.use_denoising = True
    scene.render.resolution_x = RES_X
    scene.render.resolution_y = RES_Y
    scene.render.image_settings.file_format = "PNG"
    scene.render.film_transparent = False

    world = bpy.data.worlds.new("W")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    bg.inputs[0].default_value = (0.012, 0.013, 0.018, 1)

    cd = bpy.data.cameras.new("Cam")
    cd.type = "ORTHO"
    cd.ortho_scale = W
    cam = bpy.data.objects.new("Cam", cd)
    cam.location = (0, -7.0, H / 2)
    cam.rotation_euler = (math.pi / 2, 0, 0)
    scene.collection.objects.link(cam)
    scene.camera = cam

    for name, loc, energy in [
        ("Key", (-2.0, -4.5, 4.2), 260),
        ("Fill", (3.0, -3.5, 1.8), 90),
        ("Rim", (1.5, -3.0, 4.6), 70),
    ]:
        ld = bpy.data.lights.new(name, "AREA")
        ld.energy = energy
        ld.size = 4.5
        lo = bpy.data.objects.new(name, ld)
        lo.location = loc
        lo.rotation_euler = (math.pi / 2, 0, 0)
        scene.collection.objects.link(lo)


for tag, seed in [("wall", 11), ("wall2", 29), ("wall3", 47)]:
    clear()
    build_wall(seed)
    mat = make_stone_material()
    for ob in bpy.context.scene.objects:
        if ob.type == "MESH":
            ob.data.materials.clear()
            ob.data.materials.append(mat)
    setup_lighting_camera()
    bpy.context.scene.render.filepath = os.path.join(OUT, tag + ".png")
    bpy.ops.render.render(write_still=True)
    print("BAKED", tag)
