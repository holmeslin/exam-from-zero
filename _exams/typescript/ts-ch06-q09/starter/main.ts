import { readFileSync } from 'node:fs';

const words = readFileSync(0, 'utf8').split(/\s+/).filter((w) => w !== '');
// TODO：用 Map 統計每個單字出現幾次，依第一次出現的順序印出「單字: 次數」
