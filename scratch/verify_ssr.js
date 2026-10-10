const http = require('http');

async function testLocale(locale) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + locale, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`=== ${locale} (Status: ${res.statusCode}) ===`);
        console.log('Contains "20+":', data.includes('20+'));
        console.log('Contains "Sri Lanka Local Guide":', data.includes('Sri Lanka Local Guide'));
        console.log('Contains "var(--color-brand-tagline)":', data.includes('var(--color-brand-tagline)'));
        if (locale === '/de') {
          console.log('Contains German "Jahre Erfahrung":', data.includes('Jahre Erfahrung'));
          console.log('Contains German "Vorheriges Bild":', data.includes('Vorheriges Bild'));
          console.log('Contains German "Nächstes Bild":', data.includes('Nächstes Bild'));
        }
        if (locale === '/ja') {
          console.log('Contains Japanese "年のガイド実績":', data.includes('年のガイド実績'));
          console.log('Contains Japanese "前のスライド":', data.includes('前のスライド'));
          console.log('Contains Japanese "次のスライド":', data.includes('次のスライド'));
        }
        if (locale === '/en') {
          console.log('Contains English "Years of Experience":', data.includes('Years of Experience'));
          console.log('Contains English "Previous slide":', data.includes('Previous slide'));
          console.log('Contains English "Next slide":', data.includes('Next slide'));
        }
        resolve();
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const loc of ['/en', '/de', '/ja']) {
    await testLocale(loc);
  }
})();
