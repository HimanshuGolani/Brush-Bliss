# Videos

Drop short clips here (mp4, ideally H.264, under ~10MB each) and
register them the same way as images, just with `type: "video"`:

```js
import resinPour from "../assets/videos/resin-pour.mp4";

export const galleryItems = [
  {
    id: "resin-pour",
    type: "video",
    src: resinPour,
    category: "resin",
    caption: "Resin pour, in progress",
  },
];
```

Videos autoplay muted and loop inside their gallery tile, so keep clips
short (5-15s) and visually interesting from the first frame.
