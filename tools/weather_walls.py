import numpy as np
from PIL import Image, ImageFilter

OUT = "/home/xyzam/games/spiritdeck/public/textures/"
NAMES = ["wall", "wall2", "wall3"]

rng = np.random.default_rng(7)


def blur(a: np.ndarray, r: float) -> np.ndarray:
    return np.asarray(
        Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))
    ).astype(np.float32)


for name in NAMES:
    im = Image.open(OUT + name + ".png").convert("RGB")
    a = np.asarray(im).astype(np.float32)
    h, w, _ = a.shape
    L = a.mean(2)

    gray = a.mean(2, keepdims=True)
    # warm stone tint
    stone = np.concatenate([gray * 1.05, gray * 0.99, gray * 0.90], axis=2)

    # low-frequency colour variation (irregular stone)
    lf = blur(rng.random((h, w)) * 255.0, 46) / 255.0
    lf = (lf - lf.mean()) * 2.0
    stone *= (1.0 + lf * 0.45)[..., None]

    # darker, more contrast
    stone = (stone - 128.0) * 1.22 + 88.0

    # crevice detection (darker than local average)
    local = blur(L, 22)
    crev = np.clip((local - L) / 55.0, 0.0, 1.0)

    # grime + ambient dirt in crevices
    stone *= (1.0 - crev * 0.50)[..., None]

    # moss: sparse patches in crevices + lower half
    ygrad = np.linspace(0.0, 1.0, h)[:, None]
    patch = blur(rng.random((h, w)) * 255.0, 55) / 255.0
    patch = np.clip((patch - 0.46) * 2.2, 0.0, 1.0)
    moss = crev * (0.18 + 0.82 * ygrad) * patch
    moss = np.clip(moss * 0.95, 0.0, 1.0)
    green = np.array([0.30, 0.40, 0.25], np.float32) * 255.0
    stone = stone * (1.0 - moss[..., None]) + green * moss[..., None]

    # large damp/dark stains
    damp = blur(rng.random((h, w)) * 255.0, 72) / 255.0
    damp = np.clip((damp - 0.52) * 2.0, 0.0, 1.0)
    stone *= (1.0 - damp * 0.30)[..., None]

    # vertical damp streaks
    streak = blur(rng.random((h, w)) * 255.0, 3) / 255.0
    streak = np.clip((streak - 0.62) * 3.0, 0.0, 1.0)
    streak *= 0.20 + 0.35 * ygrad
    stone *= (1.0 - streak * 0.35)[..., None]

    # silt/soot near the base
    base = np.clip((ygrad - 0.72) / 0.28, 0.0, 1.0)
    stone *= (1.0 - base * 0.25)[..., None]

    # fine grain
    stone += (rng.random((h, w, 1)) - 0.5) * 14.0

    np.clip(stone, 0, 255, out=stone)
    Image.fromarray(stone.astype(np.uint8)).save(OUT + name + ".png")
    print("weathered", name)
