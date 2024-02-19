export function convertTime(seconds: number): string {
  const m = seconds / 60;
  return (
    Math.floor(m / 60) +
    " h " +
    Math.floor(m % 60)
      .toString()
      .padStart(2, "0") +
    " m"
  );
}

export function sum(args: number[]) {
  return args.reduce(function (sum, elm) {
    return sum + elm;
  }, 0);
}

export function getWorkSeoconds(start_time: string, end_time: string): number {
  const start = new Date(start_time);
  const end = new Date(end_time);
  return end.getTime() / 1000 - start.getTime() / 1000;
}

export function convertDateString(date_str: string): string {
  const date = new Date(date_str);
  return date.toLocaleString();
}
