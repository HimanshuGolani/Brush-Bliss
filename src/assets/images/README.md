# Images

Drop your art photos here (jpg/png/webp). Then register each one in
`src/data/content.js` inside the `galleryItems` array, e.g.:

```js
import resinPlate from "../assets/images/resin-engagement-plate.jpg";

export const galleryItems = [
  {
    id: "resin-engagement-plate",
    type: "image",
    src: resinPlate,
    category: "resin",       // must match a services[].id
    caption: "Engagement plate, gold-leaf resin pour",
  },
];
```

Recommended: export images around 1200px on the longest side, and use
`.webp` where possible for faster loading. The gallery grid crops tiles
to a 4:5 portrait ratio, so portrait-leaning shots work best.
