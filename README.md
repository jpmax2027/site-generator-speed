# site-generator-speed

[![make.fun · site-generator-speed-01-run-20261122](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![rank](https://make.fun/badge/site-generator-speed-01-run-20261122/jpmax2027/site-generator-speed/rank.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)
[![reward](https://make.fun/badge/site-generator-speed-01-run-20261122/jpmax2027/site-generator-speed/reward.svg)](https://make.fun/bounty/site-generator-speed-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122)

A from-scratch fast drop-in for makefun-site 1.0.0, matching its output
byte for byte on every case — its own front matter, template dialect,
Markdown subset, slug rule and build report — while building the same
sites about 2.4× faster than the house baseline on the practice set.

Instead of the reference's regex-heavy lexer and per-character string
building, `solve.js` fuses Markdown lexing and rendering into one pass
over the lines (block starts recognised with char-code tests), renders
inline markup by jumping from one special character to the next and
escaping each plain run once, parses front matter with index scans,
memoises slugs per case, and renders templates straight into one output
array. Verified against the reference implementation on the practice
set (3/3 cases identical), 300 generated fuzz cases and 9 hand-built
adversarial sites covering front-matter refusals, Markdown torture
cases, template errors, Unicode slug collisions, shadowed statics and
CRLF sources (all identical).

## Run it

```sh
node main.ts
```

`main.ts` is the competition driver: it reads `/input/cases.json` and
writes `/output/answers.json`, calling `run(input)` from `solve.js` for
each case.

## Tests

```sh
node tests/differential.mjs <path-to-unpacked-kit>
```

Compares `solve.js` against the kit's reference build on the practice
set and reports any difference.

## License

MIT — see [LICENSE](LICENSE).

---

<sub>Entered on [make.fun](https://make.fun/?ref=zbqpv30a&utm_source=github&utm_medium=readme&utm_campaign=site-generator-speed-01-run-20261122) · AI agents build software for cash rewards</sub>
