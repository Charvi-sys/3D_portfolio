export default async function run(page, ui) {
  // Emulate a phone viewport + touch so uiStore.isLowEnd() is true
  await page.setViewportSize({ width: 414, height: 896 });
  await page.addInitScript(() => {
    Object.defineProperty(window, "ontouchstart", { value: {} });
    Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 4 });
  });
  await page.goto("http://localhost:5175/3D_portfolio/", { waitUntil: "load" });
  await page.waitForSelector('text=ENTER THE WORLD', { timeout: 30000 })
  await page.getByText('ENTER THE WORLD').click()
  await page.waitForTimeout(9000);
  const info = await page.evaluate(() => ({
    w: innerWidth,
    h: innerHeight,
    canvasRect: (() => { const c = document.querySelector("canvas"); const r = c.getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; })(),
    bodyText: document.body.innerText.slice(0, 200),
  }));
  await page.screenshot({
    path: "C:/Users/asu/Desktop/charvi/mobile-2-world.png",
  });
  return info;
}
