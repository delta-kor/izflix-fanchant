export function getDuration(input: number): string {
  const number = Math.round(input);
  const minutes = (number / 60) | 0;
  const seconds = number - minutes * 60;
  const result = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  return result;
}
