#!/usr/bin/env python3
"""Generate a clean, brand-coloured QR code (SVG) pointing to the site."""
import qrcode
import qrcode.image.svg
from pathlib import Path

URL = "https://rahbarhomidova.com"
NAVY = "#13273E"
OUT = Path(__file__).resolve().parent.parent / "assets" / "img" / "qr.svg"

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=20,
    border=2,
)
qr.add_data(URL)
qr.make(fit=True)

img = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
svg = img.to_string(encoding="unicode")

# Recolour modules to brand navy; keep background transparent.
svg = svg.replace('fill:#000000', f'fill:{NAVY}')
svg = svg.replace('fill="#000000"', f'fill="{NAVY}"')
# Ensure crisp rendering + square aspect.
svg = svg.replace("<svg ", '<svg shape-rendering="crispEdges" ', 1)
# Drop physical mm sizing so it scales purely by viewBox / CSS.
import re
svg = re.sub(r'\s(width|height)="[0-9.]+mm"', '', svg)

OUT.write_text(svg, encoding="utf-8")
print(f"QR written → {OUT}  ({len(svg)} bytes)")
