export function repeat(times: number, action: (round: number) => void) {
  for (let i = 1; i <= times; i++) {
    action(i);
  }
}

export function collectRounds(times: number): number[] {
  const rounds: number[] = [];
  repeat(times, (round) => rounds.push(round));
  return rounds;
}
