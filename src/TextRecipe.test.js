/** @vitest-environment jsdom */
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

describe("TextRecipe - clean method", () => {
  it("should return the string without the three quotes", () => {
    const responseAI =
      '```{ "items": ["eggs", "potatoes"], "steps": ["mix", "cook"] }```';

    expect(textRecipe.clean(responseAI)).toBe(
      '{ "items": ["eggs", "potatoes"], "steps": ["mix", "cook"] }'
    );
  });
});

describe("TextRecipe - print", () => {
  it("should render the ingredients and instructions as ordered lists", () => {
    const objRecipe = {
      ingredients: ["eggs", "potatoes"],
      instructions: ["mix", "cook"],
    };
    const ingredientsElement = document.createElement("ul");
    const instructionsElement = document.createElement("ol");

    textRecipe.print(objRecipe, ingredientsElement, instructionsElement);

    expect(ingredientsElement.children.length).toBe(2);
    expect(ingredientsElement.children[0].textContent).toBe("eggs");
    expect(instructionsElement.children.length).toBe(2);
    expect(instructionsElement.children[0].textContent).toBe("mix");
  });
});
