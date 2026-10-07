# Hero art prompts

AI art prompts for all 126 heroes, in one consistent vintage-tarot style. The same prompts are in `prompts.csv` for batch tools.

## How to use

1. Generate each hero with its prompt. **Midjourney:** use the "Midjourney" line, which adds `--ar 2:3 --style raw`. **ChatGPT, DALL-E, Gemini and others:** use the plain prompt and ask for a **portrait 2:3** image (e.g. 1024×1536).
2. Keep the image if it matches the style: the figure centred, full body, ink outlines, parchment colours, and **no text or border** (the site draws the frame and name).
3. Save it in the `art-source/` folder as the file name shown (e.g. `juggernaut.png`). Any format works: png, jpg or webp.
4. Run `python tools/prepare_art.py`. It crops and resizes the images into `public/art/` and updates the list of heroes that have art.
5. Commit and push. Heroes without art keep the current look until you add theirs.

**Tips for a consistent deck**
- Generate a few heroes first, pick the one you like most, and use it as a style reference (Midjourney: `--sref <image url>`; ChatGPT: upload it and say "same style as this").
- The site shows art in narrow panels when someone picks 3 heroes, so the figure must stand in the **middle third** of the image.
- The prompts describe each hero instead of naming them. AI tools often refuse to draw named game characters, or copy the official art when they do; descriptions give a more original take.

## Shared style

> Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: *[hero description]*, *[attribute scene]*. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.

| Attribute | Scene |
|---|---|
| Strength | under a rust-red sky with a large sun and rocky mountains |
| Agility | among green rolling hills under a pale gold sky with a rising sun |
| Intelligence | under a deep blue night sky with a crescent moon and stars |
| Universal | under a violet twilight sky with stars and distant ruins |

## Strength

