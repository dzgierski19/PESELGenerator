import { tsEnumDeclaration } from "@babel/types";
import {
  calculateLastDigit,
  getGenderNumber,
  typeDateAndGender,
} from "../app/PESELGenerator";
import { FEMALE_NUMBERS, MALE_NUMBERS } from "../app/GenderConsts";

describe("PESELGenerator test suite", () => {
  const getRandomNumberAsStringMock = () => "6";
  const getMaleNumberMock = () => 5;
  const getFemaleNumberMock = () => 8;
  it("should return proper last PESEL digit as string from provided sum", () => {
    const lastDigit = calculateLastDigit(46);
    expect(lastDigit).toBe("4");
  });
  it("should return random number for male person", () => {
    const genderNumber = getGenderNumber("male");
    expect(MALE_NUMBERS).toContain(genderNumber);
  });
  it("should return random number for female person", () => {
    const genderNumber = getGenderNumber("female");
    expect(FEMALE_NUMBERS).toContain(genderNumber);
  });
  it("should return proper PESEL if someone was born after 1799 and before 1900", () => {
    const pesel = typeDateAndGender(
      new Date("1882-11-02"),
      "male",
      getRandomNumberAsStringMock,
      getMaleNumberMock
    );
    expect(pesel).toBe("82910266651");
  });
  it("should return proper PESEL if someone was woman and was born after 1799 and before 1900", () => {
    const pesel = typeDateAndGender(
      new Date("1882-11-02"),
      "female",
      getRandomNumberAsStringMock,
      getFemaleNumberMock
    );
    expect(pesel).toBe("82910266682");
  });
  it("should return proper PESEL if someone was woman and was born after 1899 and before 2000", () => {
    const pesel = typeDateAndGender(
      new Date("1971-12-10"),
      "female",
      getRandomNumberAsStringMock,
      getFemaleNumberMock
    );
    expect(pesel).toBe("71121066688");
  });
  it("should return proper PESEL if someone is/was/will be woman and was/will be born after 1999 and before 2100", () => {
    const pesel = typeDateAndGender(
      new Date("2002-12-10"),
      "female",
      getRandomNumberAsStringMock,
      getFemaleNumberMock
    );
    expect(pesel).toBe("02321066688");
  });
  it("should return proper PESEL if someone will be woman and will be born after 2099 and before 2200", () => {
    const pesel = typeDateAndGender(
      new Date("2132-06-05"),
      "female",
      getRandomNumberAsStringMock,
      getFemaleNumberMock
    );
    expect(pesel).toBe("32460566688");
  });
  it("should return proper PESEL if someone will be woman and will be born after 2199 and before 2300", () => {
    const pesel = typeDateAndGender(
      "2286-10-20",
      "female",
      getRandomNumberAsStringMock,
      getFemaleNumberMock
    );
    expect(pesel).toBe("86702066687");
  });
  describe("it throws error when ", () => {
    it("- year from date is over 2299", () => {
      function expectError() {
        typeDateAndGender(
          new Date(2301, 5, 1),
          "male",
          getRandomNumberAsStringMock,
          getMaleNumberMock
        );
      }
      expect(expectError).toThrow();
    });
    it("- year from date is under 1800", () => {
      function expectError() {
        typeDateAndGender(
          new Date(1780, 5, 1),
          "male",
          getRandomNumberAsStringMock,
          getMaleNumberMock
        );
      }
      expect(expectError).toThrow();
    });
    it("- full date as string is not provided", () => {
      function expectError() {
        typeDateAndGender(
          "1999",
          "male",
          getRandomNumberAsStringMock,
          getMaleNumberMock
        );
      }
      expect(expectError).toThrow();
    });
  });
});
