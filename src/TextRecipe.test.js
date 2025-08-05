import { it, expect, describe } from "vitest";
import TextRecipe from "./TextRecipe.js";

describe("TextRecipe - validate methods", () => {
  it("should return false when responseAI is an empty string", () => {
    const textRecipe = new TextRecipe(null, "spanish omelette", false);
    expect(textRecipe.validate("")).toBe(false);
  });
});