### Abaddon → `abaddon.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a pale knight in dark plate armour with a tall horned helm, a spectral pale horse beside him, holding a long sword wreathed in cold mist, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a pale knight in dark plate armour with a tall horned helm, a spectral pale horse beside him, holding a long sword wreathed in cold mist, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Alchemist → `alchemist.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small goblin alchemist riding on the shoulders of a huge brutish ogre, glowing potion flasks and gold coins spilling around them, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small goblin alchemist riding on the shoulders of a huge brutish ogre, glowing potion flasks and gold coins spilling around them, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Axe → `axe.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a huge red-skinned warrior with a topknot and braided beard, bare-chested in heavy armour, gripping an enormous double-bladed axe, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a huge red-skinned warrior with a topknot and braided beard, bare-chested in heavy armour, gripping an enormous double-bladed axe, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Bristleback → `bristleback.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a stout armoured boar-like beast covered in long quills, wearing a tattered scarf and holding a wooden club, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a stout armoured boar-like beast covered in long quills, wearing a tattered scarf and holding a wooden club, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Centaur Warrunner → `centaur.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a massive centaur warrior with a horse body, horned helmet and war paint, wielding a huge double-edged blade, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a massive centaur warrior with a horse body, horned helmet and war paint, wielding a huge double-edged blade, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Chaos Knight → `chaos_knight.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a dark knight in jagged red and black armour riding a pale ghostly horse, swinging a fiery flail, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a dark knight in jagged red and black armour riding a pale ghostly horse, swinging a fiery flail, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Dawnbreaker → `dawnbreaker.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a radiant celestial warrior woman with golden skin and star-like hair, wielding a great celestial hammer, sunlight bursting behind her, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a radiant celestial warrior woman with golden skin and star-like hair, wielding a great celestial hammer, sunlight bursting behind her, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Doom → `doom_bringer.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a towering red demon with burning horns and wings, holding a flaming sword, chains and fire around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a towering red demon with burning horns and wings, holding a flaming sword, chains and fire around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Dragon Knight → `dragon_knight.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a knight in red and gold plate armour with a dragon-crested helm and kite shield, the shadow of a great dragon behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a knight in red and gold plate armour with a dragon-crested helm and kite shield, the shadow of a great dragon behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Earth Spirit → `earth_spirit.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a jade stone warrior spirit with a carved stone body and glowing green patterns, holding a round boulder, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a jade stone warrior spirit with a carved stone body and glowing green patterns, holding a round boulder, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Earthshaker → `earthshaker.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a giant bull-horned shaman with a heavy wooden totem club, cracks of glowing earth beneath his hooves, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a giant bull-horned shaman with a heavy wooden totem club, cracks of glowing earth beneath his hooves, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Elder Titan → `elder_titan.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an ancient blue giant with a great hammer, his glowing astral spirit rising above him, the earth split below, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an ancient blue giant with a great hammer, his glowing astral spirit rising above him, the earth split below, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Huskar → `huskar.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lean tribal warrior with war paint and dreadlocks, holding burning spears, flames rising from his own wounds, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lean tribal warrior with war paint and dreadlocks, holding burning spears, flames rising from his own wounds, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Kunkka → `kunkka.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a proud sea captain in a long admiral's coat and tricorn hat, holding a cutlass, a ghost ship and waves behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a proud sea captain in a long admiral's coat and tricorn hat, holding a cutlass, a ghost ship and waves behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Legion Commander → `legion_commander.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a warrior commander woman in red and gold armour with a flowing war banner, raising a long sword in a duel stance, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a warrior commander woman in red and gold armour with a flowing war banner, raising a long sword in a duel stance, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Lifestealer → `life_stealer.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a gaunt grey ghoul with long claws crouching on all fours, broken chains hanging from his wrists, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a gaunt grey ghoul with long claws crouching on all fours, broken chains hanging from his wrists, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Lycan → `lycan.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a noble werewolf lord in dark armour standing between two great wolves, a full moon behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a noble werewolf lord in dark armour standing between two great wolves, a full moon behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Mars → `mars.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a war god in bronze armour with a crested helmet, a round shield and a long spear, standing in an arena, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a war god in bronze armour with a crested helmet, a round shield and a long spear, standing in an arena, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Night Stalker → `night_stalker.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a hunched nocturnal monster with leathery wings, huge claws and a wide fanged grin, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a hunched nocturnal monster with leathery wings, huge claws and a wide fanged grin, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Ogre Magi → `ogre_magi.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a two-headed blue ogre mage in red robes, both heads grinning, holding a staff with flames, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a two-headed blue ogre mage in red robes, both heads grinning, holding a staff with flames, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Omniknight → `omniknight.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a holy paladin in silver armour and a white cloak raising a heavy hammer, a halo of light around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a holy paladin in silver armour and a white cloak raising a heavy hammer, a halo of light around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Phoenix → `phoenix.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a luminous firebird of the sun with wings spread wide and a burning sphere at its heart, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a luminous firebird of the sun with wings spread wide and a burning sphere at its heart, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Primal Beast → `primal_beast.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an enormous horned primeval beast with tusks and a ridge of spikes on its back, charging and roaring, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an enormous horned primeval beast with tusks and a ridge of spikes on its back, charging and roaring, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Pudge → `pudge.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a huge stitched-together butcher with a meat hook on a chain and a cleaver, wearing a stained apron, grinning, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a huge stitched-together butcher with a meat hook on a chain and a cleaver, wearing a stained apron, grinning, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Slardar → `slardar.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a scaly blue sea guardian with a fin crest holding a heavy mace, standing in the surf, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a scaly blue sea guardian with a fin crest holding a heavy mace, standing in the surf, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Spirit Breaker → `spirit_breaker.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a massive blue bull-like spirit with glowing chains and a heavy mace, charging forward, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a massive blue bull-like spirit with glowing chains and a heavy mace, charging forward, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Sven → `sven.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a rogue knight in blue armour with a huge sword and a spiked shield, a storm gathering behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a rogue knight in blue armour with a huge sword and a spiked shield, a storm gathering behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Tidehunter → `tidehunter.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a bulky green sea monster with a tentacled jaw holding an anchor, waves crashing around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a bulky green sea monster with a tentacled jaw holding an anchor, waves crashing around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Timbersaw → `shredder.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small goblin inside a steam-powered suit of spinning sawblades and chains, felled trees around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small goblin inside a steam-powered suit of spinning sawblades and chains, felled trees around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Tiny → `tiny.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a colossal giant made of boulders and stone, holding an uprooted tree, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a colossal giant made of boulders and stone, holding an uprooted tree, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Treant Protector → `treant.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an ancient walking tree guardian with a mossy bark body and branch arms, flowers blooming at his feet, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an ancient walking tree guardian with a mossy bark body and branch arms, flowers blooming at his feet, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Tusk → `tusk.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a burly walrus warrior with ivory tusks and a fur coat, fists raised, snow falling, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a burly walrus warrior with ivory tusks and a fur coat, fists raised, snow falling, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Underlord → `abyssal_underlord.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a horned demonic lord in spiked armour with glowing eyes, a dark swirling portal behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a horned demonic lord in spiked armour with glowing eyes, a dark swirling portal behind him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Undying → `undying.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a towering rotting zombie king holding a tombstone, undead hands rising from the soil, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a towering rotting zombie king holding a tombstone, undead hands rising from the soil, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Wraith King → `skeleton_king.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a skeleton king with a crown and ghostly green robes, wielding a great sword, spectral flames around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a skeleton king with a crown and ghostly green robes, wielding a great sword, spectral flames around him, under a rust-red sky with a large sun and rocky mountains. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

