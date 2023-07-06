import { tsEnumDeclaration } from "@babel/types";
import { typeDateAndGender } from "../app/PESELGenerator";

describe("typeDateAndGender", () => {
  const first6DigitsPESEL = (result) => {
    return result.slice(0, 6);
  };
  const first10DigitsPESEL = (result) => {
    return result.slice(0, 10);
  };
  const tenthPESELDigit = (result) => {
    return Number(result[9]);
  };
  const maleArray = [1, 3, 5, 7, 9];
  const femaleArray = [0, 2, 4, 6, 8];
  const lastDigitofPESEL = (result) => {
    const splitPesel = result.split("");
    const stringToNumber = splitPesel.map((element) => Number(element));
    const summedPESEL = stringToNumber.reduce((acc, curr, index) => {
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
    const lastDigit = (summedPESEL) => {
      if (summedPESEL % 10 === 0) {
        return String(0);
      }
      return String(10 - (summedPESEL % 10));
    };
    return lastDigit(summedPESEL);
  };

  it("should return proper PESEL if someone was man and was born after 1799 and before 1900", () => {
    const result = typeDateAndGender(
      new Date("1882-11-02"),
      "male",
      () => 6,
      () => 5
    );
    expect(first6DigitsPESEL(result)).toBe("829102");
    expect(result).toHaveLength(11);
    expect(maleArray).toContain(tenthPESELDigit(result));
    expect(result[10]).toBe(lastDigitofPESEL(result));
  });
  it("should return proper PESEL if someone was woman and was born after 1799 and before 1900", () => {
    const result = typeDateAndGender(
      new Date("1882-11-02"),
      "female",
      () => 2,
      () => 6
    );
    expect(first6DigitsPESEL(result)).toBe("829102");
    expect(result).toHaveLength(11);
    expect(femaleArray).toContain(tenthPESELDigit(result));
    expect(result[10]).toBe(lastDigitofPESEL(result));
  });
  it("should return proper PESEL if someone was woman and was born after 1899 and before 2000", () => {
    const result = typeDateAndGender(
      new Date("1971-12-10"),
      "female",
      () => 2,
      () => 6
    );
    expect(first10DigitsPESEL(result)).toBe("7112102226");
    expect(result).toHaveLength(11);
    expect(femaleArray).toContain(tenthPESELDigit(result));
    expect(result[10]).toBe(lastDigitofPESEL(result));
  });
  it("should return proper PESEL if someone is/was/will be woman and was/will be born after 1999 and before 2100", () => {
    const result = typeDateAndGender(
      new Date("2002-12-10"),
      "female",
      () => 2,
      () => 6
    );
    expect(first10DigitsPESEL(result)).toBe("0232102226");
    expect(result).toHaveLength(11);
    expect(femaleArray).toContain(tenthPESELDigit(result));
    expect(result[10]).toBe(lastDigitofPESEL(result));
  });
  it("should return proper PESEL if someone will be woman and will be born after 2099 and before 2200", () => {
    const result = typeDateAndGender(
      new Date("2132-06-05"),
      "female",
      () => 2,
      () => 6
    );
    expect(first6DigitsPESEL(result)).toBe("324605");
    expect(result).toHaveLength(11);
    expect(femaleArray).toContain(tenthPESELDigit(result));
    expect(result[10]).toBe(lastDigitofPESEL(result));
  });
  it("should return proper PESEL if someone will be woman and will be born after 2199 and before 2300", () => {
    const result = typeDateAndGender(
      "2286-10-20",
      "female",
      () => 3,
      () => 6
    );
    expect(first10DigitsPESEL(result)).toBe("8670203336");
    expect(result).toHaveLength(11);
    expect(femaleArray).toContain(tenthPESELDigit(result));
    expect(result[10]).toBe(lastDigitofPESEL(result));
  });
  describe("it throws error when ", () => {
    it("- year from date is over 2299", () => {
      function expectError() {
        typeDateAndGender(
          new Date(2301, 5, 1),
          "male",
          () => 5,
          () => 6
        );
      }
      expect(expectError).toThrow();
    });
    it("- year from date is under 1800", () => {
      function expectError() {
        typeDateAndGender(
          new Date(1780, 5, 1),
          "male",
          () => 7,
          () => 2
        );
      }
      expect(expectError).toThrow();
    });
    it("- full date as string is not provided", () => {
      function expectError() {
        typeDateAndGender(
          "1999",
          "male",
          () => 7,
          () => 2
        );
      }
      expect(expectError).toThrow();
    });
  });
});
