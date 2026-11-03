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
    { name: '1920px', width: 1920, height: 1000 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    try {
      await page.goto('http://localhost:3000/en#gallery', { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000);

      const gallerySection = await page.$('#gallery');
      if (gallerySection) {
        const outPath = path.join(__dirname, `gallery_${vp.name}.png`);
        await gallerySection.screenshot({ path: outPath });
        console.log(`Saved screenshot to ${outPath}`);
      } else {
        console.error('Could not find #gallery section');
      }
    } catch (err) {
      console.error(`Error on ${vp.name}:`, err.message);
    } finally {
      await page.close();
    }
  }

  // Also test hover pause behavior
  const testPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  try {
    await testPage.goto('http://localhost:3000/en#gallery', { waitUntil: 'networkidle', timeout: 15000 });
    const track = await testPage.$('.gallery-marquee-track');
    if (track) {
      const getTransform = () => testPage.evaluate(el => window.getComputedStyle(el).transform, track);
      const getPlayState = () => testPage.evaluate(el => window.getComputedStyle(el).animationPlayState, track);

      console.log('Initial playState:', await getPlayState());
      
      // Hover over marquee
      await testPage.hover('.group\\/marquee');
      await testPage.waitForTimeout(300);
      console.log('Hover playState:', await getPlayState());

      // Check Pause button click
      const pauseBtn = await testPage.$('button[aria-label*="Pause"], button[aria-label*="pause"]');
      if (pauseBtn) {
        await pauseBtn.click();
        await testPage.waitForTimeout(300);
        console.log('Clicked pause button, playState:', await getPlayState());
      }
    }
  } catch (err) {
    console.error('Error testing hover/pause:', err.message);
  } finally {
    await testPage.close();
  }

  await browser.close();
  console.log('All tests completed.');
})();