## Agility

### Anti-Mage → `antimage.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lean elf monk with purple hair and twin curved glaives, a magic seal shattering behind him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lean elf monk with purple hair and twin curved glaives, a magic seal shattering behind him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Arc Warden → `arc_warden.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a blue spectral warden covered in electric runes, an identical glowing twin standing behind him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a blue spectral warden covered in electric runes, an identical glowing twin standing behind him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Bloodseeker → `bloodseeker.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lean feral hunter in a horned bone mask with twin curved blades, blood-red mist around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lean feral hunter in a horned bone mask with twin curved blades, blood-red mist around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Bounty Hunter → `bounty_hunter.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small goblin bounty hunter in a long scarf holding throwing stars, gold coins scattered at his feet, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small goblin bounty hunter in a long scarf holding throwing stars, gold coins scattered at his feet, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Broodmother → `broodmother.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a giant spider queen with long legs and glowing eyes, web strands stretching behind her, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a giant spider queen with long legs and glowing eyes, web strands stretching behind her, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Clinkz → `clinkz.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a burning skeleton archer drawing a flaming bow, embers flying, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a burning skeleton archer drawing a flaming bow, embers flying, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Drow Ranger → `drow_ranger.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a pale blue-skinned elf archer woman in a hooded cloak with a frost bow and icy arrows, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a pale blue-skinned elf archer woman in a hooded cloak with a frost bow and icy arrows, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Ember Spirit → `ember_spirit.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a fiery martial artist made of flame with burning twin swords, glowing embers floating around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a fiery martial artist made of flame with burning twin swords, glowing embers floating around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Faceless Void → `faceless_void.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a faceless hooded time traveller holding a mace, a clock-like sphere of frozen time around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a faceless hooded time traveller holding a mace, a clock-like sphere of frozen time around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Gyrocopter → `gyrocopter.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small dwarf pilot in goggles flying a steampunk gyrocopter armed with guns, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small dwarf pilot in goggles flying a steampunk gyrocopter armed with guns, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Hoodwink → `hoodwink.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small hooded squirrel scout with a crossbow and acorns, peeking out from a tree, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small hooded squirrel scout with a crossbow and acorns, peeking out from a tree, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Juggernaut → `juggernaut.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a masked swordsman in a tall painted wooden tribal mask and a tattered orange cloak, holding a long curved blade, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a masked swordsman in a tall painted wooden tribal mask and a tattered orange cloak, holding a long curved blade, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Kez → `kez.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a nimble bird-like warrior with a feathered crest, wielding a katana and a sai, mid-leap, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a nimble bird-like warrior with a feathered crest, wielding a katana and a sai, mid-leap, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Luna → `luna.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a moon priestess in silver armour riding a great panther, a crescent glaive in hand, a crescent moon above, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a moon priestess in silver armour riding a great panther, a crescent glaive in hand, a crescent moon above, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Medusa → `medusa.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a snake-haired gorgon queen with a serpent tail and a bow, a glowing green shield of magic around her, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a snake-haired gorgon queen with a serpent tail and a bow, a glowing green shield of magic around her, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Meepo → `meepo.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a mischievous little earth creature with a shovel and a net, surrounded by identical copies of himself, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a mischievous little earth creature with a shovel and a net, surrounded by identical copies of himself, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Monkey King → `monkey_king.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a monkey warrior balancing on top of a long golden staff, clouds swirling below, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a monkey warrior balancing on top of a long golden staff, clouds swirling below, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Morphling → `morphling.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a humanoid figure made entirely of flowing water, shifting shape, waves splashing around, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a humanoid figure made entirely of flowing water, shifting shape, waves splashing around, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Naga Siren → `naga_siren.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a sea siren with a serpent tail, twin swords and flowing hair, singing, mirror images of herself behind, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a sea siren with a serpent tail, twin swords and flowing hair, singing, mirror images of herself behind, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Phantom Assassin → `phantom_assassin.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a veiled assassin woman with a slender blade and a dark mask, shadowy afterimages behind her, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a veiled assassin woman with a slender blade and a dark mask, shadowy afterimages behind her, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Phantom Lancer → `phantom_lancer.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lancer in light armour with a long spear, many mirrored illusions of himself around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lancer in light armour with a long spear, many mirrored illusions of himself around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Razor → `razor.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lightning spirit with a crackling whip of electricity, arcs of lightning around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lightning spirit with a crackling whip of electricity, arcs of lightning around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Riki → `riki.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small sneaky satyr assassin with daggers, half hidden in purple smoke, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small sneaky satyr assassin with daggers, half hidden in purple smoke, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Shadow Fiend → `nevermore.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a demonic soul reaper with dark skin and long horns, swirling souls around him like raven wings, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a demonic soul reaper with dark skin and long horns, swirling souls around him like raven wings, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Slark → `slark.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a slim fish-like assassin with a curved dagger and a glowing amulet, slipping out of the shadows, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a slim fish-like assassin with a curved dagger and a glowing amulet, slipping out of the shadows, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Sniper → `sniper.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a dwarf marksman in a helmet aiming a very long rifle from a hillside, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a dwarf marksman in a helmet aiming a very long rifle from a hillside, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Spectre → `spectre.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a ghostly purple wraith with a long flowing spectral body and shadow blades, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a ghostly purple wraith with a long flowing spectral body and shadow blades, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Templar Assassin → `templar_assassin.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a veiled female assassin with psionic blades, a shimmering refraction shield around her, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a veiled female assassin with psionic blades, a shimmering refraction shield around her, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Terrorblade → `terrorblade.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a demon in black armour with great horns and two cleaving blades, mirror shards around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a demon in black armour with great horns and two cleaving blades, mirror shards around him, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Troll Warlord → `troll_warlord.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a tall blue troll berserker with twin axes and bone ornaments, raging, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a tall blue troll berserker with twin axes and bone ornaments, raging, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Ursa → `ursa.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a giant fierce bear warrior with clawed gauntlets and tribal armour, roaring, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a giant fierce bear warrior with clawed gauntlets and tribal armour, roaring, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Vengeful Spirit → `vengefulspirit.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a vengeful winged spirit woman glowing blue, a sword raised in her hand, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a vengeful winged spirit woman glowing blue, a sword raised in her hand, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Viper → `viper.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a green winged drake with venom dripping from its jaws, wings spread wide, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a green winged drake with venom dripping from its jaws, wings spread wide, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Weaver → `weaver.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an insect-like weaver with delicate wings and a long body, threads of time trailing behind it, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an insect-like weaver with delicate wings and a long body, threads of time trailing behind it, among green rolling hills under a pale gold sky with a rising sun. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

