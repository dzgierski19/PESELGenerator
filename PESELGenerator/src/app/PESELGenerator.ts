import { MALE_NUMBERS, FEMALE_NUMBERS } from "./GenderConsts";

export const typeDateAndGender = (
  date: Date | string,
  gender: "male" | "female",
  getRandomNumberAsString: () => string,
  getGenderNumber: (gender: string) => number
) => {
  const checkedInputType = isInputDateOrString(date);
  const firstAndSecondDigit = String(checkedInputType.getFullYear()).slice(
    2,
    4
  );
  const thirdAndForthDigit = getMonthFromDate(checkedInputType).slice(0, 2);
  const fifthAndSixthDigit = getDayFromDate(checkedInputType).slice(0, 2);
  const digitsFromSevenToNine =
    getRandomNumberAsString() +
    getRandomNumberAsString() +
    getRandomNumberAsString();
  const tenthDigit = getGenderNumber(gender);
  const PESELWithoutLastDigit =
    firstAndSecondDigit +
    thirdAndForthDigit +
    fifthAndSixthDigit +
    digitsFromSevenToNine +
    tenthDigit;
  const summedWagedPESEL = sumWagedPESEL(PESELWithoutLastDigit);
  const lastDigit = calculateLastDigit(summedWagedPESEL);
  const PESEL = PESELWithoutLastDigit + lastDigit;
  return PESEL;
};

const sumWagedPESEL = (input: string) => {
  return input
    .split("")
    .map((element) => Number(element))
    .reduce((acc, curr, index) => {
      if (index === 0 || index === 4 || index === 8) {
        return acc + curr;
      }
      if (index === 1 || index === 5 || index === 9) {
        return acc + curr * 3;
      }
      if (index === 2 || index === 6) {
        return acc + curr * 7;
      }
      if (index === 3 || index === 7) {
        return acc + curr * 9;
      }
      return acc;
    }, 0);
};

export const calculateLastDigit = (input: number) => {
  const moduloOf10 = input % 10;
  if (moduloOf10) {
    return String(10 - moduloOf10);
  }
  return String(0);
};

const isInputDateOrString = (input: Date | string) => {
  if (typeof input === "string") {
    return isDateString(input);
  }
  if (input instanceof Date) {
    return isDateValid(input);
  }
  throw new Error("You must type Date or string as Input");
};

const isDateString = (input: string) => {
  if (
    /^\d{4}[ ]\d{2}[ ]\d{2}$/.test(input) ||
    /^\d{4}[.]\d{2}[.]\d{2}$/.test(input) ||
    /^\d{4}[/]\d{2}[/]\d{2}$/.test(input) ||
    /^\d{4}[-]\d{2}[-]\d{2}$/.test(input)
  ) {
    return isDateValid(new Date(input));
  }
  throw new Error("You must provide string with in full date format");
};

const isDateValid = (input: Date) => {
  if (input.getFullYear() >= 2300) {
    throw new Error("Please type date with year under 2300");
  }
  if (input.getFullYear() < 1800) {
    throw new Error("Please type date with year over 1799");
  }
  return input;
};

const getDayFromDate = (date: Date) => {
  if (date.getDate() < 10 && date.getDate() >= 0) {
    return `0${date.getDate()}`;
  }
  return String(date.getDate());
};

const getMonthFromDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (year >= 2200 && year < 2300) {
    return String(month + 60);
  }
  if (year >= 2100 && year < 2200) {
    return String(month + 40);
  }
  if (year >= 2000 && year < 2100) {
    return String(month + 20);
  }
  if (year >= 1800 && year < 1900) {
    return String(month + 80);
  }
  if (month <= 9 && month >= 1) {
    return `0${month}`;
  }
  return String(month);
};

const get3RandomNumbers = () => {
  return (
    String(getRandomNumberAsString()) +
    String(getRandomNumberAsString()) +
    String(getRandomNumberAsString())
  );
};

const getRandomNumberAsString = () => {
  return String(Math.floor(Math.random() * 10));
};

export const getGenderNumber = (gender: "male" | "female") => {
  if (gender === "male") {
    return MALE_NUMBERS[Math.floor(Math.random() * MALE_NUMBERS.length)];
  }
  return FEMALE_NUMBERS[Math.floor(Math.random() * FEMALE_NUMBERS.length)];
};

console.log(
  typeDateAndGender(
    new Date(),
    "male",
    getRandomNumberAsString,
    getGenderNumber
  )
);
