import puppeteer from 'puppeteer';
async function startBrowser() {
    let browser:any;
    try {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            devtools: false,
            args: [
                '--start-maximized',
                '--window-size=1920,1080'
            ]
        });
    } 
    catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

export default startBrowser;