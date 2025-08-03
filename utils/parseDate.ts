export const parseDDMMYY = (dateStr:  string): Date | null =>{
  const [day, month, year] = dateStr.split('/').map(Number);
  if (!day || !month || !year) return null;

  let fullYear = year;
  if (year < 100) {
    fullYear += 2000;
  }

  const date = new Date(fullYear, month - 1, day);

  if (
    date.getFullYear() !== fullYear ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}
