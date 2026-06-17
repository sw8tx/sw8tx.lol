"""
Procedurally generate a stylized ice cube GLB for Sparkle.

Run from the project root with Blender:
blender --background --python scripts/create-icecube-asset.py
"""

from __future__ import annotations

from pathlib import Path
import math
import random
import sys


def main() -> int:
    try:
        import bpy
        import bmesh
    except ModuleNotFoundError:
        print("Blender Python API not available. Run this script with Blender CLI.")
        return 0

    project_root = Path(__file__).resolve().parents[1]
    output_dir = project_root / "public" / "models"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "icecube.glb"

    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE_NEXT"

    random.seed(8)

    def make_material(name: str, base_color: tuple[float, float, float, float], transmission: float = 0.0, roughness: float = 0.2):
        material = bpy.data.materials.new(name=name)
        material.use_nodes = True
        bsdf = material.node_tree.nodes.get("Principled BSDF")
        if bsdf is None:
            return material
        bsdf.inputs["Base Color"].default_value = base_color
        bsdf.inputs["Transmission Weight"].default_value = transmission
        bsdf.inputs["Roughness"].default_value = roughness
        bsdf.inputs["IOR"].default_value = 1.31
        return material

    ice_body = make_material("IceBody", (0.82, 0.93, 1.0, 1.0), transmission=1.0, roughness=0.16)
    frosted_edges = make_material("FrostedEdges", (0.92, 0.97, 1.0, 1.0), transmission=0.55, roughness=0.58)
    crack_lines = make_material("CrackLines", (0.85, 0.96, 1.0, 1.0), transmission=0.0, roughness=0.08)
    inner_bubbles = make_material("InnerBubbles", (1.0, 1.0, 1.0, 1.0), transmission=0.0, roughness=0.06)
    sparkle_mark = make_material("SparkleMark", (0.95, 0.98, 1.0, 1.0), transmission=0.0, roughness=0.15)

    bpy.ops.mesh.primitive_cube_add(size=2.0, location=(0, 0, 0))
    cube = bpy.context.active_object
    cube.name = "IceCube"

    bm = bmesh.new()
    bm.from_mesh(cube.data)
    bmesh.ops.bevel(
        bm,
        geom=bm.edges[:],
        offset=0.12,
        segments=5,
        profile=0.7,
        affect="EDGES",
    )

    for vert in bm.verts:
        vert.co.x += random.uniform(-0.08, 0.08)
        vert.co.y += random.uniform(-0.08, 0.08)
        vert.co.z += random.uniform(-0.08, 0.08)

    bm.to_mesh(cube.data)
    bm.free()

    bevel = cube.modifiers.new(name="Subdivision", type="SUBSURF")
    bevel.levels = 2
    bpy.ops.object.shade_smooth()
    cube.data.materials.append(ice_body)

    bpy.ops.mesh.primitive_cube_add(size=2.05, location=(0, 0, 0))
    edge_shell = bpy.context.active_object
    edge_shell.name = "FrostedShell"
    edge_shell.scale = (1.01, 1.01, 1.01)
    edge_shell.data.materials.append(frosted_edges)

    edge_mod = edge_shell.modifiers.new(name="Wireframe", type="WIREFRAME")
    edge_mod.thickness = 0.025
    edge_mod.use_replace = False
    bpy.ops.object.shade_smooth()

    for index, points in enumerate(
        [
            [(-0.5, 0.2, 0.15), (-0.2, 0.05, 0.08), (0.12, -0.16, -0.02), (0.35, -0.38, -0.12)],
            [(0.42, 0.35, -0.1), (0.08, 0.1, -0.02), (-0.1, -0.08, 0.02), (-0.3, -0.34, 0.18)],
        ]
    ):
        curve = bpy.data.curves.new(f"CrackCurve{index}", type="CURVE")
        curve.dimensions = "3D"
        spline = curve.splines.new("POLY")
        spline.points.add(len(points) - 1)
        for point, coords in zip(spline.points, points):
            point.co = (*coords, 1.0)
        curve.bevel_depth = 0.012
        curve.bevel_resolution = 4
        crack_obj = bpy.data.objects.new(f"CrackLine{index}", curve)
        crack_obj.data.materials.append(crack_lines)
        bpy.context.collection.objects.link(crack_obj)

    for index in range(14):
        bpy.ops.mesh.primitive_uv_sphere_add(
            radius=0.03 + (index % 3) * 0.012,
            location=(
                math.sin(index * 1.7) * 0.6,
                math.cos(index * 1.2) * 0.55,
                ((index % 5) - 2) * 0.18,
            ),
        )
        bubble = bpy.context.active_object
        bubble.name = f"Bubble{index}"
        bubble.data.materials.append(inner_bubbles)

    bpy.ops.mesh.primitive_plane_add(size=0.6, location=(0, 0, 1.01))
    mark = bpy.context.active_object
    mark.name = "SparkleMark"
    mark.data.materials.append(sparkle_mark)

    text_curve = bpy.data.curves.new(type="FONT", name="SparkleGlyph")
    text_curve.body = "S"
    text_curve.extrude = 0.02
    text_curve.bevel_depth = 0.004
    text_obj = bpy.data.objects.new("SparkleGlyph", text_curve)
    text_obj.rotation_euler = (math.radians(90), 0, 0)
    text_obj.scale = (0.52, 0.52, 0.52)
    text_obj.location = (-0.13, -0.18, 1.03)
    text_obj.data.materials.append(sparkle_mark)
    bpy.context.collection.objects.link(text_obj)

    for obj in bpy.data.objects:
        if obj.type == "MESH":
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.export_scene.gltf(
        filepath=str(output_path),
        export_format="GLB",
        export_apply=True,
        export_texcoords=True,
        export_normals=True,
        export_materials="EXPORT",
    )

    print(f"Exported ice cube asset to {output_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
