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

- `static/data/ids.txt` — character → decomposition
- `static/data/readings.txt` — character → pinyin and gloss
- `static/data/radical-chars.txt` — Kangxi radical → the characters built from
  it, used by the expandable examples under each table row

They are committed, so a normal build needs nothing extra. To refresh them from
upstream:

```bash
npm run data
```

That downloads the sources into `.cache/` (gitignored) and rewrites all three
files. The browser fetches them on the first lookup, so the table itself stays a
plain static page.

Any view of the page can be linked to: `?c=謝` opens that character in the
breakdown panel, `?q=water` filters the table.

## Data sources and licensing

- **Decompositions** come from [cjkvi-ids](https://github.com/cjkvi/cjkvi-ids).
  Its README states that `ids.txt` is derived from the
  [CHISE project](http://www.chise.org/) and that "License follows their terms",
  with all other data in that repository distributed under **GPLv2**.
- **Readings, glosses, stroke counts, and the common-use ordering** come from the
  Unicode [Unihan database](https://www.unicode.org/charts/unihan.html)
  (© Unicode, Inc.), used under the
  [Unicode Terms of Use](https://www.unicode.org/copyright.html), which require
  this notice to accompany redistribution. Example characters are ordered by
  `kHanyuPinlu` corpus frequency, then `kIICore`, then `kTotalStrokes`.
- The radical **sense lists** in `src/lib/radicals.ts` started from Unihan
  `kDefinition` and were curated by hand; the pinyin, radical, and variant
  columns are the original hand-written table.

**Open question worth settling before wider distribution:** this project is
AGPL-3.0 while the CHISE-derived `ids.txt` is described as GPLv2. If those terms
are "GPLv2 only" rather than "v2 or later", the two are not compatible; if
"or later", they are. The data ships as a standalone asset rather than linked
code, which weakens the concern but does not answer it. Confirming the exact
CHISE terms is the remaining step.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
