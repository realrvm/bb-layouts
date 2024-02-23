import { getWithSpaces } from "../addSpacesToInputNumber";

describe("getWithSpaces", () => {
  it("should return a string with spaces instead of commas and periods", () => {
    expect(getWithSpaces(1234567890)).toBe("1 234 567 890");
  });
});
