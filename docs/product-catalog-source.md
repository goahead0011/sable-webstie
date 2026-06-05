# sable Product Catalog Source

## Purpose

This file is the source of truth for the MVP product catalog and future product detail entry.

Codex should use this file to update:
- data/brands.ts
- data/products.ts
- data/new-products.json
- product image matching
- product names, prices, audience, type, sizes, and descriptions

Do not modify Header, BrandMegaMenu, SearchOverlay, ProductGrid layout, Cart logic, or route structure unless required by catalog behavior.

## Rules

- Prices are integer KRW values. Display formatting belongs to the UI.
- ponder.er must use the slug `ponder-er`.
- All products are included in `new-in` by default.
- Explicit `Women` and `Men` filename metadata adds the corresponding collection.
- `Unisex` products appear on **both** the Women and Men listing pages (matched by audience), and remain in `new-in`.
- Nested product folder suffixes such as `_Women_Skirt`, `_Men_Outer`, and `_Unisex_Pants` are metadata. Remove them from display names and store them as audience and product type.
- Source cutout filenames must not be renamed or deleted.
- Web storefront images are generated as WebP without resizing.
- For nested image folders, `Front` or `Topview` is the representative image. `Back` or `Sideview` is shown on product-card hover when present.
- Single-image products (one source photo) keep showing that same image on hover — the card never goes blank. The hover swap only happens when a product has 2+ images.

## Category Filter Groups

The Women and Men nav items open a hover modal (same behaviour as the Brands modal) that filters the listing by clothing type via `?category=<group>`. Fine-grained `Product Type` values are collapsed into the largest sensible buckets:

| Group key (`?category=`) | Label | Product Types included |
|---|---|---|
| `outerwear` | Outer | jacket (incl. coats, blazers, bombers) |
| `tops` | Top | top, shirt |
| `bottoms` | Bottom | pants (incl. jeans, shorts, trousers) |
| `dress` | Dress | dress |
| `skirt` | Skirt | skirt |
| `shoes` | Shoes | shoes |
| `bags` | Bag | bag |
| `accessories` | Accessories | accessory (incl. belts) |

Rules for the menus:

- Every menu starts with **All** (no filter; links to the bare `/women` or `/men`).
- A group is shown only when that collection has at least one matching product, so menus never offer an empty filter.
- Women and Men do not have to share the same groups. With the current catalog: **Women** shows All · Outer · Top · Bottom · Dress · Skirt · Shoes · Bag · Accessories, and **Men** shows All · Outer · Top · Bottom · Shoes · Bag (no Dress/Skirt/Accessories — none exist for men yet).
- `Product Type = TBD` items have no group and only appear under **All**.

---

# Brands

