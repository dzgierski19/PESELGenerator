export const typeDateAndGender = (
  date: Date | string,
  gender: "male" | "female",
  getRandomNumber: () => number,
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
    String(getRandomNumber()) +
    String(getRandomNumber()) +
    String(getRandomNumber());
  const tenthDigit = getGenderNumber(gender);
  const PESELWithoutLastDigit =
    firstAndSecondDigit +
    thirdAndForthDigit +
    fifthAndSixthDigit +
    digitsFromSevenToNine +
    tenthDigit;
  const PESELToNumber = PESELWithoutLastDigit.split("").map((element) =>
    Number(element)
  );
  const summedPESEL = PESELToNumber.reduce((acc, curr, index) => {
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
  // const sumOfPESELDigitsExcludingLast =
  //   PESELToNumber[0] +
  //   PESELToNumber[1] * 3 +
  //   PESELToNumber[2] * 7 +
  //   PESELToNumber[3] * 9 +
  //   PESELToNumber[4] +
  //   PESELToNumber[5] * 3 +
  //   PESELToNumber[6] * 7 +
  //   PESELToNumber[7] * 9 +
  //   PESELToNumber[8] +
  //   PESELToNumber[9] * 3;

  // console.log(sumOfPESELDigitsExcludingLast + "manual");
  const lastDigit = () => {
    if (summedPESEL % 10 === 0) {
      return String(0);
    }
    return String(10 - (summedPESEL % 10));
  };
  const PESEL = PESELWithoutLastDigit + lastDigit();
  return PESEL;
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
    String(getRandomNumber()) +
    String(getRandomNumber()) +
    String(getRandomNumber())
  );
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * 10);
};

const getGenderNumber = (gender: "male" | "female") => {
  const maleArray = [1, 3, 5, 7, 9];
  const femaleArray = [0, 2, 4, 6, 8];
  if (gender === "male") {
    return maleArray[Math.floor(Math.random() * maleArray.length)];
  }
  return femaleArray[Math.floor(Math.random() * femaleArray.length)];
};

console.log(
  typeDateAndGender(new Date(), "male", getRandomNumber, getGenderNumber)
);
