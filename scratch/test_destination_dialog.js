const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const viewports = [
    { name: '375px', width: 375, height: 750 },
    { name: '1280px', width: 1280, height: 900 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    try {
      await page.goto('http://localhost:3000/en#destinations', { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(1000);

      // Click the active center slide card
      const opened = await page.evaluate(() => {
        const activeCard = document.querySelector('.swiper-slide-active div[role="button"]');
        if (activeCard) {
          activeCard.click();
          return true;
        }
        return false;
      });

      console.log(`[${vp.name}] Clicked active card:`, opened);
      await page.waitForTimeout(800);

      const dialog = await page.$('div[role="dialog"]');
      if (dialog) {
        const dialogText = await dialog.innerText();
        const hasGalleryViews = dialogText.toLowerCase().includes('gallery views');
        console.log(`[${vp.name}] Active Dialog open. Contains "gallery views"? ${hasGalleryViews}`);

        const images = await dialog.$$('img');
        console.log(`[${vp.name}] Active Dialog image count: ${images.length} (expected exactly 1 hero image).`);

        const outPath = path.join(__dirname, `dialog_active_${vp.name}.png`);
        await dialog.screenshot({ path: outPath });
        console.log(`Saved screenshot to ${outPath}`);

        // Also check bounding box of modal body to ensure it fits comfortably within viewport
        const box = await dialog.boundingBox();
        console.log(`[${vp.name}] Dialog modal dimensions: width=${Math.round(box.width)}, height=${Math.round(box.height)}`);

        await page.keyboard.press('Escape');
        await page.waitForTimeout(500);
      } else {
        console.error(`Could not open active dialog on ${vp.name}`);
      }

    } catch (err) {
      console.error(`Error on ${vp.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Dialog tests complete.');
})();
