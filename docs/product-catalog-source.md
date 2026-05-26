# sable Product Catalog Source

## Purpose

This file is the source of truth for the MVP product catalog and future product detail entry.

Codex should use this file to update:
- data/brands.ts
- data/products.ts
- product image matching
- brand website URLs
- product names and prices
- product detail fields once they are marked ready

Do not modify Header, BrandMegaMenu, SearchOverlay, ProductGrid layout, Cart logic, or route structure unless absolutely required.

## Rules

- Price must be stored as a number.
- Example: 870,000 KRW → 870000
- Display formatting should be handled by the UI.
- Non-final brands must not be added.
- ponder.er must use the slug `ponder-er`.
- All products should be included in `new-in` by default.
- Do not over-classify products into women/men/life/sale unless explicitly provided.
- Product display names should be based on the matching filename in `assets/cutouts/[brand-slug]/`.
- Product slugs should be generated from brand slug + product name.
- If product names cannot produce stable slugs, use brand slug + stable index fallback.
- Source cutout filenames must not be renamed or deleted.

---

# Brands

| No. | Brand Name | Brand Slug | Website |
|---:|---|---|---|
| 1 | Abelia Edoward Goucha | abelia-edoward-goucha | https://abeliaedowardgoucha.com/ |
| 2 | Natasha Zinko | natasha-zinko | https://natashazinko.com |
| 3 | Gimaguas | gimaguas | https://gimaguas.com |
| 4 | Gabriela Coll Garments | gabriela-coll-garments | https://www.gabrielacoll.com |
| 5 | Umber Postpast | umber-postpast | https://umber-postpast.com/ |
| 6 | ponder.er | ponder-er | https://www.ponder-er.com |
| 7 | Paloma Wool | paloma-wool | https://palomawool.com |
| 8 | Edward Cuming | edward-cuming | https://edwardcuming.com |
| 9 | Helmut Lang | helmut-lang | https://www.helmutlang.com |
| 10 | Kiko Kostadinov | kiko-kostadinov | https://kikokostadinov.com |
| 11 | Meta Campania Collective | meta-campania-collective | https://meta-campania-collective.com |
| 12 | Mainline:RUS/Fr.CA/DE | mainline | https://rusfrcade.com |
| 13 | Commission | commission | https://www.commission.nyc |
| 14 | Johanna Parv | johanna-parv | https://www.johannaparv.com |
| 15 | A. V. Vattev | a-v-vattev | https://www.avvattev.com |
| 16 | Super Yaya | super-yaya | https://super-yaya.com |
| 17 | Lea Boberg | lea-boberg | https://leaboberg.com |

---

# Products

