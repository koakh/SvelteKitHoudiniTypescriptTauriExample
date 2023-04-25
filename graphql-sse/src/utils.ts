export const formatDate = (date: Date): string => {
  const yy: string = date.getUTCFullYear().toString();
  const mo: string = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const dd: string = date.getUTCDate().toString().padStart(2, '0');
  const hh: string = date.getUTCHours().toString().padStart(2, '0');
  const mm: string = date.getUTCMinutes().toString().padStart(2, '0');
  const ss: string = date.getUTCSeconds().toString().padStart(2, '0');
  return `${yy}-${mo}-${dd} ${hh}:${mm}:${ss}`;
};