## Intelligence

### Ancient Apparition → `ancient_apparition.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a frozen ancient ice spirit with a skeletal form and a crystal staff, a blizzard around it, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a frozen ancient ice spirit with a skeletal form and a crystal staff, a blizzard around it, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Chen → `chen.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a holy knight on a sacred horse holding a staff, followed by the creatures he has converted, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a holy knight on a sacred horse holding a staff, followed by the creatures he has converted, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Crystal Maiden → `crystal_maiden.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a young frost sorceress in a blue fur-trimmed cloak holding a staff, snowflakes and ice crystals around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a young frost sorceress in a blue fur-trimmed cloak holding a staff, snowflakes and ice crystals around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Dark Willow → `dark_willow.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a mischievous fairy with dark thorny wings holding a lantern, a little wisp companion beside her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a mischievous fairy with dark thorny wings holding a lantern, a little wisp companion beside her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Death Prophet → `death_prophet.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a pale banshee prophetess with ghostly spirits swirling around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a pale banshee prophetess with ghostly spirits swirling around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Disruptor → `disruptor.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a storm caller riding a giant flying beast, lightning in his hands, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a storm caller riding a giant flying beast, lightning in his hands, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Enchantress → `enchantress.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a deer-like forest dryad girl with antlers and a spear, flowers and small animals around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a deer-like forest dryad girl with antlers and a spear, flowers and small animals around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Grimstroke → `grimstroke.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a dark ink painter with long sleeves and a giant ink brush, ink spirits rising around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a dark ink painter with long sleeves and a giant ink brush, ink spirits rising around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Invoker → `invoker.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an elegant arcane sorcerer in a high-collared golden robe, three elemental orbs of fire, ice and lightning circling his head, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an elegant arcane sorcerer in a high-collared golden robe, three elemental orbs of fire, ice and lightning circling his head, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Jakiro → `jakiro.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a twin-headed dragon, one head breathing fire and the other breathing ice, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a twin-headed dragon, one head breathing fire and the other breathing ice, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Keeper of the Light → `keeper_of_the_light.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an old bearded wizard on a white horse holding a lantern of pure light, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an old bearded wizard on a white horse holding a lantern of pure light, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Leshrac → `leshrac.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a tormented chaos spirit with a horned beast body, arcane lightning and pillars of light around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a tormented chaos spirit with a horned beast body, arcane lightning and pillars of light around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Lich → `lich.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a skeletal frost sorcerer with a frozen staff and an orb of ice floating above his hand, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a skeletal frost sorcerer with a frozen staff and an orb of ice floating above his hand, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Lina → `lina.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a fiery sorceress with long red hair and flame-wreathed hands, fire swirling around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a fiery sorceress with long red hair and flame-wreathed hands, fire swirling around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Lion → `lion.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a goat-faced demonic warlock raising a clawed hand, hellish portals behind him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a goat-faced demonic warlock raising a clawed hand, hellish portals behind him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Muerta → `muerta.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a skeletal gunslinger woman in a wide-brimmed hat and long coat with two revolvers, marigold flowers around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a skeletal gunslinger woman in a wide-brimmed hat and long coat with two revolvers, marigold flowers around her, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Nature's Prophet → `furion.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a horned druid prophet with a staff, trees growing around him and walking tree spirits in the distance, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a horned druid prophet with a staff, trees growing around him and walking tree spirits in the distance, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Necrophos → `necrolyte.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a plague mage in black and green robes holding a scythe, pestilent mist swirling, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a plague mage in black and green robes holding a scythe, pestilent mist swirling, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Oracle → `oracle.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a mysterious seer in flowing robes with a large cracked mask, holding an orb of fate, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a mysterious seer in flowing robes with a large cracked mask, holding an orb of fate, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Outworld Destroyer → `obsidian_destroyer.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a winged black and gold obsidian being with a celestial staff, astral energy around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a winged black and gold obsidian being with a celestial staff, astral energy around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Puck → `puck.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a playful faerie dragon with butterfly wings and a mischievous grin, glittering sparks around it, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a playful faerie dragon with butterfly wings and a mischievous grin, glittering sparks around it, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Pugna → `pugna.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small skeletal sorcerer beside a tall glowing ward totem, green nether energy around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small skeletal sorcerer beside a tall glowing ward totem, green nether energy around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Queen of Pain → `queenofpain.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a demon queen with purple wings holding a dagger, a cruel smile, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a demon queen with purple wings holding a dagger, a cruel smile, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Ringmaster → `ringmaster.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a sinister circus ringmaster in a top hat and tailcoat with a cane, circus tents behind him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a sinister circus ringmaster in a top hat and tailcoat with a cane, circus tents behind him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Rubick → `rubick.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a masked grand magus in green robes with a long staff, a stolen spell glowing in his hand, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a masked grand magus in green robes with a long staff, a stolen spell glowing in his hand, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Shadow Demon → `shadow_demon.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a slim shadow demon with horns and glowing purple eyes, shadowy tendrils around it, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a slim shadow demon with horns and glowing purple eyes, shadowy tendrils around it, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Shadow Shaman → `shadow_shaman.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small hooded shaman with a staff, snake wards rising around him in sinister smoke, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small hooded shaman with a staff, snake wards rising around him in sinister smoke, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Silencer → `silencer.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a stern scholar warrior with a glaive and an open book, symbols of silence circling him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a stern scholar warrior with a glaive and an open book, symbols of silence circling him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Skywrath Mage → `skywrath_mage.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a winged bird-like sky mage with a staff, arcane bolts in the sky, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a winged bird-like sky mage with a staff, arcane bolts in the sky, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Storm Spirit → `storm_spirit.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a jolly storm elemental with a stormy beard floating in the air, lightning crackling around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a jolly storm elemental with a stormy beard floating in the air, lightning crackling around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Tinker → `tinker.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small gnome inventor in a mechanical suit with a laser, gears and rockets around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small gnome inventor in a mechanical suit with a laser, gears and rockets around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Warlock → `warlock.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a robed warlock with a long beard and a staff, a fiery golem rising behind him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a robed warlock with a long beard and a staff, a fiery golem rising behind him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Witch Doctor → `witch_doctor.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lanky voodoo witch doctor in a mask holding a skull staff and a glowing herb, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lanky voodoo witch doctor in a mask holding a skull staff and a glowing herb, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Zeus → `zuus.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an old lord of thunder with a white beard holding a lightning bolt, clouds swirling around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an old lord of thunder with a white beard holding a lightning bolt, clouds swirling around him, under a deep blue night sky with a crescent moon and stars. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