| Brand Slug | Product Name | Price KRW | Audience | Product Type | Categories | Sizes | Description | Image Source | Status |
|---|---|---:|---|---|---|---|---|---|---|
| abelia-edoward-goucha | Ordinary Shirt Chino | 870000 | TBD | shirt | new-in | TBD | TODO | assets/cutouts/abelia-edoward-goucha/ordinary shirt chino.png | needs-details |
| abelia-edoward-goucha | Sun Hoodie | 432000 | TBD | top | new-in | TBD | TODO | assets/cutouts/abelia-edoward-goucha/sun hoodie.png | needs-details |
| natasha-zinko | Bunny Bag | 320000 | TBD | bag | new-in | TBD | TODO | assets/cutouts/natasha-zinko/bunny bag.png | needs-details |
| natasha-zinko | Double Tshirt | 450000 | TBD | top | new-in | TBD | TODO | assets/cutouts/natasha-zinko/double tshirt.png | needs-details |
| natasha-zinko | Oversized Double Polo | 450000 | TBD | shirt | new-in | TBD | TODO | assets/cutouts/natasha-zinko/oversized double polo.png.png | needs-details |
| gimaguas | Bailarina Wedges Black Silueta 01 | 630000 | TBD | shoes | new-in | TBD | TODO | assets/cutouts/gimaguas/bailarina-wedges-black_silueta_01.jpg.png | needs-details |
| gimaguas | Ingrid Mini Dress Black Silueta | 231000 | TBD | dress | new-in | TBD | TODO | assets/cutouts/gimaguas/ingrid-mini-dress_black_silueta.jpg.png | needs-details |
| gimaguas | Daria Top | 213000 | women | top | new-in, women | xs, s, m, l, xl | Black asymmetrical t-shirt with ruched shoulder and draped hem. | assets/cutouts/gimaguas/daria-top_black_silueta.jpg.png | ready |
| gimaguas | Luis Ls Polo Grey Silueta | 290000 | TBD | shirt | new-in | TBD | TODO | assets/cutouts/gimaguas/luis-ls-polo_grey_silueta.jpg.png | needs-details |
| gimaguas | Daniel Jacket Grey Silueta | 621000 | TBD | jacket | new-in | TBD | TODO | assets/cutouts/gimaguas/daniel-jacket_grey_silueta.png | needs-details |
| gabriela-coll-garments | No.297 Leather Small Crossed Bag, Black | 1070000 | TBD | bag | new-in | TBD | TODO | assets/cutouts/gabriela-coll-garments/No.297 Leather Small Crossed Bag, Black.png | needs-details |
| gabriela-coll-garments | No.216 Ripstop Hooded Zipper Jacket, Off Black | 1480000 | TBD | jacket | new-in | TBD | TODO | assets/cutouts/gabriela-coll-garments/No.216 Ripstop Hooded Zipper Jacket, Off Black.png | needs-details |
| gabriela-coll-garments | No.317 Organic Cotton Fleece Top, Black | 545000 | TBD | top | new-in | TBD | TODO | assets/cutouts/gabriela-coll-garments/No.317 Organic Cotton Fleece Top, Black.png | needs-details |
| gabriela-coll-garments | No.304 Linen Wrap Skirt, Black | 845000 | TBD | skirt | new-in | TBD | TODO | assets/cutouts/gabriela-coll-garments/No.304 Linen Wrap Skirt, Black.png | needs-details |
| umber-postpast | Cotton Organza Layered Midi Dress | 520000 | TBD | dress | new-in | TBD | TODO | assets/cutouts/umber-postpast/COTTON ORGANZA LAYERED MIDI DRESS.jpg.png | needs-details |
| umber-postpast | Natural Dyed Silk Trench Coat | 1550000 | TBD | jacket | new-in | TBD | TODO | assets/cutouts/umber-postpast/NATURAL DYED SILK TRENCH COAT.png | needs-details |
| umber-postpast | Wool Gauze Boat-Neck Long Dress | 650000 | TBD | dress | new-in | TBD | TODO | assets/cutouts/umber-postpast/WOOL GAUZE BOAT-NECK LONG DRESS.png | needs-details |
| ponder-er | DASH Crossbody Denim Bag (Blue) | 530000 | TBD | bag | new-in | TBD | TODO | assets/cutouts/ponder-er/_DASH_ Crossbody Denim Bag (Blue)~mv2.jpg.png | needs-details |
| ponder-er | VOYA Faux-Shearling Jacket (Black) | 870000 | TBD | jacket | new-in | TBD | TODO | assets/cutouts/ponder-er/_VOYA_ Faux-Shearling Jacket (Black).png | needs-details |
| ponder-er | RAVEL Spiral Smocked Denim Skirt (White) | 570000 | TBD | skirt | new-in | TBD | TODO | assets/cutouts/ponder-er/_RAVEL_ Spiral Smocked Denim Skirt (White).png | needs-details |
| paloma-wool | Simulet, Brown | 345000 | TBD | TBD | new-in | TBD | TODO | assets/cutouts/paloma-wool/Simulet, Brown.png | needs-details |
| paloma-wool | Lonati, Denim | 469000 | TBD | TBD | new-in | TBD | TODO | assets/cutouts/paloma-wool/Lonati, Denim.png | needs-details |
| paloma-wool | Penelope Ii, Black | 249000 | TBD | TBD | new-in | TBD | TODO | assets/cutouts/paloma-wool/Penelope Ii, Black.png | needs-details |
| edward-cuming | Thong Sandal Mens | 791000 | men | shoes | new-in, men | TBD | TODO | assets/cutouts/edward-cuming/Thong Sandal Mens .jpg.png | needs-details |
| edward-cuming | Bottom Heavy Top Heavy Bomber | 1115000 | TBD | jacket | new-in | TBD | TODO | assets/cutouts/edward-cuming/Bottom Heavy Top Heavy Bomber .png | needs-details |
| edward-cuming | Drop Dart Volume Jean | 776000 | TBD | pants | new-in | TBD | TODO | assets/cutouts/edward-cuming/Drop Dart Volume Jean .png | needs-details |
| edward-cuming | Encompassing Vortex Skirt | 880000 | TBD | skirt | new-in | TBD | TODO | assets/cutouts/edward-cuming/Encompassing Vortex Skirt.png | needs-details |
| helmut-lang | FUNNEL NECK PULLOVER | 229000 | TBD | top | new-in | TBD | TODO | assets/cutouts/helmut-lang/FUNNEL NECK PULLOVER.png | needs-details |
| helmut-lang | CHINO PANT | 450000 | TBD | pants | new-in | TBD | TODO | assets/cutouts/helmut-lang/CHINO PANT.png | needs-details |
| helmut-lang | KNOT SHIRT DRESS | 870000 | TBD | dress | new-in | TBD | TODO | assets/cutouts/helmut-lang/KNOT SHIRT DRESS.png | needs-details |
| helmut-lang | TWISTED SHIRT DRESS | 850000 | TBD | dress | new-in | TBD | TODO | assets/cutouts/helmut-lang/TWISTED SHIRT DRESS.png | needs-details |
| kiko-kostadinov | SARGO SHOES UMBER | 1140000 | TBD | shoes | new-in | TBD | TODO | assets/cutouts/kiko-kostadinov/SARGO SHOES UMBER.png | needs-details |
| kiko-kostadinov | OSTRO CANVAS SHOES BEECH ORANGE | 1150000 | TBD | shoes | new-in | TBD | TODO | assets/cutouts/kiko-kostadinov/OSTRO CANVAS SHOES BEECH ORANGE.png | needs-details |
| kiko-kostadinov | KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN | 479000 | TBD | shoes | new-in | TBD | TODO | assets/cutouts/kiko-kostadinov/KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN.png | needs-details |
| kiko-kostadinov | RETICELLA BALLERINA SAPPHIRE | 980000 | TBD | shoes | new-in | TBD | TODO | assets/cutouts/kiko-kostadinov/RETICELLA BALLERINA SAPPHIRE.png | needs-details |
| meta-campania-collective | Jacket | 1200000 | TBD | jacket | new-in | TBD | TODO | assets/cutouts/meta-campania-collective/jacket.png.png | needs-details |
| mainline | Ilya | 460000 | TBD | TBD | new-in | TBD | TODO | assets/cutouts/mainline/ilya.png | needs-details |
| commission | Dress | 1250000 | TBD | dress | new-in | TBD | TODO | assets/cutouts/commission/dress.png | needs-details |
| commission | Curve Flap Jacket, Heather Grey | 1000000 | TBD | jacket | new-in | TBD | TODO | assets/cutouts/commission/Curve Flap Jacket, Heather Grey.png | needs-details |
| johanna-parv | Skirt Capris, Black | 544800 | TBD | skirt | new-in | TBD | TODO | assets/cutouts/johanna-parv/Skirt Capris, Black.png | needs-details |
| johanna-parv | Cover Skirt, Khaki | 748000 | TBD | skirt | new-in | TBD | TODO | assets/cutouts/johanna-parv/Cover Skirt, Khaki.png | needs-details |
| a-v-vattev | O'KEEFFE STUDDED T-SHIRT BLACK | 202000 | TBD | top | new-in | TBD | TODO | assets/cutouts/a-v-vattev/O'KEEFFE STUDDED T-SHIRT BLACK.png.png | needs-details |
| a-v-vattev | SCARF SHIRT PATCHWORK BLACK | 620000 | TBD | shirt | new-in | TBD | TODO | assets/cutouts/a-v-vattev/SCARF SHIRT PATCHWORK BLACK.png | needs-details |
| super-yaya | SYY X PUMA SPEEDCAT II - BLACK | 155000 | TBD | shoes | new-in | TBD | TODO | assets/cutouts/super-yaya/SYY X PUMA SPEEDCAT II - BLACK.png | needs-details |
| super-yaya | Winona Knit Polo Tee, Brown Purple | 1100000 | TBD | top | new-in | TBD | TODO | assets/cutouts/super-yaya/Winona Knit Polo Tee, Brown Purple.png | needs-details |
| lea-boberg | SC Shirt | 879000 | TBD | shirt | new-in | TBD | TODO | assets/cutouts/lea-boberg/sc shirt.jpg.png | needs-details |

