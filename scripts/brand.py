# Builds the web logo files in public/brand/ from the master files in brand/source/ (Logos.zip, Feb 2025).
# Masters are ~9000px PNGs; the site needs small, trimmed copies. Run: python3 scripts/brand.py
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
SRC, OUT = 'brand/source', 'public/brand'

def trimmed(name):
    im = Image.open(f'{SRC}/{name}').convert('RGBA')
    return im.crop(im.getbbox())

def at_height(im, h):
    return im.resize((round(im.width * h / im.height), h), Image.LANCZOS)

def tint(im, rgb):
    # The black masters carry the shape in alpha; refill with a brand color.
    solid = Image.new('RGBA', im.size, rgb + (255,))
    solid.putalpha(im.getchannel('A'))
    return solid

# Horizontal lockup for the header and footer, at 3x a 36px display height
for color in ('white', 'black', 'yellow'):
    at_height(trimmed(f'FW_horizontal_{color}.png'), 108).save(f'{OUT}/flywheel-horizontal-{color}.png', optimize=True)

# The wheel on its own, for brand moments on the page
wheel = trimmed('THE_FLYWHEEL.png')
for color, rgb in {'ink': (0x1e, 0x1e, 0x1e), 'yellow': (0xf5, 0xd5, 0x00)}.items():
    at_height(tint(wheel, rgb), 480).save(f'{OUT}/wheel-{color}.png', optimize=True)

# Icons from the social icon (yellow wheel on black)
icon = Image.open(f'{SRC}/FW_social_icon.png').convert('RGB')
icon.resize((512, 512), Image.LANCZOS).save(f'{OUT}/icon-512.jpg', quality=84, optimize=True)
icon.resize((180, 180), Image.LANCZOS).save(f'{OUT}/apple-touch-icon.png', optimize=True)

# Favicon: the yellow wheel on ink, padded so it reads at 16-32px
fav = Image.new('RGBA', (64, 64), (0x1e, 0x1e, 0x1e, 255))
w = at_height(tint(wheel, (0xf5, 0xd5, 0x00)), 54)
fav.alpha_composite(w, ((64 - w.width) // 2, (64 - w.height) // 2))
fav.save('public/favicon.png', optimize=True)
print('done')
