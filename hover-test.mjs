import { chromium } from '@playwright/test';

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/influencer', { waitUntil: 'networkidle' });
await page.evaluate(() => {
  [...document.querySelectorAll('section')].find(s => s.textContent.includes('Path to Partnership'))?.scrollIntoView({ behavior: 'instant' });
});
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/ptp-before.png' });
const phone = await page.$('.ptp-phone');
if (phone) {
  await phone.hover();
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/tmp/ptp-hover.png' });
  console.log('done');
} else {
  console.log('not found');
}
await browser.close();
