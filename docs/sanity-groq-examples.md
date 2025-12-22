# Sanity GROQ examples — return full image objects

Use this GROQ to fetch posts with the hero image as a full Sanity image object (so `urlForImage()` can build variants).

Example GROQ:

```
*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  description,
  publishDate,
  heroImage,
  altImage
}
```

Notes
- Ensure `heroImage` in Sanity is stored with the `image` type (not just a URL). That returns an image object like:
  {
    _type: 'image',
    asset: { _ref: 'image-<id>-jpg' },
    alt: '...'
  }

- In your server-side fetch code, pass the returned `heroImage` object directly to `urlForImage(heroImage)` and call `.width(...).height(...).url()` to build absolute URLs.

Example fetch (Node / server):

```js
import { sanityClient } from 'sanity:client';
import { urlForImage } from '../sanity/lib/url-for-image';

const query = `*[_type == "post"]{ _id, title, slug, description, publishDate, heroImage, altImage }`;
const posts = await sanityClient.fetch(query);

// Resolve hero image URLs for each post
const postsWithImages = posts.map(p => ({
  ...p,
  heroImageUrl: p.heroImage ? urlForImage(p.heroImage).width(1200).height(630).url() : undefined
}));
```

Where to use
- Pass `heroImageUrl` into your `BlogPost` layout (or directly into `<BaseHead image={...} />`).

Why this helps
- Social platforms prefer absolute image URLs and benefit from consistent dimensions. Building variants with `urlForImage()` lets you serve appropriately-sized images for OG previews.
