# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Character breakdown data

Two panels sit above the table, both driven by Ideographic Description
Sequences: **Character Breakdown** opens one character up as a tree, and
**Sentence Transliteration** spells out a whole passage at once (as components,
pinyin, or English meanings). Two generated files back them:

- `static/data/ids.txt` — character → decomposition, from the
  [CJKVI/CHISE IDS database](https://github.com/cjkvi/cjkvi-ids)
- `static/data/readings.txt` — character → pinyin and gloss, from the Unicode
  [Unihan database](https://www.unicode.org/charts/unihan.html)

They are committed, so a normal build needs nothing extra. To refresh them from
upstream:

```bash
npm run data
```

That downloads the sources into `.cache/` (gitignored) and rewrites both files.
The browser fetches them on the first lookup, so the table itself stays a plain
static page.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
