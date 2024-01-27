import puppeteer from 'puppeteer';
import server from './e2e.server';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  const baseUrl = 'http://localhost:8888';
  
  let browser = null;
  let page = null;

  beforeAll(async () => {
    
    await server.start();

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      devtools: false, 
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    await server.stop();
  });

  test('Should valid card number', async () => {
    await page.goto(baseUrl);

    const form = await page.$('.form-inline');
    const input = await form.$('.form-input');
    const submit = await form.$('.form-btn');
    
    await input.type('4111111111111111');

    await submit.click();

    await page.waitForSelector('.form-inline .form-group .form-input.valid');

  });

  test('Should invalid card number', async () => {
    await page.goto(baseUrl);

    const form = await page.$('.form-inline');
    const input = await form.$('.form-input');
    const submit = await form.$('.form-btn');
    
    await input.type('0123456789101112');

    await submit.click();

    await page.waitForSelector('.form-inline .form-group .form-input.novalid');

  });
});