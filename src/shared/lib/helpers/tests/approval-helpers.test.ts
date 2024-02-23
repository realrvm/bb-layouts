import {
  GetMap,
  calcPercents,
  getMap,
  getProbabilityOfApproval,
  getProbabilityOfApprovalColor,
} from "../approval-helpers";

describe("getProbabilityOfApproval", () => {
  it('should return "Очень высокая" for "very high" and "очень высокая"', () => {
    expect(getProbabilityOfApproval("very high")).toBe("Очень высокая");
    expect(getProbabilityOfApproval("очень высокая")).toBe("Очень высокая");
  });

  it('should return "Высокая" for "high" and "высокая"', () => {
    expect(getProbabilityOfApproval("high")).toBe("Высокая");
    expect(getProbabilityOfApproval("высокая")).toBe("Высокая");
  });

  it('should return "Средняя" for "average" and "средняя"', () => {
    expect(getProbabilityOfApproval("average")).toBe("Средняя");
    expect(getProbabilityOfApproval("средняя")).toBe("Средняя");
  });

  it('should return "Низкая" for any other value', () => {
    expect(getProbabilityOfApproval("low")).toBe("Низкая");
    expect(getProbabilityOfApproval("невысокая")).toBe("Низкая");
  });
});

describe("getProbabilityOfApprovalColor", () => {
  it('should return "approval-high" for "very high" and "очень высокая"', () => {
    const styles = {
      "approval-high": "high-color",
    };
    expect(getProbabilityOfApprovalColor("very high", styles)).toBe(
      "high-color",
    );
    expect(getProbabilityOfApprovalColor("очень высокая", styles)).toBe(
      "high-color",
    );
  });

  it('should return "approval-high" for "high" and "высокая"', () => {
    const styles = {
      "approval-high": "high-color",
    };
    expect(getProbabilityOfApprovalColor("high", styles)).toBe("high-color");
    expect(getProbabilityOfApprovalColor("высокая", styles)).toBe("high-color");
  });

  it('should return "approval-average" for "average" and "средняя"', () => {
    const styles = {
      "approval-average": "average-color",
    };
    expect(getProbabilityOfApprovalColor("average", styles)).toBe(
      "average-color",
    );
    expect(getProbabilityOfApprovalColor("средняя", styles)).toBe(
      "average-color",
    );
  });

  it('should return "approval-low" for any other value', () => {
    const styles = {
      "approval-low": "low-color",
    };
    expect(getProbabilityOfApprovalColor("low", styles)).toBe("low-color");
    expect(getProbabilityOfApprovalColor("other", styles)).toBe("low-color");
  });
});

describe("calcPercents", () => {
  it("should return 0 when sum is not defined", () => {
    expect(calcPercents("", "100")).toBe(0);
  });

  it("should return 100 when price is equal to sum", () => {
    expect(calcPercents("100", "100")).toBe(100);
  });

  it("should return correct percentage when price is less than sum", () => {
    expect(calcPercents("100", "50")).toBe(50);
  });

  it("should return correct percentage when price is greater than sum", () => {
    expect(calcPercents("100", "200")).toBe(200);
  });
});

describe("getMap", () => {
  it("should return an object with help_text as values", () => {
    const data: GetMap[] = [
      { help_text: "low", value: 1 },
      { help_text: "medium", value: 2 },
      { help_text: "high", value: 3 },
    ];
    const expected = { 1: "low", 2: "medium", 3: "high" };
    const actual = getMap(data);
    expect(actual).toEqual(expected);
  });
});
