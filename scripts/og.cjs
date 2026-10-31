// Renders public/og.png, the 1200x630 share image, with the site's own fonts and logo.
// Run after `npm run build` with `npx astro preview` on :4321: node scripts/og.cjs
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('http://localhost:4321/');
  await p.evaluate(() => {
    document.body.style.margin = 0;
    document.body.innerHTML = `<div style="width:1200px;height:630px;background:#f1eee6;display:grid;grid-template-columns:1fr 430px;overflow:hidden">
      <div style="padding:72px 0 64px 80px;display:flex;flex-direction:column;justify-content:space-between">
        <img src="/brand/flywheel-horizontal-color.svg" style="width:168px;height:auto;align-self:flex-start">
        <div style="font-family:var(--head);font-weight:700;font-size:96px;line-height:1;letter-spacing:-.01em;color:#1f2a36">Your firm,<br>fully staffed.</div>
        <div style="font-family:var(--body);font-size:26px;color:#3d3b37">AI staff for custom integration firms</div>
      </div>
      <div style="background:#f2c200;display:grid;place-items:center"><img src="/brand/app-icon-512.png" style="width:280px;height:auto"></div></div>`;
  });
  await p.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode())]));
  await p.screenshot({ path: 'public/og.png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await b.close();
})();
