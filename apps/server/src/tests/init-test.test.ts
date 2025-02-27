import { describe, expect, it } from "vitest";

describe("Sample Test Suite", () => {
  it("should pass this simple test", () => {
    expect(true).toBe(true);
  });

  it("should add two numbers correctly", () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const sum = (a: number, b: number) => a + b;
    expect(sum(1, 2)).toBe(3);
  });

  it("should return the correct length of a string", () => {
    const str = "hello";
    expect(str.length).toBe(5);
  });
});
