const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const viewports = [
    { name: '375px', width: 375, height: 800 },
    { name: '768px', width: 768, height: 900 },
    { name: '1280px', width: 1280, height: 900 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    try {
      await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(500);

      const footer = await page.$('footer');
      if (footer) {
        const outPath = path.join(__dirname, `footer_${vp.name}.png`);
        await footer.screenshot({ path: outPath });
        console.log(`Saved footer screenshot to ${outPath}`);

        // Check columns bounding boxes
        const colBoxes = await page.evaluate(() => {
          const footerGrid = document.querySelector('footer .grid');
          if (!footerGrid) return null;
          const cols = Array.from(footerGrid.children).map(c => {
            const rect = c.getBoundingClientRect();
            return {
              tag: c.tagName,
              h4: c.querySelector('h4, h3')?.textContent?.trim(),
              x: Math.round(rect.x),
              y: Math.round(rect.y),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          });
          return cols;
        });
        console.log(`Viewport ${vp.name} column layout:`, JSON.stringify(colBoxes));
      } else {
        console.error('Could not find <footer> element');
      }

      // Check full page text for any forbidden terms
      const pageText = await page.evaluate(() => document.body.innerText.toLowerCase());
      const forbidden = ['follow us', 'tripadvisor', 'official social channels', 'launching soon'];
      for (const term of forbidden) {
        if (pageText.includes(term)) {
          console.error(`FORBIDDEN TERM DETECTED on ${vp.name}: "${term}"`);
        }
      }
    } catch (err) {
      console.error(`Error on ${vp.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  // Also check other locales: de, fr, it, ja
  for (const loc of ['de', 'fr', 'it', 'ja']) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    try {
      await page.goto(`http://localhost:3000/${loc}`, { waitUntil: 'networkidle', timeout: 20000 });
      const text = await page.evaluate(() => document.body.innerText.toLowerCase());
      const forbidden = ['tripadvisor', 'launching soon', 'follow'];
      for (const term of forbidden) {
        if (text.includes(term)) {
          console.error(`FORBIDDEN TERM in locale ${loc}: "${term}"`);
        }
      }
    } catch (err) {
      console.error(`Locale ${loc} error:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Playwright verification finished.');
})();