## Universal

### Bane → `bane.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a nightmare spirit made of dark smoke with four horns and glowing eyes, nightmares swirling around it, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a nightmare spirit made of dark smoke with four horns and glowing eyes, nightmares swirling around it, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Batrider → `batrider.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a wild rider on a giant bat throwing sticky fire, flames trailing behind, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a wild rider on a giant bat throwing sticky fire, flames trailing behind, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Beastmaster → `beastmaster.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a burly beastmaster with two axes, a boar and a hawk at his side, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a burly beastmaster with two axes, a boar and a hawk at his side, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Brewmaster → `brewmaster.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a panda brewmaster with a big drinking keg and a staff, three small elemental spirits beside him, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a panda brewmaster with a big drinking keg and a staff, three small elemental spirits beside him, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Clockwerk → `rattletrap.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small goblin in steam-powered battle armour with a grappling hook launcher, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a small goblin in steam-powered battle armour with a grappling hook launcher, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Dark Seer → `dark_seer.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a blue-skinned seer in elegant robes holding a swirling vortex of energy, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a blue-skinned seer in elegant robes holding a swirling vortex of energy, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Dazzle → `dazzle.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lithe troll shadow priest with a staff and a skull mask, colourful glowing patterns around him, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a lithe troll shadow priest with a staff and a skull mask, colourful glowing patterns around him, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Enigma → `enigma.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a cosmic void being whose body is made of stars and space, a black hole forming behind it, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a cosmic void being whose body is made of stars and space, a black hole forming behind it, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Io → `wisp.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a glowing orb of pure light with tethers of energy, floating in the air, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a glowing orb of pure light with tethers of energy, floating in the air, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Lone Druid → `lone_druid.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a druid in a bear-skin cloak standing beside his giant spirit bear companion, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a druid in a bear-skin cloak standing beside his giant spirit bear companion, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Magnus → `magnataur.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a mammoth-horned beastman with a long horn and a heavy spear, stomping the ground, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a mammoth-horned beastman with a long horn and a heavy spear, stomping the ground, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Marci → `marci.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a young martial artist girl with short hair and fists raised, ready to fight, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a young martial artist girl with short hair and fists raised, ready to fight, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Mirana → `mirana.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a moon princess archer riding a giant white cat, a starry arrow on her bow, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a moon princess archer riding a giant white cat, a starry arrow on her bow, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Nyx Assassin → `nyx_assassin.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an insect-like assassin with a spiked carapace and mandibles, rising from the ground, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an insect-like assassin with a spiked carapace and mandibles, rising from the ground, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Pangolier → `pangolier.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a dashing pangolin swordsman in a feathered hat with a rapier and a rolled-up armoured shell, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a dashing pangolin swordsman in a feathered hat with a rapier and a rolled-up armoured shell, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Sand King → `sand_king.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a giant scorpion-like king made of sand and armour, a desert storm around him, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a giant scorpion-like king made of sand and armour, a desert storm around him, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Snapfire → `snapfire.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a cheerful old woman riding a giant lizard and holding a homemade blunderbuss, cookies in a basket, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a cheerful old woman riding a giant lizard and holding a homemade blunderbuss, cookies in a basket, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Techies → `techies.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: three goblin bomb makers riding a rickety mechanical contraption with a big bomb, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: three goblin bomb makers riding a rickety mechanical contraption with a big bomb, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Venomancer → `venomancer.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a toxic plant beast with spines and venom glands, poison mist around it, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a toxic plant beast with spines and venom glands, poison mist around it, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Visage → `visage.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a winged stone gargoyle guardian with two smaller gargoyle familiars, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a winged stone gargoyle guardian with two smaller gargoyle familiars, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Void Spirit → `void_spirit.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a purple-robed spirit monk of the void with a staff, astral cracks in the air around him, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a purple-robed spirit monk of the void with a staff, astral cracks in the air around him, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Windranger → `windrunner.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a ranger woman with flowing red hair and a bow, wind swirling her cloak, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: a ranger woman with flowing red hair and a bow, wind swirling her cloak, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```

### Winter Wyvern → `winter_wyvern.png`

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an icy wyvern dragon with frosted wings and a scholarly air, books made of ice around her, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature.
```

Midjourney:

```
Vintage tarot card illustration in the style of early 1900s Art Nouveau tarot decks, bold black ink outlines, flat muted watercolour colours, aged parchment paper texture, symmetrical centred composition, one full-body figure standing in the middle third of the image: an icy wyvern dragon with frosted wings and a scholarly air, books made of ice around her, under a violet twilight sky with stars and distant ruins. No text, no letters, no numbers, no border, no frame, no card edges, no watermark, no signature. --ar 2:3 --style raw
```
