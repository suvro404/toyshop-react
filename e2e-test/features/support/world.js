import { Before, After } from "@cucumber/cucumber";
import puppeteer from "puppeteer";

Before(async function() {
  const world = this;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  world._browser = browser;
  world.page = page;
});

Before({ tags: "@mobile" }, async function() {
  const world = this;
  world.page.setViewport({ width: 320, height: 466 });
});

Before({ tags: "@tablet" }, async function() {
  const world = this;
  world.page.setViewport({ width: 768, height: 622 });
});

After(function() {
  return this._browser.close();
});
