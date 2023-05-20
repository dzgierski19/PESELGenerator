const AGE_OF_THE_OLDEST_PERSON: number = 123;
const CURRENT_NEW_DATE: Date = new Date();

const typeDateAndGender = (date: Date, gender: "male" | "female") => {
  isDateValid(date);
  const firstDigit = Number(String(date.getFullYear()).slice(2, 3));
  const secondDigit = Number(String(date.getFullYear()).slice(3, 4));
  const thirdDigit = Number(String(getMonthFromDate(date)).slice(0, 1));
  const forthDigit = Number(String(getMonthFromDate(date)).slice(1, 2));
  const fifthDigit = Number(String(getDayFromDate(date)).slice(0, 1));
  const sixthDigit = Number(String(getDayFromDate(date)).slice(1, 2));
  const seventhDigit = generateRandomNumberFrom0to9();
  const eighthDigit = generateRandomNumberFrom0to9();
  const ninethDigit = generateRandomNumberFrom0to9();
  const tenthDigit = isMaleOrFemale(gender);
  const sumOfPESELDigitsExcludingLast =
    firstDigit +
    secondDigit * 3 +
    thirdDigit * 7 +
    forthDigit * 9 +
    fifthDigit +
    sixthDigit * 3 +
    seventhDigit * 7 +
    eighthDigit * 9 +
    ninethDigit +
    tenthDigit * 3;
  const lastDigitCeil = Math.ceil(sumOfPESELDigitsExcludingLast / 10);
  const lastDigit = lastDigitCeil * 10 - sumOfPESELDigitsExcludingLast;
  console.log(lastDigit);
  console.log(
    firstDigit,
    secondDigit,
    thirdDigit,
    forthDigit,
    fifthDigit,
    sixthDigit,
    seventhDigit,
    eighthDigit,
    ninethDigit,
    tenthDigit,
    lastDigit
  );
  return sumOfPESELDigitsExcludingLast + lastDigit;
};

const isDateValid = (input: Date) => {
  if (
    CURRENT_NEW_DATE.getFullYear() < input.getFullYear() ||
    (CURRENT_NEW_DATE.getFullYear() === input.getFullYear() &&
      CURRENT_NEW_DATE.getMonth() < input.getMonth()) ||
    (CURRENT_NEW_DATE.getFullYear() === input.getFullYear() &&
      CURRENT_NEW_DATE.getMonth() === input.getMonth() &&
      CURRENT_NEW_DATE.getDate() < input.getDate())
  ) {
    throw new Error("you are not born yet");
  } else if (
    (CURRENT_NEW_DATE.getFullYear() - AGE_OF_THE_OLDEST_PERSON ===
      input.getFullYear() &&
      CURRENT_NEW_DATE.getMonth() === input.getMonth() &&
      CURRENT_NEW_DATE.getDate() > input.getDate()) ||
    (CURRENT_NEW_DATE.getFullYear() - AGE_OF_THE_OLDEST_PERSON ===
      input.getFullYear() &&
      CURRENT_NEW_DATE.getMonth() > input.getMonth()) ||
    CURRENT_NEW_DATE.getFullYear() - AGE_OF_THE_OLDEST_PERSON >
      input.getFullYear()
  ) {
    throw new Error("You are the oldest person in the world");
  }
};

const getDayFromDate = (date: Date) => {
  if (date.getDate() < 10 && date.getDate() >= 0) {
    return `0${date.getDate()}`;
  }
  return date.getDate();
};

console.log(getDayFromDate(new Date(2022, 11, 1)));

const getMonthFromDate = (date: Date) => {
  if (date.getFullYear() >= 2000) {
    return date.getMonth() + 20;
  }
  return date.getMonth;
};

const generateRandomNumberFrom0to9 = () => {
  return Math.floor(Math.random() * 10);
};

const isMaleOrFemale = (gender: "male" | "female") => {
  const maleArray = [1, 3, 5, 7, 9];
  const femaleArray = [0, 2, 4, 6, 8];
  if (gender === "male") {
    return maleArray[Math.floor(Math.random() * maleArray.length)];
  }
  return femaleArray[Math.floor(Math.random() * femaleArray.length)];
};

console.log(typeDateAndGender(new Date(2022, 11, 1), "male"));
