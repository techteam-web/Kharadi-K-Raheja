import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const WIDTHS = [
  { name: '375w', width: 375, height: 667 },
  { name: '768w', width: 768, height: 1024 },
  { name: '1024w', width: 1024, height: 768 },
  { name: '1920w', width: 1920, height: 1080 },
];

const PAGES = [
  '/', '/about', '/location', '/360-views', '/project-details',
  '/plans', '/office-floors', '/esg', '/e-brochure', '/contact',
];

// Pages we must keep no-scroll (vertically) at every breakpoint.
const NO_SCROLL_PAGES = new Set(['/about', '/location', '/360-views', '/plans']);

const browser = await chromium.launch();
const results = [];

for (const vp of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', (err) => errors.push(err.message));

  for (const route of PAGES) {
    errors.length = 0;
    await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(route === '/location' ? 3000 : 1000);

    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
    }));

    const hOverflow = metrics.scrollWidth > metrics.clientWidth + 2; // small tolerance
    const vOverflow = metrics.scrollHeight > metrics.clientHeight + 2;
    const mustNoScroll = NO_SCROLL_PAGES.has(route);

    results.push({
      width: vp.name,
      route,
      hOverflow,
      vOverflowViolation: mustNoScroll && vOverflow,
      errors: [...errors],
    });

    // screenshot at phone width only, to keep this manageable
    if (vp.width === 375) {
      const safeName = route === '/' ? 'home' : route.replace(/\//g, '');
      await page.screenshot({ path: `resp-375-${safeName}.png` });
    }
  }
  await page.close();
}

const problems = results.filter((r) => r.hOverflow || r.vOverflowViolation || r.errors.length > 0);

console.log(`Checked ${results.length} (width x page) combinations.`);
if (problems.length === 0) {
  console.log('NO PROBLEMS FOUND.');
} else {
  console.log('PROBLEMS:');
  problems.forEach((p) => {
    console.log(
      `  ${p.width} ${p.route} :: hOverflow=${p.hOverflow} vOverflowViolation=${p.vOverflowViolation} errors=${JSON.stringify(p.errors)}`,
    );
  });
}

await browser.close();
