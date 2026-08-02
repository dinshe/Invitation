# 📸 Gallery Images Folder

Place your real wedding photos in this folder.

Recommended image formats: `.jpg`, `.jpeg`, `.webp`, `.png`
Recommended size: `800x1000px` or `1200x800px` optimized for web.

To link your real photos in the gallery:
1. Place files here (e.g. `photo1.jpg`, `photo2.jpg`)
2. Update the `src` and `thumb` properties in `src/sections/Gallery.jsx`:
```js
{
  id: 1,
  src:  './images/gallery/photo1.jpg',
  thumb:'./images/gallery/photo1.jpg',
  alt:  'Nethmi & Dinuth at the beach',
  span: 'tall',
}
```
