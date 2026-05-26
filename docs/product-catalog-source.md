# sable Product Catalog Source

## Purpose

This file is the source of truth for the MVP product catalog.

Codex should use this file to update:
- data/brands.ts
- data/products.ts
- product image matching
- brand website URLs
- product names and prices

Do not modify Header, BrandMegaMenu, SearchOverlay, ProductGrid layout, Cart logic, or route structure unless absolutely required.

## Rules

- Price must be stored as a number.
- Example: 870,000 KRW → 870000
- Display formatting should be handled by the UI.
- Hodakova must not be used.
- ponder.er must use the slug `ponder-er`.
- All products should be included in `new-in` by default.
- Do not over-classify products into women/men/life/sale unless explicitly provided.
- Product display names must preserve Korean/English spelling as written below.
- Product slugs should be generated from brand slug + product name.
- If Korean product names cannot produce stable slugs, use brand slug + stable index fallback.

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

| Brand Slug | Product Name | Price KRW | Default Category |
|---|---|---:|---|
| abelia-edoward-goucha | ordinary shirt chino | 870000 | new-in |
| abelia-edoward-goucha | sun hoodie | 432000 | new-in |
| natasha-zinko | Bunny bag | 320000 | new-in |
| natasha-zinko | double tshirt | 450000 | new-in |
| natasha-zinko | oversized double polo | 450000 | new-in |
| gimaguas | 발레리나 웻지 | 630000 | new-in |
| gimaguas | 인그리드 드레스 | 231000 | new-in |
| gimaguas | 다리아 탑 | 213000 | new-in |
| gimaguas | 루이스 폴로 | 290000 | new-in |
| gimaguas | 다니엘 자켓 | 621000 | new-in |
| gabriela-coll-garments | 297 백 | 1070000 | new-in |
| gabriela-coll-garments | 216 립스탑 | 1480000 | new-in |
| gabriela-coll-garments | 317 | 545000 | new-in |
| gabriela-coll-garments | 304 | 845000 | new-in |
| umber-postpast | 오간자 | 520000 | new-in |
| umber-postpast | 트렌치 | 1550000 | new-in |
| umber-postpast | 롱드레스 | 650000 | new-in |
| ponder-er | 백 | 530000 | new-in |
| ponder-er | 보바 자켓 | 870000 | new-in |
| ponder-er | 라벨 스커트 | 570000 | new-in |
| paloma-wool | 벨트 | 345000 | new-in |
| paloma-wool | 데님 | 469000 | new-in |
| paloma-wool | 홀터넥 | 249000 | new-in |
| edward-cuming | Thong Sandal Mens | 791000 | new-in |
| edward-cuming | 봄버 | 1115000 | new-in |
| edward-cuming | 데님 | 776000 | new-in |
| edward-cuming | 스커트 | 880000 | new-in |
| helmut-lang | 넥집업 | 229000 | new-in |
| helmut-lang | 치노팬츠 | 450000 | new-in |
| helmut-lang | 노트 셔츠 드레스 | 870000 | new-in |
| helmut-lang | 트위스트 | 850000 | new-in |
| kiko-kostadinov | 사르고 슈즈 | 1140000 | new-in |
| kiko-kostadinov | 오스트로 | 1150000 | new-in |
| kiko-kostadinov | 키코 닥터마틴 | 479000 | new-in |
| kiko-kostadinov | 발레리나 | 980000 | new-in |
| meta-campania-collective | Nino jacket | 1200000 | new-in |
| mainline | Ilya pants | 460000 | new-in |
| commission | Tie tartan mini dress | 1250000 | new-in |
| commission | Curve Flap Jacket, Heather Grey | 1000000 | new-in |
| johanna-parv | Skirt Capris, Black | 544800 | new-in |
| johanna-parv | Cover Skirt, Khaki | 748000 | new-in |
| a-v-vattev | O'KEEFFE STUDDED T-SHIRT BLACK | 202000 | new-in |
| a-v-vattev | SCARF SHIRT PATCHWORK BLACK | 620000 | new-in |
| super-yaya | SYY X PUMA SPEEDCAT II - BLACK | 155000 | new-in |
| super-yaya | Winona Knit Polo Tee, Brown/Purple | 1100000 | new-in |
| lea-boberg | SC SHIRT | 879000 | new-in |

---

# Image Matching Rules

Use this order:

1. If `data/product-images.ts` has product name or product slug metadata, match by product slug.
2. If product image filenames are based on product names, slugify product names and match them.
3. If image filenames are sequential, match by brand slug and product order.
4. If a product has no matching image, leave `image` undefined and allow placeholder fallback.
5. If an image has no matching product, report it as unused.

---

# Validation Checklist

After integration, verify:

- 46 products exist.
- 17 brands exist.
- Hodakova does not exist.
- ponder.er exists with slug `ponder-er`.
- Brand website URLs are present.
- Product prices are number values.
- `/new-in` shows all products.
- `/brands/[brandSlug]` shows correct brand products.
- `/products/[slug]` shows product name, price, brand, and image or placeholder.
- Search works with Korean and English product names.
- Price is displayed as KRW with commas.