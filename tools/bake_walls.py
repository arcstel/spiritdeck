import bpy
import os
import math

SRC = "/tmp/opencode/wallkit"
OUT = "/home/xyzam/games/spiritdeck/public/textures"

MODULES = [
    ("01_straight_pillared", "wall"),
    ("04_twin_niches", "wall2"),
    ("07_collapsed_wall", "wall3"),
]

RES_X = 512
RES_Y = 448


def import_obj(path):
    if hasattr(bpy.ops.wm, "obj_import"):
        bpy.ops.wm.obj_import(filepath=path, forward_axis="NEGATIVE_Y", up_axis="Z", global_scale=1.0)
    else:
        bpy.ops.import_scene.obj(filepath=path, axis_forward="-Y", axis_up="Z")


def bounds():
    mn = [1e9, 1e9, 1e9]
    mx = [-1e9, -1e9, -1e9]
    for ob in bpy.context.scene.objects:
        if ob.type != "MESH":
            continue
        for v in ob.data.vertices:
            w = ob.matrix_world @ v.co
            for i in range(3):
                mn[i] = min(mn[i], w[i])
                mx[i] = max(mx[i], w[i])
    return mn, mx


def make_stone_material():
    mat = bpy.data.materials.new("stone")
    mat.use_nodes = True
    nt = mat.node_tree
    nodes, links = nt.nodes, nt.links
    bsdf = nodes.get("Principled BSDF")

    n1 = nodes.new("ShaderNodeTexNoise")
    n1.inputs["Scale"].default_value = 9.0
    n1.inputs["Detail"].default_value = 8.0
    n1.location = (-700, 200)

    n2 = nodes.new("ShaderNodeTexNoise")
    n2.inputs["Scale"].default_value = 48.0
    n2.inputs["Detail"].default_value = 6.0
    n2.location = (-700, -200)

    ramp = nodes.new("ShaderNodeValToRGB")
    ramp.location = (-420, 200)
    ramp.color_ramp.elements[0].position = 0.30
    ramp.color_ramp.elements[0].color = (0.115, 0.105, 0.088, 1)
    ramp.color_ramp.elements[1].position = 0.75
    ramp.color_ramp.elements[1].color = (0.42, 0.39, 0.32, 1)
    links.new(n1.outputs["Fac"], ramp.inputs["Fac"])

    tint = nodes.new("ShaderNodeMixRGB")
    tint.blend_type = "MULTIPLY"
    tint.inputs["Fac"].default_value = 0.35
    tint.inputs["Color2"].default_value = (0.75, 0.85, 0.72, 1)
    links.new(ramp.outputs["Color"], tint.inputs["Color1"])
    links.new(tint.outputs["Color"], bsdf.inputs["Base Color"])

    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.55
    bump.location = (-420, -220)
    links.new(n2.outputs["Fac"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    bsdf.inputs["Roughness"].default_value = 0.92
    return mat


def setup_scene():
    scene = bpy.context.scene
    mn, mx = bounds()
    print("BBOX", [round(v, 3) for v in mn], [round(v, 3) for v in mx])
    cx = (mn[0] + mx[0]) / 2
    cz = (mn[2] + mx[2]) / 2
    x_ext = mx[0] - mn[0]
    z_ext = mx[2] - mn[2]
    width = max(x_ext, z_ext * (RES_X / RES_Y))
    try:
        scene.render.engine = "CYCLES"
        scene.cycles.samples = 64
        scene.cycles.use_denoising = True
    except Exception:
        pass
    scene.render.resolution_x = RES_X
    scene.render.resolution_y = RES_Y
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.film_transparent = False

    world = bpy.data.worlds.new("W")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.012, 0.013, 0.018, 1)
        bg.inputs[1].default_value = 1.0

    cam_data = bpy.data.cameras.new("Cam")
    cam_data.type = "ORTHO"
    cam_data.ortho_scale = width
    cam = bpy.data.objects.new("Cam", cam_data)
    cam.location = (cx, -7.0, cz)
    cam.rotation_euler = (math.pi / 2, 0, 0)
    scene.collection.objects.link(cam)
    scene.camera = cam

    for name, loc, energy in [
        ("Key", (-2.5, -5.0, 4.5), 4.0),
        ("Fill", (3.5, -4.0, 2.2), 1.2),
    ]:
        ld = bpy.data.lights.new(name, "AREA")
        ld.energy = energy * 60
        ld.size = 5.0
        lo = bpy.data.objects.new(name, ld)
        lo.location = loc
        lo.rotation_euler = (math.pi / 2, 0, 0)
        scene.collection.objects.link(lo)


def assign(mat):
    for ob in bpy.context.scene.objects:
        if ob.type == "MESH":
            ob.data.materials.clear()
            ob.data.materials.append(mat)


def bake(name, out_tag):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    import_obj(os.path.join(SRC, name + ".obj"))
    mat = make_stone_material()
    assign(mat)
    setup_scene()
    bpy.context.scene.render.filepath = os.path.join(OUT, out_tag + ".png")
    bpy.ops.render.render(write_still=True)
    print("BAKED", out_tag)


for mod, tag in MODULES:
    try:
        bake(mod, tag)
    except Exception as exc:
        print("FAILED", mod, exc)