---

# Image Filename Audit

| Brand Slug | Image Filename | Matched Product Name | Match Status |
|---|---|---|---|
| abelia-edoward-goucha | aeg cap straight.png | N/A | unmatched-to-product |
| abelia-edoward-goucha | double belt pants.jpg.png | N/A | unmatched-to-product |
| abelia-edoward-goucha | ordinary shirt chino.png | Ordinary Shirt Chino | matched |
| abelia-edoward-goucha | sun hoodie.png | Sun Hoodie | matched |
| a-v-vattev | O'KEEFFE STUDDED T-SHIRT BLACK.png.png | O'KEEFFE STUDDED T-SHIRT BLACK | matched |
| a-v-vattev | SCARF SHIRT PATCHWORK BLACK.png | SCARF SHIRT PATCHWORK BLACK | matched |
| commission | Curve Flap Jacket, Heather Grey.png | Curve Flap Jacket, Heather Grey | matched |
| commission | dress.png | Dress | matched |
| edward-cuming | Bottom Heavy Top Heavy Bomber .png | Bottom Heavy Top Heavy Bomber | matched |
| edward-cuming | Drop Dart Volume Jean .png | Drop Dart Volume Jean | matched |
| edward-cuming | Encompassing Vortex Skirt.png | Encompassing Vortex Skirt | matched |
| edward-cuming | Thong Sandal Mens .jpg.png | Thong Sandal Mens | matched |
| gabriela-coll-garments | No.216 Ripstop Hooded Zipper Jacket, Off Black.png | No.216 Ripstop Hooded Zipper Jacket, Off Black | matched |
| gabriela-coll-garments | No.297 Leather Small Crossed Bag, Black.png | No.297 Leather Small Crossed Bag, Black | matched |
| gabriela-coll-garments | No.304 Linen Wrap Skirt, Black.png | No.304 Linen Wrap Skirt, Black | matched |
| gabriela-coll-garments | No.317 Organic Cotton Fleece Top, Black.png | No.317 Organic Cotton Fleece Top, Black | matched |
| gimaguas | bailarina-wedges-black_silueta_01.jpg.png | Bailarina Wedges Black Silueta 01 | matched |
| gimaguas | daniel-jacket_grey_silueta.png | Daniel Jacket Grey Silueta | matched |
| gimaguas | daria-top_black_silueta.jpg.png | Daria Top | matched |
| gimaguas | ingrid-mini-dress_black_silueta.jpg.png | Ingrid Mini Dress Black Silueta | matched |
| gimaguas | luis-ls-polo_grey_silueta.jpg.png | Luis Ls Polo Grey Silueta | matched |
| helmut-lang | CHINO PANT.png | CHINO PANT | matched |
| helmut-lang | FUNNEL NECK PULLOVER.png | FUNNEL NECK PULLOVER | matched |
| helmut-lang | KNOT SHIRT DRESS.png | KNOT SHIRT DRESS | matched |
| helmut-lang | TWISTED SHIRT DRESS.png | TWISTED SHIRT DRESS | matched |
| johanna-parv | Cover Skirt, Khaki.png | Cover Skirt, Khaki | matched |
| johanna-parv | Skirt Capris, Black.png | Skirt Capris, Black | matched |
| kiko-kostadinov | KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN.png | KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN | matched |
| kiko-kostadinov | OSTRO CANVAS SHOES BEECH ORANGE.png | OSTRO CANVAS SHOES BEECH ORANGE | matched |
| kiko-kostadinov | RETICELLA BALLERINA SAPPHIRE.png | RETICELLA BALLERINA SAPPHIRE | matched |
| kiko-kostadinov | SARGO SHOES UMBER.png | SARGO SHOES UMBER | matched |
| lea-boberg | sc shirt.jpg.png | SC Shirt | matched |
| mainline | ilya.png | Ilya | matched |
| meta-campania-collective | jacket.png.png | Jacket | matched |
| natasha-zinko | bunny bag.png | Bunny Bag | matched |
| natasha-zinko | double tshirt.png | Double Tshirt | matched |
| natasha-zinko | oversized double polo.png.png | Oversized Double Polo | matched |
| paloma-wool | Lonati, Denim.png | Lonati, Denim | matched |
| paloma-wool | Penelope Ii, Black.png | Penelope Ii, Black | matched |
| paloma-wool | Simulet, Brown.png | Simulet, Brown | matched |
| ponder-er | _DASH_ Crossbody Denim Bag (Blue)~mv2.jpg.png | DASH Crossbody Denim Bag (Blue) | matched |
| ponder-er | _RAVEL_ Spiral Smocked Denim Skirt (White).png | RAVEL Spiral Smocked Denim Skirt (White) | matched |
| ponder-er | _VOYA_ Faux-Shearling Jacket (Black).png | VOYA Faux-Shearling Jacket (Black) | matched |
| super-yaya | SYY X PUMA SPEEDCAT II - BLACK.png | SYY X PUMA SPEEDCAT II - BLACK | matched |
| super-yaya | Winona Knit Polo Tee, Brown Purple.png | Winona Knit Polo Tee, Brown Purple | matched |
| umber-postpast | COTTON ORGANZA LAYERED MIDI DRESS.jpg.png | Cotton Organza Layered Midi Dress | matched |
| umber-postpast | NATURAL DYED SILK TRENCH COAT.png | Natural Dyed Silk Trench Coat | matched |
| umber-postpast | WOOL GAUZE BOAT-NECK LONG DRESS.png | Wool Gauze Boat-Neck Long Dress | matched |

