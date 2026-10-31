# Copies the concept 12 brand kit from brand/source/ into the paths the site serves.
# Run: python3 scripts/brand.py
from pathlib import Path
import shutil
from PIL import Image

SRC = Path('brand/source')
PUB = Path('public')
BRAND = PUB / 'brand'
BRAND.mkdir(parents=True, exist_ok=True)

for name in (
    'flywheel-horizontal-color.svg',
    'flywheel-horizontal-white.svg',
    'flywheel-stacked-color.svg',
    'flywheel-symbol-color.svg',
    'favicon.svg',
    'app-icon-512.png',
):
    shutil.copyfile(SRC / name, BRAND / name)

shutil.copyfile(SRC / 'favicon.svg', PUB / 'favicon.svg')
for size in (16, 32, 48):
    shutil.copyfile(SRC / f'favicon-{size}.png', PUB / f'favicon-{size}.png')

# Apple touch icons are 180px. The kit ships a 512 app icon, so this is only a scale.
icon = Image.open(SRC / 'app-icon-512.png').convert('RGBA')
icon.resize((180, 180), Image.Resampling.LANCZOS).save(PUB / 'apple-touch-icon.png')
print('done')
