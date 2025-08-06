import { it, expect, describe } from "vitest";
import TextRecipe from "./TextRecipe.js";

const textRecipe = new TextRecipe(null, "spanish omelette", false);
describe("TextRecipe - validate method", () => {
  it("should return false when responseAI is an empty string", () => {
    expect(textRecipe.validate("")).toBe(false);
  });
  it("should return true when responseAI is a valid JSON", () => {
    const responseAI =
      '{ "ingredients": ["eggs", "potatoes"], "instructions": ["mix", "cook"] }';
    expect(textRecipe.validate(responseAI)).toBe(true);
  });
  it("should return false when responseAI is a valid JSON but it does not have the keys ingredients and instructions", () => {
    const responseAI =
      '{ "items": ["eggs", "potatoes"], "steps": ["mix", "cook"] }';

    expect(textRecipe.validate(responseAI)).toBe(false);
  });
  it("should return false when ingredients and instructions are not arrays of strings", () => {
    const responseAI =
      '{ "ingredients": "eggs", "instructions": ["mix", "cook"] }';

    expect(textRecipe.validate(responseAI)).toBe(false);
  });
});
