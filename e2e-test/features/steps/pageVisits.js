import { Then, Given } from "@cucumber/cucumber";

Then("I should be on the {string} page", async function(string) {
  const el = await this.page.waitForSelector(`[data-test="${string}"]`);
  return !!el;
});

Given("I am on the {string} page", function(string) {
  switch (string) {
    case "auth":
      return this.page.goto("http://localhost:3000/auth");

    default:
      throw new Error(`${string} is not a supported page name`);
  }
});