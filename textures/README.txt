Drop FIRST-PERSON WALL/FLOOR textures here (they are auto-detected at runtime):
  wall.jpg    wall2.jpg   wall3.jpg   -> wall variants (REQUIRED format)
  floor.jpg   ceil.jpg                -> floor / ceiling
Each file must be 512x512 or larger. Missing files fall back to procedural stone.

WHAT WORKS: a FLAT, straight-on ("elevation", "orthographic") surface that TILES
seamlessly. Example prompt:
  "seamless tileable stone block wall texture, straight-on front view, flat,
   evenly lit, no perspective, no vignette, no baked shadows, 1024x1024"
Do NOT use isometric or top-down ROOM images here - they cannot map onto walls.
Top-down TILEABLE tiles are fine for floor.jpg / ceil.jpg.
