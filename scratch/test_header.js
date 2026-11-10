const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  // We can render a mock of the header or spin up next dev / build
  // Let's check how Header is structured
})();

