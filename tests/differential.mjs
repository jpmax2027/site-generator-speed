// Differential test: compares this entry's solve.js against the kit's
// reference build (makefun-site 1.0.0) on the kit's practice set.
//
// Usage: node tests/differential.mjs <path-to-unpacked-kit>
//
// Exits 0 when every practice case is byte-identical to the reference,
// 1 otherwise (and prints the first differing output key per case).

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { run } from '../solve.js';

const kit = process.argv[2];
if (!kit) {
  console.error('usage: node tests/differential.mjs <path-to-unpacked-kit>');
  process.exit(2);
}
const ref = await import(join(kit, 'baselines/makefun-site/vendor/makefun-site/index.js'));

function canon(v) {
  if (Array.isArray(v)) return `[${v.map(canon).join(',')}]`;
  if (v !== null && typeof v === 'object') {
    const keys = Object.keys(v).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${canon(v[k])}`).join(',')}}`;
  }
  return JSON.stringify(v) ?? 'null';
}

const cases = JSON.parse(readFileSync(join(kit, 'practice/input/cases.json'), 'utf8'));
let failed = 0;
for (const c of cases) {
  const a = run(c.input);
  const b = ref.build(c.input);
  if (canon(a) === canon(b)) {
    console.log(`${c.id}: identical (${Object.keys(a).length} output files)`);
    continue;
  }
  failed++;
  console.log(`${c.id}: DIFFERENT`);
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (canon(a[k]) !== canon(b[k])) {
      console.log(`  first differing key: ${k}`);
      break;
    }
  }
}
if (failed > 0) {
  console.log(`${failed} case(s) differ from the reference`);
  process.exit(1);
}
console.log(`all ${cases.length} practice cases identical to makefun-site 1.0.0`);
