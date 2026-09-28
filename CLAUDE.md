## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Post ideas

`input/` (gitignored) holds the author's career history, projects, skills, and notes.
When asked for post ideas or drafts, read it first and ground suggestions in it. Never copy
anything from `input/` that looks confidential or personal into `src/content/`.

## Writing posts

- Start from `docs/post-template.md`; copy it to `src/content/blog/<english-slug>.md`.
- Frontmatter schema lives in `src/content.config.ts`: `category` must be a key of `CATEGORIES` in `src/consts.ts`; `tags`, `series`/`seriesOrder`, and `draft` are optional.
- `draft: true` posts appear only in `npm run dev`, never in the production build.
- Internal links must go through `withBase()` from `src/consts.ts` because the site is served under `/my-tech-blog`.