---

# Unmatched Cutout Images

These files exist in `assets/cutouts/` but do not currently have a row in the Products table.

| Brand Slug | Image Source | Suggested Product Name | Status |
|---|---|---|---|
| abelia-edoward-goucha | assets/cutouts/abelia-edoward-goucha/aeg cap straight.png | Aeg Cap Straight | unmatched-to-product |
| abelia-edoward-goucha | assets/cutouts/abelia-edoward-goucha/double belt pants.jpg.png | Double Belt Pants | unmatched-to-product |

---

# Products Needing Details

These products still need at least one manually reviewed field. `Daria Top` is omitted because it is marked `ready`.

| Brand Slug | Product Name | Missing / TBD Fields | Status |
|---|---|---|---|
| abelia-edoward-goucha | Ordinary Shirt Chino | Audience, Sizes, Description | needs-details |
| abelia-edoward-goucha | Sun Hoodie | Audience, Sizes, Description | needs-details |
| natasha-zinko | Bunny Bag | Audience, Sizes, Description | needs-details |
| natasha-zinko | Double Tshirt | Audience, Sizes, Description | needs-details |
| natasha-zinko | Oversized Double Polo | Audience, Sizes, Description | needs-details |
| gimaguas | Bailarina Wedges Black Silueta 01 | Audience, Sizes, Description | needs-details |
| gimaguas | Ingrid Mini Dress Black Silueta | Audience, Sizes, Description | needs-details |
| gimaguas | Luis Ls Polo Grey Silueta | Audience, Sizes, Description | needs-details |
| gimaguas | Daniel Jacket Grey Silueta | Audience, Sizes, Description | needs-details |
| gabriela-coll-garments | No.297 Leather Small Crossed Bag, Black | Audience, Sizes, Description | needs-details |
| gabriela-coll-garments | No.216 Ripstop Hooded Zipper Jacket, Off Black | Audience, Sizes, Description | needs-details |
| gabriela-coll-garments | No.317 Organic Cotton Fleece Top, Black | Audience, Sizes, Description | needs-details |
| gabriela-coll-garments | No.304 Linen Wrap Skirt, Black | Audience, Sizes, Description | needs-details |
| umber-postpast | Cotton Organza Layered Midi Dress | Audience, Sizes, Description | needs-details |
| umber-postpast | Natural Dyed Silk Trench Coat | Audience, Sizes, Description | needs-details |
| umber-postpast | Wool Gauze Boat-Neck Long Dress | Audience, Sizes, Description | needs-details |
| ponder-er | DASH Crossbody Denim Bag (Blue) | Audience, Sizes, Description | needs-details |
| ponder-er | VOYA Faux-Shearling Jacket (Black) | Audience, Sizes, Description | needs-details |
| ponder-er | RAVEL Spiral Smocked Denim Skirt (White) | Audience, Sizes, Description | needs-details |
| paloma-wool | Simulet, Brown | Audience, Product Type, Sizes, Description | needs-details |
| paloma-wool | Lonati, Denim | Audience, Product Type, Sizes, Description | needs-details |
| paloma-wool | Penelope Ii, Black | Audience, Product Type, Sizes, Description | needs-details |
| edward-cuming | Thong Sandal Mens | Sizes, Description | needs-details |
| edward-cuming | Bottom Heavy Top Heavy Bomber | Audience, Sizes, Description | needs-details |
| edward-cuming | Drop Dart Volume Jean | Audience, Sizes, Description | needs-details |
| edward-cuming | Encompassing Vortex Skirt | Audience, Sizes, Description | needs-details |
| helmut-lang | FUNNEL NECK PULLOVER | Audience, Sizes, Description | needs-details |
| helmut-lang | CHINO PANT | Audience, Sizes, Description | needs-details |
| helmut-lang | KNOT SHIRT DRESS | Audience, Sizes, Description | needs-details |
| helmut-lang | TWISTED SHIRT DRESS | Audience, Sizes, Description | needs-details |
| kiko-kostadinov | SARGO SHOES UMBER | Audience, Sizes, Description | needs-details |
| kiko-kostadinov | OSTRO CANVAS SHOES BEECH ORANGE | Audience, Sizes, Description | needs-details |
| kiko-kostadinov | KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN | Audience, Sizes, Description | needs-details |
| kiko-kostadinov | RETICELLA BALLERINA SAPPHIRE | Audience, Sizes, Description | needs-details |
| meta-campania-collective | Jacket | Audience, Sizes, Description | needs-details |
| mainline | Ilya | Audience, Product Type, Sizes, Description | needs-details |
| commission | Dress | Audience, Sizes, Description | needs-details |
| commission | Curve Flap Jacket, Heather Grey | Audience, Sizes, Description | needs-details |
| johanna-parv | Skirt Capris, Black | Audience, Sizes, Description | needs-details |
| johanna-parv | Cover Skirt, Khaki | Audience, Sizes, Description | needs-details |
| a-v-vattev | O'KEEFFE STUDDED T-SHIRT BLACK | Audience, Sizes, Description | needs-details |
| a-v-vattev | SCARF SHIRT PATCHWORK BLACK | Audience, Sizes, Description | needs-details |
| super-yaya | SYY X PUMA SPEEDCAT II - BLACK | Audience, Sizes, Description | needs-details |
| super-yaya | Winona Knit Polo Tee, Brown Purple | Audience, Sizes, Description | needs-details |
| lea-boberg | SC Shirt | Audience, Sizes, Description | needs-details |

---

# Image Matching Rules

Use this order:

1. Match Products rows to `assets/cutouts/[brand-slug]/[filename]` via the `Image Source` column.
2. If generated storefront images are used later, derive their path from `Image Source` rather than treating generated manifests as the catalog source of truth.
3. If a product has no matching cutout image, keep the row but set `Status` to `needs-image-match`.
4. If a cutout image has no matching product, list it under `Unmatched Cutout Images`.

---

# Validation Checklist

After integration, verify:

- 46 products exist.
- 17 brands exist.
- Non-final brands do not exist.
- ponder.er exists with slug `ponder-er`.
- Brand website URLs are present.
- Product prices are number values.
- Product names are based on `assets/cutouts/` filenames.
- Daria Top is marked `ready` with complete details.
- Products with incomplete detail fields are marked `needs-details`.
- Products without a cutout image are marked `needs-image-match`.
- Cutout images without product rows are listed under `Unmatched Cutout Images`.
