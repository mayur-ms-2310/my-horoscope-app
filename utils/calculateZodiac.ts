import {parseDDMMYY} from './parseDate'

export function getZodiacSign(birthdate: string | Date): string {

   let dateObj: Date | null;

  if (typeof birthdate === 'string') {
    dateObj = parseDDMMYY(birthdate);
    if (!dateObj) {
      throw new Error('Invalid date format. Expected dd/mm/yy or dd/mm/yyyy');
    }
  } else {
    dateObj = birthdate;
  }

  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'Aquarius';
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return 'Pisces';
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'Aries';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'Taurus';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'Gemini';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'Cancer';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Leo';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Virgo';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'Libra';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'Scorpio';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'Sagittarius';
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return 'Capricorn';
  } else {
    throw new Error('Invalid date for zodiac calculation');
  }
}
