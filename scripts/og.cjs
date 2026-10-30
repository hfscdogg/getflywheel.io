// Renders public/og.png (1200x630 share image) and public/brand/mark-512.png from the built site's fonts.
// Run after `npm run build` with `npx astro preview` on :4321: node scripts/og.cjs
const { chromium } = require('playwright');
const mark = (fg) => `<svg viewBox="0 0 32 32" width="100%" height="100%"><circle cx="16" cy="16" r="11" fill="none" stroke="${fg}" stroke-width="2.2"/><circle cx="16" cy="16" r="3" fill="${fg}"/><rect x="13" y="2" width="6" height="6" fill="#f0d000"/><rect x="23.46" y="9.6" width="6" height="6" fill="${fg}"/><rect x="19.47" y="21.9" width="6" height="6" fill="${fg}"/><rect x="6.53" y="21.9" width="6" height="6" fill="${fg}"/><rect x="2.54" y="9.6" width="6" height="6" fill="${fg}"/></svg>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('http://localhost:4321/');
  await p.evaluate((m) => {
    document.body.innerHTML = `<div style="width:1200px;height:630px;background:#141414;color:#faf9f6;padding:72px 80px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;font-family:var(--body)">
      <div style="display:flex;align-items:center;gap:14px;font-family:var(--display);font-weight:600;font-size:38px;letter-spacing:.04em;text-transform:uppercase"><div style="width:44px;height:44px">${m}</div>Flywheel</div>
      <div style="font-family:var(--display);font-weight:600;text-transform:uppercase;font-size:132px;line-height:.95">Your firm,<br><span style="color:#f0d000">fully staffed.</span></div>
      <div style="display:flex;justify-content:space-between;font-family:var(--mono);font-size:20px;letter-spacing:.08em;text-transform:uppercase;color:#c2c6ca;border-top:1px solid #2e3236;padding-top:22px"><span>AI staff for custom integrators</span><span>getflywheel.io</span></div></div>`;
    document.body.style.margin = 0;
  }, mark('#faf9f6'));
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: 'public/og.png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await p.setViewportSize({ width: 512, height: 512 });
  await p.evaluate((m) => { document.body.innerHTML = `<div style="width:512px;height:512px;background:#141414;display:grid;place-items:center"><div style="width:360px;height:360px">${m}</div></div>`; }, mark('#faf9f6'));
  await p.screenshot({ path: 'public/brand/mark-512.png', clip: { x: 0, y: 0, width: 512, height: 512 } });
  await b.close();
})();