| No. | Brand Name | Brand Slug | Website |
|---:|---|---|---|
| 1 | Abelia Edoward Goucha | abelia-edoward-goucha | https://abeliaedowardgoucha.com/ |
| 2 | Camiel Fortgens | camiel-fortgens | https://www.camielfortgens.com |
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
| abelia-edoward-goucha | Ordinary Shirt Chino | 870000 | unisex | shirt | new-in | 2, 3 | A boxy-silhouette casual shirt crafted from crisp cotton katsuragi twill, featuring twin front pockets.
The placket, pleats, and sleeve gauntlets (the slit at the cuffs) are uniquely designed inside-out. While there’s no deep secret behind this playful detail, it’s completely functional and ready for everyday wear. | assets/cutouts/abelia-edoward-goucha/ordinary shirt chino.png | needs-details |
| abelia-edoward-goucha | Sun Hoodie | 432000 | unisex | top | new-in | 2, 3 | A versatile, lightweight summer hoodie. It features zippered front pockets and interior pockets, offering a fully reversible design.
Crafted from a high-performance knit fabric that provides UV protection, moisture-wicking, a cool-to-the-touch feel, and is conveniently machine washable. | assets/cutouts/abelia-edoward-goucha/sun hoodie.png | ready |
| gimaguas | Bailarina Wedges Black Silueta 01 | 630000 | women | shoes | new-in, women | 36, 37, 38, 39, 40, 41 | Women's ballerina shoes featuring a soft faded-leather finish, a round toe, and a 7.5cm wedge heel. | assets/cutouts/gimaguas/bailarina-wedges-black_silueta_01.jpg.png | needs-details |
| gimaguas | Ingrid Mini Dress Black Silueta | 231000 | women | dress | new-in, women | XS, S, M, L, XL | Black semi-sheer mini dress with a gathered crew neckline, soft pleats and three-quarter sleeves in lightweight textured cotton; regular fit. | assets/cutouts/gimaguas/ingrid-mini-dress_black_silueta.jpg.png | ready |
| gimaguas | Daria Top | 213000 | women | top | new-in, women | XS, S, M, L, XL | Black asymmetrical t-shirt with ruched shoulder and draped hem. | assets/cutouts/gimaguas/daria-top_black_silueta.jpg.png | ready |
| gimaguas | Luis Ls Polo Grey Silueta | 290000 | unisex | shirt | new-in | XS, S, M, L, XL | Dark grey and navy long-sleeve polo with a faux layered effect — lightweight cotton jersey with a faux blue shirt layer underneath and an oversized silhouette. | assets/cutouts/gimaguas/luis-ls-polo_grey_silueta.jpg.png | ready |
| gimaguas | Daniel Jacket Grey Silueta | 621000 | unisex | jacket | new-in | XS, S, M, L, XL | Grey pinstripe jacket with a mandarin collar, button closure, four button-flap pockets, elasticated hem and contrasting ribbed cuffs; straight fit. | assets/cutouts/gimaguas/daniel-jacket_grey_silueta.png | ready |
| gabriela-coll-garments | No.297 Leather Small Crossed Bag, Black | 1070000 | unisex | bag | new-in | OS | Compact crossbody bag in vegetable-tanned lambskin with zip closure, interior pocket and RIRI metal hardware; unlined, with natural leather markings left visible. | assets/cutouts/gabriela-coll-garments/No.297 Leather Small Crossed Bag, Black.png | ready |
| gabriela-coll-garments | No.216 Ripstop Hooded Zipper Jacket, Off Black | 1480000 | unisex | jacket | new-in | 0, 1, 2, 3, 4, 5 | Off-black ripstop hooded jacket with an oversized fit, two-way RIRI metal zip closure, side-seam pockets and gathered cuffs and hem. | assets/cutouts/gabriela-coll-garments/No.216 Ripstop Hooded Zipper Jacket, Off Black.png | ready |
| gabriela-coll-garments | No.317 Organic Cotton Fleece Top, Black | 545000 | unisex | top | new-in | 0, 1, 2, 3, 4, 5 | Relaxed-fit top in heavy 100% organic cotton fleece with a crew neck and exposed raw-edge finish at collar, cuffs and hem; individually dyed so colour nuances occur. | assets/cutouts/gabriela-coll-garments/No.317 Organic Cotton Fleece Top, Black.png | ready |
| gabriela-coll-garments | No.304 Linen Wrap Skirt, Black | 845000 | women | skirt | new-in, women | 0, 1, 2, 3, 4 | Narrow-fitting 100% linen wrap skirt with a self-tie fastening strap, button adjustment, raw-edge finish and natural corozo buttons. | assets/cutouts/gabriela-coll-garments/No.304 Linen Wrap Skirt, Black.png | ready |
| umber-postpast | Cotton Organza Layered Midi Dress | 520000 | women | dress | new-in, women | 1, 2, 3 | Sleeveless midi dress in sheer cotton organza with a layered detail, side-seam pockets, concealed back zip and full cupro lining; 100% cotton. | assets/cutouts/umber-postpast/COTTON ORGANZA LAYERED MIDI DRESS.jpg.png | ready |
| umber-postpast | Natural Dyed Silk Trench Coat | 1550000 | unisex | jacket | new-in | 0, 1, 2 | Double-breasted natural-dyed silk trench coat with horn buttons, a detachable neck latch and waist belt, diagonal flap pockets, epaulettes and a back vent; 100% silk. | assets/cutouts/umber-postpast/NATURAL DYED SILK TRENCH COAT.png | ready |
| umber-postpast | Wool Gauze Boat-Neck Long Dress | 650000 | women | dress | new-in, women | 0, 1, 2 | Sleeveless boat-neck long dress in wool gauze with side-seam pockets, side vents, concealed back zip and full cupro lining; 100% wool. | assets/cutouts/umber-postpast/WOOL GAUZE BOAT-NECK LONG DRESS.png | ready |
| ponder-er | DASH Crossbody Denim Bag (Blue) | 530000 | unisex | bag | new-in | OS | Denim crossbody bag featuring ponder.er's signature diamond-shaped smocking and cut-out details, made from treated denim with a unique washed shade. | assets/cutouts/ponder-er/_DASH_ Crossbody Denim Bag (Blue)~mv2.jpg.png | ready |
| ponder-er | VOYA Faux-Shearling Jacket (Black) | 870000 | unisex | jacket | new-in | S, M, L | Faux-shearling jacket with ponder.er's signature smocking, technical-fabric side panels with elasticated hem, zip closure and a relaxed fit. | assets/cutouts/ponder-er/_VOYA_ Faux-Shearling Jacket (Black).png | ready |
| ponder-er | RAVEL Spiral Smocked Denim Skirt (White) | 570000 | women | skirt | new-in, women | XS, S, M, L | Spiral-panelled denim skirt with button closure, signature diamond smocking and cut-out fraying details creating an elegant mermaid shape. | assets/cutouts/ponder-er/_RAVEL_ Spiral Smocked Denim Skirt (White).png | ready |
| paloma-wool | Simulet, Brown | 345000 | women | top | new-in, women | XS, S, M, L, XL | Halter top with an eyelet patch detail and adjustable strap, made from soft micromodal. | assets/cutouts/paloma-wool/Simulet, Brown.png | ready |
| paloma-wool | Lonati, Denim | 469000 | women | pants | new-in, women | 34, 36, 38, 40, 42, 44 | Waistband-free denim trousers with large pockets in classic denim. | assets/cutouts/paloma-wool/Lonati, Denim.png | ready |
| paloma-wool | Penelope Ii, Black | 249000 | women | accessory | new-in, women | XS/S, M/L | Smooth leather hip belt with a double-buckle system oriented in opposite directions. | assets/cutouts/paloma-wool/Penelope Ii, Black.png | ready |
| edward-cuming | Thong Sandal Mens | 791000 | men | shoes | new-in, men | 40, 41, 42, 43, 44, 45 | Handmade leather thong sandal with a wide strap and sculpted construction on a low stacked-leather sole; finished by hand with subtle unique idiosyncrasies. | assets/cutouts/edward-cuming/Thong Sandal Mens .jpg.png | ready |
| edward-cuming | Bottom Heavy Top Heavy Bomber | 1115000 | men | jacket | new-in, men | 46, 48, 50 | Padded technical cotton-blend bomber with a bottom-heavy curved hem, oversized utility flap pockets, a double-ended exposed zip and ribbed cuffs and hem. | assets/cutouts/edward-cuming/Bottom Heavy Top Heavy Bomber .png | ready |
| edward-cuming | Drop Dart Volume Jean | 776000 | unisex | pants | new-in | 0, 1, 2, 3, 4 | Washed-blue denim jeans with a dropped crotch and darted, panelled construction that drapes volume through the leg and kicks out at the back hem; five-pocket with exposed button fly. | assets/cutouts/edward-cuming/Drop Dart Volume Jean .png | ready |
| edward-cuming | Encompassing Vortex Skirt | 880000 | women | skirt | new-in, women | 0, 1, 2, 3 | Mid-length seamless skirt using Edward Cuming's signature 'scratch the itch' technique in circular movements; slashed and washed embroidery reveals a contrasting underlayer for a radial vortex effect. | assets/cutouts/edward-cuming/Encompassing Vortex Skirt.png | ready |
| helmut-lang | FUNNEL NECK PULLOVER | 229000 | men | top | new-in, men | OS | Oversized cotton-terry sweatshirt with a funnel neck, utility-parka details and a metal logo zip. | assets/cutouts/helmut-lang/FUNNEL NECK PULLOVER.png | ready |
| helmut-lang | CHINO PANT | 450000 | men | pants | new-in, men | 28, 29, 30, 31, 32, 33, 34, 36, 38 | Mid-rise straight-leg pants in cotton chino twill with utility-inspired details and classic trouser construction. | assets/cutouts/helmut-lang/CHINO PANT.png | ready |
| helmut-lang | KNOT SHIRT DRESS | 870000 | women | dress | new-in, women | 2XS, XS, S, M, L, XL | Mini shirt dress in Japanese cotton poplin with side knot detailing at the hip and asymmetric drape, a structured collar and tuxedo cuffs. | assets/cutouts/helmut-lang/KNOT SHIRT DRESS.png | ready |
| helmut-lang | TWISTED SHIRT DRESS | 850000 | women | dress | new-in, women | 2XS, XS, S, M, L | Viscose-jersey shirt dress with an elongated button placket that twists around the body for a close fit, a pointed collar, button cuffs, a high slit and metal-wrapped logo buttons. | assets/cutouts/helmut-lang/TWISTED SHIRT DRESS.png | ready |
| kiko-kostadinov | SARGO SHOES UMBER | 1140000 | men | shoes | new-in, men | 39, 40, 41, 42, 43, 44, 45 | Metropolitan casual shoe with a refined everyday profile, braided whipstitch trim outlining the silhouette and a tonal rubber sole engraved with traditional Bulgarian designs. | assets/cutouts/kiko-kostadinov/SARGO SHOES UMBER.png | ready |
| kiko-kostadinov | OSTRO CANVAS SHOES BEECH ORANGE | 1150000 | men | shoes | new-in, men | 40 | Hybrid-sole shoe with a raw-cut canvas-panelled upper, lace-up closure and branded tongue webbing; 100% bovine leather and cotton. | assets/cutouts/kiko-kostadinov/OSTRO CANVAS SHOES BEECH ORANGE.png | ready |
| kiko-kostadinov | KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN | 479000 | women | shoes | new-in, women | 3, 4, 5, 6, 6.5, 7 | Single-eyelet collaboration shoe in embossed chartreuse suede and two-tone green leather, applying a Mary Jane profile to a classic Oxford with cut-out construction, triple contrast-stitching and a Goodyear-welted air-cushioned sole. | assets/cutouts/kiko-kostadinov/KIKO KOSTADINOV X DR. MARTENS THE TOE BOX SHOE MOSS GREEN.png | ready |
| kiko-kostadinov | RETICELLA BALLERINA SAPPHIRE | 980000 | women | shoes | new-in, women | 35, 36, 37, 38, 39, 40, 41, 42, 43 | Sapphire Reticella shoe in soft viscose point coupé with brushed-suede contrast, custom laces, brushed-silver eyelets and logo-engraved discs; Italian materials, made in Spain, with leather soles and a rubber injection insert. | assets/cutouts/kiko-kostadinov/RETICELLA BALLERINA SAPPHIRE.png | ready |
| meta-campania-collective | Lilo Unlined Trucker Denim Jacket | 1200000 | unisex | jacket | new-in | M, L, XL | Unlined denim trucker jacket made in Italy from 100% cotton, cut in the brand's relaxed trucker silhouette. | assets/cutouts/meta-campania-collective/Lilo Unlined Trucker Denim Jacket_Unisex_Outer/Lilo Unlined Trucker Denim Jacket_Unisex_Outer_Front.png | ready |
| mainline | Ilya | 460000 | men | pants | new-in, men | OS | Wool melton trousers with two-pocket styling, a zip-fly, ruching at the front and back and twisted side seams. | assets/cutouts/mainline/ilya.png | ready |
| commission | Dress | 1250000 | women | dress | new-in, women | 2, 4, 6, 8 | Technical wool shift dress with an upside-down trouser construction at the hem, a boat neckline, scooped back and concealed side zip; fully satin-lined, relaxed fit. | assets/cutouts/commission/dress.png | ready |
| commission | Curve Flap Jacket, Heather Grey | 1000000 | unisex | jacket | new-in | S, M, L | Coated Italian cow-leather jacket with a spread collar and signature curve-flap closure, side-seam pockets, an inside chest pocket and satin lining. | assets/cutouts/commission/Curve Flap Jacket, Heather Grey.png | ready |
| johanna-parv | Skirt Capris, Black | 544800 | women | skirt | new-in, women | S, M, L | One-piece skirt-capris in lightweight recycled nylon-lycra with laser-cut raw edges, a concealed left-side zip, a right-thigh phone/key pocket and internal silicone grips. | assets/cutouts/johanna-parv/Skirt Capris, Black.png | ready |
| johanna-parv | Cover Skirt, Khaki | 748000 | women | skirt | new-in, women | S, M | Waist-banded skirt in a lightweight, stretchy fabric; made in the U.K. | assets/cutouts/johanna-parv/Cover Skirt, Khaki.png | ready |
| a-v-vattev | O'KEEFFE STUDDED T-SHIRT BLACK | 202000 | men | top | new-in, men | S, M, L, XL | Semi-fitted organic cotton-jersey T-shirt with a rib-knit crewneck and a signature O'Keeffe-inspired silver studded ornament on the front. | assets/cutouts/a-v-vattev/O'KEEFFE STUDDED T-SHIRT BLACK.png.png | ready |
| a-v-vattev | SCARF SHIRT PATCHWORK BLACK | 620000 | men | shirt | new-in, men | S, M, L, XL | Loose-fit classic button-up shirt with a unique half-mandarin, half-scarf collar, signature chest belt loops, contrast fabric patchwork on the front and sleeves and classic cuffs; 80% cotton, 20% polyester. | assets/cutouts/a-v-vattev/SCARF SHIRT PATCHWORK BLACK.png | ready |
| super-yaya | SYY X PUMA SPEEDCAT II - BLACK | 155000 | unisex | shoes | new-in | OS | Super Yaya x Puma Speedcat II in patent leather with an embossed polka-dot print; unisex sizing, includes alternate white laces. | assets/cutouts/super-yaya/SYY X PUMA SPEEDCAT II - BLACK.png | ready |
| super-yaya | Winona Knit Polo Tee, Brown Purple | 1100000 | women | top | new-in, women | XS, S, M, L | Short-sleeve knit polo with a contrast V-neck, lace-up detail and two-button closure. | assets/cutouts/super-yaya/Winona Knit Polo Tee, Brown Purple.png | ready |
| lea-boberg | SC Shirt | 879000 | women | shirt | new-in, women | 2, 3, 4 | Sandwich Collar shirt with deep armholes and generous volume for an elegant drape, cuffless convertible-button sleeves, a 4cm high-stand collar and a flat-yoke back with two reverse side pleats. | assets/cutouts/lea-boberg/sc shirt.jpg.png | ready |
| a-v-vattev | VIPER SHEER GREY | 482000 | men | top | new-in, men | XS, S, M, L, XL | Classic semi-sheer knit in light organic cotton with lace-up front fastening and a slightly loose boxy fit. 100% cotton. | assets/cutouts/a-v-vattev/VIPER SHEER GREY.png | ready |
| a-v-vattev | VIPER VEST BLACK | 464000 | men | top | new-in, men | XS, S, M, L, XL | Classic black vest with lace-up front fastening and a relaxed boxy fit. 100% cotton. | assets/cutouts/a-v-vattev/VIPER VEST BLACK.png | ready |
| a-v-vattev | ALLIANCE COLLAR BELT JACKET | 1724000 | men | jacket | new-in, men | S, M, L, XL | Oversized bomber jacket with a signature leather collar belt, zip fastening with concealed snaps, chest belt loops, welt pockets, elasticated cuffs and hem. | assets/cutouts/a-v-vattev/ALLIANCE COLLAR BELT JACKET.png | ready |
| a-v-vattev | STUDDED STRAIGHT SHORTS | 700000 | men | pants | new-in, men | S, M, L, XL | Straight-fit cotton drill shorts with raw edges, silver studded ornaments along the side seams, side pockets and double belt loops. | assets/cutouts/a-v-vattev/STUDDED STRAIGHT SHORTS_바지/STUDDED STRAIGHT SHORTS_front.png | ready |
| a-v-vattev | VIPER CARDIGAN EMERALD GREEN | 499000 | men | top | new-in, men | XS, S, M, L, XL | Emerald green cotton cardigan with lace-up front fastening and a slightly relaxed boxy fit. | assets/cutouts/a-v-vattev/VIPER CARDIGAN EMERALD GREEN.png | ready |
| camiel-fortgens | CF.21.09.02.01 TRACK JACKET technical nylon petrol | 803000 | unisex | jacket | new-in | S, M, L, XL, 2XL | Track jacket in light technical nylon with a stand-up collar, exposed zip closure, two zip pockets and irregular raw-edge topstitching. | assets/cutouts/Camiel Fortgens/CF.21.09.02.01 TRACK JACKET technical nylon petrol_Unisex_Outer/CF.21.09.02.01 TRACK JACKET technical nylon petrol_Unisex_Outer_Front.png | ready |
| camiel-fortgens | CF.21.09.01.01 SIMPLE JACKET technical twill sand | 1035000 | unisex | jacket | new-in | M, L, XL, 2XL | Technical twill jacket with asymmetric front seams, angled welt pockets, bottom drawstring, raw-edge hem and concealed zip closure. | assets/cutouts/Camiel Fortgens/CF.21.09.01.01 SIMPLE JACKET technical twill sand_Unisex_Outer/CF.21.09.01.01 SIMPLE JACKET technical twill sand_Unisex_Outer_Front.png | ready |
| camiel-fortgens | CF.21.15.03.02 WOBBLY JEANS vintage wash denim vintage wash | 874000 | unisex | pants | new-in | XS, S, M, L, XL, 2XL | Baggy wide-leg vintage wash jeans with dropped crotch, twisting side seams, raw details, irregular contrast topstitching and five-pocket construction. | assets/cutouts/Camiel Fortgens/CF.21.15.03.02 WOBBLY JEANS vintage wash denim vintage wash_Unisex_Pants/CF.21.15.03.02 WOBBLY JEANS vintage wash denim vintage wash_Unisex_Pants_Front.png | ready |
| camiel-fortgens | CF.21.06.04.01 SUIT PANTS petrol | 999000 | men | pants | new-in, men | S, M, L, XL, 2XL | Pleated suiting wool pants with dropped crotch, deconstructed waistband, horn button closure, side pockets and a back welt pocket. | assets/cutouts/Camiel Fortgens/CF.21.06.04.01 SUIT PANTS petrol_MAN_Pants/CF.21.06.04.01 SUIT PANTS petrol_MAN_Pants_Front.png | ready |
| camiel-fortgens | CF.21 RESEARCH SHIRT HOODIE | 1499000 | unisex | jacket | new-in | L, XL | Oversized hoodie combined with a short-sleeved boxy shirt, with front zip closure, drawstring hood and garment-dyed layered construction. | assets/cutouts/Camiel Fortgens/CF.21 RESEARCH SHIRT HOODIE_Unisex_Outer/CF.21 RESEARCH SHIRT HOODIE_Unisex_Outer_Front.png | ready |
| camiel-fortgens | CF.21 RESEARCH HOLES SHIRT SHIRTING LIGHT BLUE SUNFADE | 857000 | men | shirt | new-in, men | M, L, XL | Relaxed light-blue sun-faded shirt with irregular punched holes, raw-edge details, uneven cuffs and mother-of-pearl button closure. | assets/cutouts/Camiel Fortgens/CF.21 RESEARCH HOLES SHIRT SHIRTING LIGHT BLUE SUNFADE_MAN_Upper/CF.21 RESEARCH HOLES SHIRT SHIRTING LIGHT BLUE SUNFADE_MAN_Upper_Front.png | ready |
| commission | Shift Velvet Trackpants | 740000 | unisex | pants | new-in | S, M, L, XL | Velvet trackpants offered in black and tan. | assets/cutouts/commission/Shift Velvet Trackpants_Unisex_Pants/Shift Velvet Trackpants_Unisex_Pants_Front.png | ready |
| commission | Zip Rave Cargo | 1052000 | unisex | pants | new-in | 30, 32, 34, 36 | Unisex cargo trousers with zip detailing. | assets/cutouts/commission/Zip Rave Cargo_Unisex_Pants/Zip Rave Cargo_Unisex_Pants_Front.png | ready |
| commission | U-neck Sweater | 907000 | unisex | top | new-in | XS, S, M, L | U-neck sweater offered in red and pencil tones. | assets/cutouts/commission/U-neck Sweater_Unisex_Upper/U-neck Sweater_Unisex_Upper_Front.png | ready |
| commission | Pulled Knit Top | 900000 | women | top | new-in, women | XS, S, M, L | Women's pulled knit top. | assets/cutouts/commission/Pulled Knit Top_Women_Upper/Pulled Knit Top_Women_Upper_Front.png | ready |
| commission | Twisted Velvet Polo | 572000 | unisex | top | new-in | XS, S, M, L, XL | Unisex twisted velvet polo. | assets/cutouts/commission/Twisted Velvet Polo_Unisex_Upper/Twisted Velvet Polo_Unisex_Upper_Front.png | ready |
| gabriela-coll-garments | S18 NO.336 LINEN ZIPPER OVERALL | 1417000 | unisex | top | new-in | 0, 1, 2, 3, 4 | Relaxed linen zipper overall with funnel collar, side pockets, oversized patch pockets, gathered waistband and adjustable inner hem. | assets/cutouts/gabriela-coll-garments/S18 NO.336 LINEN ZIPPER OVERALL_Unisex_Upper/S18 NO.336 LINEN ZIPPER OVERALL_Unisex_Upper_Front.png | ready |
| gabriela-coll-garments | S18 NO.267 SUMMER WOOL DRAPED TROUSERS | 1274000 | unisex | pants | new-in | 0, 1, 2, 3, 4 | Oversized wool and silk trousers with concealed button fly, slant pockets, gathered waistband and interior drawstring. | assets/cutouts/gabriela-coll-garments/S18 NO.267 SUMMER WOOL DRAPED TROUSERS_Unisex_Pants/S18 NO.267 SUMMER WOOL DRAPED TROUSERS_Unisex_Pants_Front.png | ready |
| gabriela-coll-garments | No.263 Crushed Taffeta Skirt | 720000 | women | skirt | new-in, women | 0, 1, 2 | Crushed cotton-silk taffeta skirt made in Spain with individually dyed finish and subtle color variation. | assets/cutouts/gabriela-coll-garments/No.263 Crushed Taffeta Skirt_Women_Skirt/No.263 Crushed Taffeta Skirt_Women_Skirt_Front.png | ready |
| gabriela-coll-garments | No.275 Limonta Hooded Zipper Coat | 1470000 | unisex | jacket | new-in | 1, 2, 3 | Hooded zipper coat in Italian Limonta fabric with two-way zip closure and a zipper extending through the hood. | assets/cutouts/gabriela-coll-garments/No.275 Limonta Hooded Zipper Coat_Unisex_Outer/No.275 Limonta Hooded Zipper Coat_Unisex_Outer_Front.png | ready |
| gabriela-coll-garments | No.287 Corduroy Flap Pocket Trousers | 915000 | unisex | pants | new-in | 0, 1, 2 | Lightweight wide trousers with an adjustable drawstring and elasticated waistband. | assets/cutouts/gabriela-coll-garments/No.287 Corduroy Flap Pocket Trousers_Unisex_Pants/No.287 Corduroy Flap Pocket Trousers_Unisex_Pants_Front.png | ready |
| gabriela-coll-garments | No.7 Fabric Open Toe Babouche | 675000 | unisex | shoes | new-in | 36, 37, 38, 39, 40, 41, 42, 43 | Handmade open-toe babouche shoes with hand-painted sole and embossed logo. | assets/cutouts/gabriela-coll-garments/No.7 Fabric Open Toe Babouche_Shoes/No.7 Fabric Open Toe Babouche_Shoes_Topview.png | ready |
| gimaguas | Galan Track Jacket | 276000 | men | jacket | new-in, men | XS, S, M, L, XL | Navy zip-up track jacket with white contrast piping, a high neck and two front zip pockets; 100% cotton. | assets/cutouts/gimaguas/Galan-Track-Jacket/Galan-Track-Jacket.png | ready |
| gimaguas | Luis Polo | 289000 | men | top | new-in, men | XS, S, M, L, XL | White and blue checkered polo with a faux layered effect — lightweight textured fabric with a faux blue shirt layer underneath, a V-neckline and an oversized silhouette; 100% cotton, made in Portugal. | assets/cutouts/gimaguas/Luis-Polo/Luis-Polo.png | ready |
| gimaguas | William Jacket | 682000 | men | jacket | new-in, men | XS, S, M, L, XL | Black waxed-effect jacket with silver reflective details, an oversized silhouette, two exterior and one interior pocket, a zip front with top-button fastening and buttoned cuffs; 100% cotton, made in Portugal. | assets/cutouts/gimaguas/William-Jacket.png | ready |
| gimaguas | Capazo Bag | 404000 | women | bag | new-in, women | OS | Butter nappa-leather shopper with silver eyelets, two top handles, zip closure and a canvas lining with one interior leather pocket; made in Spain, 100% leather. | assets/cutouts/gimaguas/Capazo-Bag/Capazo-Bag.png | ready |
| gimaguas | Shopper Canvas Bag | 554000 | women | bag | new-in, women | OS | Beige canvas shopper with black leather straps and silver-tone studs, a structured silhouette, magnetic closure and an inner black leather pocket; fits a 15" laptop, made in Spain. | assets/cutouts/gimaguas/Shopper-Canvas-Bag.png | ready |
| gimaguas | Maria Belt | 310000 | women | accessory | new-in, women | S/M, M/L | Black leather belt with a draped multifunction design — a soft elongated strap with silver eyelets, a large silver buckle and a draped leather panel that can be worn as a mini skirt or a belt. | assets/cutouts/gimaguas/Maria-Belt.png | ready |
| helmut-lang | Dissected Field Jacket | 1818800 | men | jacket | new-in, men | XS, S, M, L, XL, 2XL | Transformable field jacket with concealed button and zip closure, encased hood, epaulets, waist drawcord and interior volume-control straps. | assets/cutouts/helmut-lang/Dissected Field Jacket_Men_Outer/Dissected Field Jacket_Men_Outer_Front.png | ready |
| helmut-lang | Track Jacket | 1154300 | men | jacket | new-in, men | XS, S, M, L, XL, 2XL | Track jacket with adjustable bungee hem, two-way zip closure and branded stamp detail. | assets/cutouts/helmut-lang/Track Jacket_Men_Outer/Track Jacket_Men_Outer_Front.png | ready |
| helmut-lang | SAILOR TOP | 544700 | women | top | new-in, women | XS, S, M, L | Asymmetric sailor top with eyelet and rope detail at the shoulder. Made from recycled and organic cotton. | assets/cutouts/helmut-lang/SAILOR TOP_Women_Outer/SAILOR TOP_Women_Outer_Front.png | ready |
| helmut-lang | Bouée Bag | 967360 | unisex | bag | new-in | OS | Cow leather shoulder bag with adjustable strap, interior pocket and stamped front logo. | assets/cutouts/helmut-lang/Bouée Bag_Unisex/Bouée Bag_Unisex_Front.png | ready |
| helmut-lang | Short Sleeve Twisted Shirt Dress | 808800 | women | dress | new-in, women | 2XS, XS, S, M, L, XL | Short-sleeve shirt dress with pointed collar, button front closure, button cuffs and high slit. | assets/cutouts/helmut-lang/Short Sleeve Twisted Shirt Dress_Women_Dress/Short Sleeve Twisted Shirt Dress_Women_Dress_Front.png | ready |
| helmut-lang | Wardrobe Shirt Bomber | 1215300 | unisex | jacket | new-in | 2XS, XS, S, M, L, XL | Slightly cropped wool bomber with two-way front zip, stand collar, metal-wrapped buttons and full lining. | assets/cutouts/helmut-lang/Wardrobe Shirt Bomber_Unisex_Outer/Wardrobe Shirt Bomber_Unisex_Outer_Front.png | ready |
| johanna-parv | VELOCITY BLAZER | 810000 | unisex | jacket | new-in | S, M, L, XL, 2XL | Water-repellent bonded cotton-nylon performance blazer with concealed pockets, ventilation openings and a concealed back zip. | assets/cutouts/johanna-parv/VELOCITY BLAZER _Unisex_Outer/VELOCITY BLAZER _Unisex_Outer_Front.png | ready |
| johanna-parv | VELOCITY TROUSERS | 810000 | unisex | pants | new-in | S, M, L, XL | Water-repellent bonded cotton-nylon trousers with shaped knees, concealed storage pockets, silicone grip dots and reinforced heel openings. | assets/cutouts/johanna-parv/VELOCITY TROUSERS_Unisex_Pants/VELOCITY TROUSERS_Unisex_Pants_Front.png | ready |
| johanna-parv | LONG SLEEVE ZIP SHIRT | 980000 | unisex | shirt | new-in | S, M, L, XL | Water-repellent cotton-nylon zip shirt with mandarin collar, reflective branding, adjustable ventilation and triangular thumbholes. | assets/cutouts/johanna-parv/LONG SLEEVE ZIP SHIRT_Unisex_Upper/LONG SLEEVE ZIP SHIRT_Unisex_Upper_Front.png | ready |
| johanna-parv | TECH VENT BLAZER | 950000 | unisex | jacket | new-in | M, L, XL | Waterproof performance-tailored blazer with concealed pockets, ventilation openings and a concealed back zip. | assets/cutouts/johanna-parv/TECH VENT BLAZER_Unisex_Upper/TECH VENT BLAZER_Unisex_Upper_Front.png | ready |
| johanna-parv | LEATHER ACTION BAG | 1130000 | unisex | bag | new-in | OS | Compact vegetable-tanned leather handbag with adjustable strap, sliding sternum system, magnetic closures and internal card pocket. | assets/cutouts/johanna-parv/LEATHER ACTION BAG_Unisex_Bag/LEATHER ACTION BAG_Unisex_Bag_Front.png | ready |
| johanna-parv | SHORT SLEEVE ZIP SHIRT | 680000 | unisex | shirt | new-in | XS, S, M, L | Lightweight nylon short-sleeve zip shirt with mandarin collar, snap-button closure and ventilation openings. | assets/cutouts/johanna-parv/SHORT SLEEVE ZIP SHIRT_Unisex_Upper/SHORT SLEEVE ZIP SHIRT_Unisex_Upper_Front.png | ready |
| kiko-kostadinov | KIKO KOSTADINOV X THE DANTE COLLECTION DANTE ARMOURED COAT WENGE BROWN | 1600000 | women | jacket | new-in, women | 34, 36, 38 | Wenge brown armoured coat made in Europe from virgin wool, polyamide and other fibers. | assets/cutouts/kiko-kostadinov/KIKO KOSTADINOV X THE DANTE COLLECTION DANTE ARMOURED COAT WENGE BROWN_Women_Outer/KIKO KOSTADINOV X THE DANTE COLLECTION DANTE ARMOURED COAT WENGE BROWN_Women_Outer_Front.png | ready |
| kiko-kostadinov | OTAK POLO SHIRT NAVY | 560000 | men | shirt | new-in, men | 46, 48, 50 | Navy cotton polo shirt made in Europe. | assets/cutouts/kiko-kostadinov/OTAK POLO SHIRT NAVY_MEN_Upper/OTAK POLO SHIRT NAVY_MEN_Upper_front.png | ready |
| kiko-kostadinov | MEZULARI BAG PITCH BLACK | 1600000 | unisex | bag | new-in | OS | Pitch-black sheep-skin leather bag made in Europe. | assets/cutouts/kiko-kostadinov/MEZULARI BAG PITCH BLACK_Unisex_Bag/MEZULARI BAG PITCH BLACK_Unisex_Bag_Front.png | ready |
| kiko-kostadinov | IKAT ARGYLE JACQUARD SKIRT FAIENCE BLUE | 930000 | women | skirt | new-in, women | 36, 38 | Faience-blue ikat argyle jacquard skirt in viscose, polyethylene and tencel. | assets/cutouts/kiko-kostadinov/IKAT ARGYLE JACQUARD SKIRT FAIENCE BLUE_Women_Skirt/IKAT ARGYLE JACQUARD SKIRT FAIENCE BLUE_Women_Skirt_Front.png | ready |
| kiko-kostadinov | SALOME TROUSER NIGHT BLACK | 1200000 | unisex | pants | new-in | 36, 38 | Night-black viscose trousers made in Europe. | assets/cutouts/kiko-kostadinov/SALOME TROUSER NIGHT BLACK_Unisex_Pants/SALOME TROUSER NIGHT BLACK_Unisex_Pants_Front.png | ready |
| kiko-kostadinov | LELLA HYBRID UMBER | 1130000 | women | shoes | new-in, women | 37, 38 | Umber hybrid shoes made in Italy from calf and bovine leather. | assets/cutouts/kiko-kostadinov/LELLA HYBRID UMBER_Women_Shoes/LELLA HYBRID UMBER_Women_Shoes_Topview.png | ready |
| mainline | KEELAN | 512000 | women | top | new-in, women | XS, S, M | Slim-fit sleeveless hooded cotton top with open-back construction. | assets/cutouts/mainline/KEELAN_Women_Upper/KEELAN_Women_Upper_Front.png | ready |
| mainline | SAEIN | 746000 | women | jacket | new-in, women | XS, L | Open hooded cotton cardigan with adjustable drawstrings, button closure, contrast color blocking and fitted silhouette. | assets/cutouts/mainline/SAEIN_Women_Outer/SAEIN_Women_Outer_Front.png | ready |
| mainline | GREY OPEN-BACK TANK WITH HOOD | 486000 | women | top | new-in, women | XS, M | Slim-fit sleeveless hooded cotton tank with open-back detail. | assets/cutouts/mainline/GREY OPEN-BACK TANK WITH HOOD_Women_Upper/GREY OPEN-BACK TANK WITH HOOD_Women_Upper_Front.png | ready |
| meta-campania-collective | Peter Jersey Cotton T Shirt | 440000 | unisex | top | new-in | XS, S, M, L, XL, 2XL | Jersey cotton T-shirt made in Italy from 100% cotton. | assets/cutouts/meta-campania-collective/Peter Jersey Cotton T Shirt_Unisex_Upper/Peter Jersey Cotton T Shirt_Unisex_Upper_Front.png | ready |
| meta-campania-collective | Aime Silk Ballerina Shoes | 770000 | unisex | shoes | new-in | OS | Silk rib ballerina shoes made in Italy. | assets/cutouts/meta-campania-collective/Aime Silk Ballerina Shoes_Unisex_Shoes/Aime Silk Ballerina Shoes_Unisex_Shoes_Topview.png | ready |
| meta-campania-collective | Hooded Cotton Crop Blouson | 2510000 | unisex | jacket | new-in | L | Hooded cotton crop blouson made in Italy from 100% cotton. | assets/cutouts/meta-campania-collective/Hooded Cotton Crop Blouson_Unisex_Outer/Hooded Cotton Crop Blouson_Unisex_Outer_front.png | ready |
| meta-campania-collective | Julian Selflined Denim Shirt Jacket | 1400000 | unisex | jacket | new-in | M, L, XL, 2XL | Self-lined denim shirt jacket made in Italy from 100% cotton. | assets/cutouts/meta-campania-collective/Julian Selflined Denim Shirt Jacket_Unisex_Outer/Julian Selflined Denim Shirt Jacket_Unisex_Outer_front.png | ready |
| meta-campania-collective | Unlined Midweight Cotton Boxy Shirt | 1530000 | unisex | shirt | new-in | M, L, XL, 2XL | Unlined midweight cotton boxy shirt made in Italy from 100% cotton. | assets/cutouts/meta-campania-collective/Unlined Midweight Cotton Boxy Shirt_Unisex_Outer/Unlined Midweight Cotton Boxy Shirt_Unisex_Outer_Front.png | ready |
| paloma-wool | no 2409 - Simp | 214000 | women | top | new-in, women | XS, S, M, L, XL | Soft micromodal short-sleeve top with a draped neckline and hook-and-eye closure on one side. | assets/cutouts/paloma-wool/no 2409 _ Simp_Women_Upper/no 2409-Simp_Women_Upper_Front.png | ready |
| paloma-wool | no 2911 - Mire | 205000 | women | top | new-in, women | XS, S, M, L, XL | Sleeveless organic cotton top with twisted shoulder details. | assets/cutouts/paloma-wool/no 2911 _ Mire_Women_Upper/no 2911 - Mire_Women_Upper_Front.png | ready |
| paloma-wool | no 2793 - Lula | 660500 | women | jacket | new-in, women | XS, S, M, L, XL | Fitted grey blazer with snap-button closure in wrinkle-resistant wool suiting fabric. | assets/cutouts/paloma-wool/no 2793 _ Lula_Women_Outer/no 2793 - Lula_Women_Outer_Front.png | ready |
| paloma-wool | no 2524 - Long Charco | 372500 | women | skirt | new-in, women | 34, 36, 38, 40, 42, 44 | Dark-grey pinstriped mini skirt with full-length side zippers in wrinkle-resistant wool suiting fabric. | assets/cutouts/paloma-wool/no 2524 _ Long Charco_Women_Skrts/no 2524 - Long Charco_Women_Skrts_Front.png | ready |
| paloma-wool | no 2797 - Lumieti Skirt | 379000 | women | skirt | new-in, women | XS, S, M, L, XL | Long fitted tricot skirt in opaque merino wool with side button fastening and softly falling extra fabric. | assets/cutouts/paloma-wool/no 2797 _ Lumieti Skirt_Women_Skirts/no 2797 _ Lumieti Skirt_Women_Skirts_Front.png | ready |
| paloma-wool | no 2892 - Adriana II | 335000 | women | accessory | new-in, women | XS/S, M/L | Sash-style belt with gathered fabric panel and leather double-buckle closure, designed for the hips or as a top. | assets/cutouts/paloma-wool/no 2892 _ Adriana II_Women_Belts/no 2892 - Adriana II_Women_Belts_Front.png | ready |
| ponder-er | GLIN Smocked Cardigan | 330000 | women | top | new-in, women | XS, S, M, L | Burgundy smocked cardigan with button closure, elasticated body-hugging fit and tencel-wool blend. | assets/cutouts/ponder-er/_GLIN_ Smocked Cardigan_Women_Upper/GLIN_ Smocked Cardigan_Women_Upper_Front.png | ready |
| ponder-er | SPLASH Washed Vest | 250000 | women | top | new-in, women | XS, S, M, L | Blue washed vest with semi-sheer V-neck insertion, button details and an elasticated body-hugging fit. | assets/cutouts/ponder-er/_SPLASH_ Washed Vest_Women_Upper/SPLASH_ Washed Vest_Women_Upper_Front.png | ready |
| ponder-er | PINCH Flared Denim Trousers | 250000 | women | pants | new-in, women | 26, 28, 30, 32, 34 | Coated denim flared trousers with rusty washed shade, zip fly, logo hardware and back waistband patch. | assets/cutouts/ponder-er/_PINCH_ Flared Denim Trousers_Women_Pants/PINCH_ Flared Denim Trousers_Women_Pants_Front.png | ready |
| ponder-er | VOYA Faux-Shearling Jacket | 1140000 | women | jacket | new-in, women | XS, S, M, L | Relaxed faux-shearling jacket with zip closure and cupro-viscose lining. | assets/cutouts/ponder-er/_VOYA_ Faux-Shearling Jacket_Women_Outer/VOYA_ Faux-Shearling Jacket_Women_Outer_Front.png | ready |
| ponder-er | WIZ Zip-up Dress | 550000 | women | dress | new-in, women | XS, S, M, L | Burgundy smocked zip-up dress with elasticated body-hugging fit and two-way zip closure. | assets/cutouts/ponder-er/_WIZ_ Zip-up Dress_Women_Dress/WIZ_ Zip-up Dress_Women_Dress_Front.png | ready |
| super-yaya | Trouser Noucki | 895000 | unisex | pants | new-in | 34, 36 | Coated wide-leg cotton trousers with narrow waistband detail, made in Lebanon. | assets/cutouts/super-yaya/Trouser Noucki_Unisex_Pants/Trouser Noucki_Unisex_Pants_Front.png | ready |
| super-yaya | Shirt Necklace | 995000 | women | shirt | new-in, women | 34, 36 | Loose-fit long-sleeve cotton shirt with necklace-like collar and horn-button details. | assets/cutouts/super-yaya/Shirt Necklace_Women_Upper/Shirt Necklace_Women_Upper_Front.png | ready |
| super-yaya | Panarea Trouser | 1895000 | women | pants | new-in, women | 34 | Mid-waist loose cotton trousers with gathering, diagonal front seams, pockets and crystal stud accents. | assets/cutouts/super-yaya/Panarea Trouser_Women_Pants/Panarea Trouser_Women_Pants_Front.png | ready |
| super-yaya | Nelly T-Shirt | 745000 | women | top | new-in, women | 34, 36 | Round-neck cotton T-shirt with gathered bands following the body and waist line. | assets/cutouts/super-yaya/Nelly T-Shirt_Women_Upper/Nelly T-Shirt_Women_Upper_Front.png | ready |
| super-yaya | Syy Classic T-Shirt | 259000 | unisex | top | new-in | S, M, L | Comfortable unisex cotton T-shirt with Super Yaya 100% front graphic. | assets/cutouts/super-yaya/Syy Classic T-Shirt_Unisex_Upper/Syy Classic T-Shirt_Unisex_Upper_Front.png | ready |
| umber-postpast | INDIGO DYED COTTON DOUBLE BUTTON SHIRT | 550000 | unisex | shirt | new-in | 0, 1, 3, 4 | Indigo-dyed organic cotton long-sleeve shirt with double-button front, shell buttons and back yoke box pleat. | assets/cutouts/umber-postpast/INDIGO DYED COTTON DOUBLE BUTTON SHIRT_Unisex_Upper/INDIGO DYED COTTON DOUBLE BUTTON SHIRT_Unisex_Upper_Front.png | ready |
| umber-postpast | NATURAL DYED JACQUARD SILK RAYON DRESS Regular price | 980000 | women | dress | new-in, women | 0, 1, 2 | Regular-fit long high-neck dress in naturally dyed jacquard silk blend with side zip, cuff buttons and side pockets. | assets/cutouts/umber-postpast/NATURAL DYED JACQUARD SILK RAYON DRESS Regular price_Women_Dress/NATURAL DYED JACQUARD SILK RAYON DRESS Regular price_Women_Dress_Front.png | ready |
| umber-postpast | NATURAL DYED COTTON SILK PALE FIELD JACKET | 1180000 | unisex | jacket | new-in | 0, 3 | Four-button cotton-silk field jacket with horn-button closure, front flap patch pockets and mud-dyed contrast collar. | assets/cutouts/umber-postpast/NATURAL DYED COTTON SILK PALE FIELD JACKET_Unisex_Outer/NATURAL DYED COTTON SILK PALE FIELD JACKET_Unisex_Outer_Front.png | ready |
| umber-postpast | SILK DENIM SKIRT | 520000 | women | skirt | new-in, women | 1, 2, 3 | High-rise H-line silk denim midi skirt with engraved buttons, silver-tone hardware, rounded pockets and contrast stitching. | assets/cutouts/umber-postpast/SILK DENIM SKIRT_Women_Skirt/SILK DENIM SKIRT_Women_Skirt_Front.png | ready |
| umber-postpast | TRIANGLE BAG | 480000 | unisex | bag | new-in | OS | Triangular box calf-leather bag with hand-knotted strap, lacquered metal straw and front logo hardware. | assets/cutouts/umber-postpast/TRIANGLE BAG_Unisex_Bag/TRIANGLE BAG_Unisex_Bag_Front.png | ready |
| umber-postpast | KNOTTED NUBI SQUARE BAG | 280000 | unisex | bag | new-in | OS | Mud-dyed silk quilted strap bag with magnetic closure, hand-knotted detail and internal pocket. | assets/cutouts/umber-postpast/KNOTTED NUBI SQUARE BAG_Unisex_Bag/KNOTTED NUBI SQUARE BAG_Unisex_Bag_Front.png | ready |

---

# Products Needing Details

These products still need at least one manually reviewed field.

| Brand Slug | Product Name | Status | Outstanding field(s) |
|---|---|---|---|
| abelia-edoward-goucha | Ordinary Shirt Chino | needs-details | pending manual review |
| gimaguas | Bailarina Wedges Black Silueta 01 | needs-details | pending manual review |

---

# Figma Source Nodes

Product details for the 2026-05-31 integration were collected from:

`206:2`, `206:8`, `206:11`, `206:15`, `206:19`, `206:23`, `206:27`, `206:31`, `206:35`, `206:39`, `206:43`, `206:47`, `206:51`, `206:55`, `206:59`, `206:63`, `229:2`

---

# Validation Checklist

- 119 visible products exist.
- 17 visible brands exist.
- Natasha Zinko does not exist in website-visible data.
- Camiel Fortgens exists with slug `camiel-fortgens`.
- ponder.er exists with slug `ponder-er`.
- Product prices are numeric KRW values.
- Product names are based on cutout filenames or cutout product-folder names.
- Generated WebP files preserve source dimensions.
- Nested product cards use representative and hover images when both are available.
