export function convertTime(seconds: number): string {
  const m = seconds / 60;
  return Math.floor(m / 60) + " h " + Math.floor(m % 60) + " m";
}

export function sum(args: number[]) {
  return args.reduce(function (sum, elm) {
    return sum + elm;
  }, 0);
}
