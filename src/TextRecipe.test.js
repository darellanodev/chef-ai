import { it, expect, describe } from "vitest";
import TextRecipe from "./TextRecipe.js";

describe("TextRecipe - validate method", () => {
  it("should return false when responseAI is an empty string", () => {
    const textRecipe = new TextRecipe(null, "spanish omelette", false);
    expect(textRecipe.validate("")).toBe(false);
  });
  it("should return true when responseAI is a valid JSON", () => {
    const textRecipe = new TextRecipe(null, "spanish omelette", false);
    const responseAI =
      '{ "ingredients": ["eggs", "potatoes"], "instructions": ["mix", "cook"] }';
    expect(textRecipe.validate(responseAI)).toBe(true);
  });
  it("should return false when responseAI is a valid JSON but it does not have the keys ingredients and instructions", () => {
    const textRecipe = new TextRecipe(null, "spanish omelette", false);

    const responseAI =
      '{ "items": ["eggs", "potatoes"], "steps": ["mix", "cook"] }';

    expect(textRecipe.validate(responseAI)).toBe(false);
  });
});
