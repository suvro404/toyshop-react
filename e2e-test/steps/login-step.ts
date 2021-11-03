import { When, Then, Given, Before, AfterAll, After } from "@cucumber/cucumber";
import startBrowser from "../browser";
var { setDefaultTimeout } = require('cucumber');
import loginSelectors from '../selectors/loginSelectors';
import { expect } from "chai";

setDefaultTimeout(60 * 1000);
let browser:any, page:any;
Before(async function () {
    browser = await startBrowser();
    page = await browser.newPage();
})
Given('User visits e-commerce website-1', async function () {
    console.log("----------------------working");
    await page.goto("http://localhost:3000/auth")
})

When('User enters {string} and {string}-1', async function (email, password) {
    await page.waitForSelector(loginSelectors.loginButtonSelector);
    let loginButton = await page.$(loginSelectors.loginButtonSelector);
    await loginButton.click();
    await page.waitForNavigation();

    await page.type(loginSelectors.emailSelector, email);
    await page.type(loginSelectors.passwordSelector, password);

    await page.click(loginSelectors.submitButtonSelector);

});

Then('User can logged in successfully', async function () {
    await page.waitForSelector(loginSelectors.logoutButtonSelector);
    let logoutButton = await page.$(loginSelectors.logoutButtonSelector); 

    expect(logoutButton != null).equals(true);
    await logoutButton.click();

});


After(async () => {
    await browser.close();
});