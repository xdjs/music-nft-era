import { test, expect } from "@playwright/test";

for (const theme of ["dark", "light"]) {
  test(`curated path, evidence, relationship and history in ${theme}`, async ({
    page,
  }, info) => {
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.addInitScript(
      (t) => localStorage.setItem("era-theme", t),
      theme,
    );
    await page.route("**/api/directory/**", (r) =>
      r.fulfill({ json: { status: "unavailable" } }),
    );
    await page.goto("/");
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(page.locator("h1")).toHaveText("A scene,in the making.");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await page.screenshot({
      path: `captures/opening-${info.project.name}-${theme}.png`,
      fullPage: true,
      animations: "disabled",
    });
    await page.getByRole("link", { name: "Enter the chapter" }).click();
    await expect(page.locator("h1")).toContainText("Separate worlds");
    await page
      .locator(".person-chip")
      .filter({ hasText: "Three Oscillators" })
      .click();
    await expect(
      page.getByRole("dialog", { name: "Three Oscillators" }),
    ).toBeVisible();
    await expect(page.locator("#directory-status")).toContainText(
      "Music Nerd is taking a moment",
    );
    await page.screenshot({
      path: `captures/relationship-${info.project.name}-${theme}.png`,
      fullPage: false,
      animations: "disabled",
    });
    await page
      .getByRole("link", { name: "Boy Untitled ↗", exact: true })
      .click();
    await expect(page.locator("#sheet-title")).toHaveText("Boy Untitled");
    await page.getByRole("button", { name: "← Back", exact: true }).click();
    await expect(page.locator("#sheet-title")).toHaveText("Three Oscillators");
    await page
      .locator(".relationship")
      .filter({ hasText: "Boy Untitled" })
      .getByRole("link", { name: "Inspect evidence" })
      .click();
    await expect(page.locator("#sheet-title")).toContainText("oral history");
    await expect(
      page.getByRole("link", { name: "Open original source" }),
    ).toHaveAttribute("href", /archive.metalabel.com/);
    await page.getByRole("button", { name: "Close detail" }).click();
    await expect(page.locator("#sheet")).not.toBeVisible();
    await expect(page).toHaveURL(/#\/moment\/remix$/);
    await expect(
      page.locator(".person-chip").filter({ hasText: "Three Oscillators" }),
    ).toBeFocused();
    await page.getByRole("link", { name: "Next in the chapter" }).click();
    await expect(page.locator("h1")).toContainText("Two weeks");
    await page.screenshot({
      path: `captures/walls-${info.project.name}-${theme}.png`,
      fullPage: true,
      animations: "disabled",
    });
    await page.goBack();
    await expect(page.locator("h1")).toContainText("Separate worlds");
    expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
    await page.getByRole("link", { name: "Next in the chapter" }).click();
    for (const title of [
      "What if a band",
      "A familiar voice",
      "The internet needed",
      "Someone had to",
    ]) {
      await page.getByRole("link", { name: "Next in the chapter" }).click();
      await expect(page.locator("h1")).toContainText(title);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
    }
    await page.getByRole("link", { name: "Find someone to hear next" }).click();
    await page.getByRole("button", { name: /People \d/ }).click();
    await page.getByRole("searchbox").fill("Dutch");
    await page.locator(".people-index a").click();
    await expect(page.locator("#sheet-title")).toHaveText("Dutchyyy");
    await page.keyboard.press("Escape");
    await expect(page.locator("#sheet")).not.toBeVisible();
    await expect(page.getByRole("searchbox")).toHaveValue("Dutch");
    await expect(page.locator(".people-index a")).toHaveCount(1);
    await page.getByRole("searchbox").fill("no matching person");
    await expect(
      page.getByRole("heading", { name: "No match in this chapter." }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}
test("direct detail link, keyboard focus and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/moment/walls?source=walls");
  await expect(page.locator("#sheet-title")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#sheet")).not.toBeVisible();
  await expect(page.locator("h1")).toContainText("Two weeks");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to the story" }),
  ).toBeFocused();
  const link = page.getByRole("link", { name: "Enter the chapter" });
  await link.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("h1")).toContainText("Separate worlds");
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
});
test("media is opt-in, has fallback, and is destroyed on stop", async ({
  page,
}) => {
  await page.route("https://bandcamp.com/**", (r) => r.abort());
  await page.goto("/");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Listen first" }).click();
  await expect(page.locator("#listening")).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(1);
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    /album=1347599098/,
  );
  await expect(page.locator("iframe")).not.toHaveAttribute("allow", /autoplay/);
  await expect(
    page.getByRole("link", { name: "Open the artist’s Bandcamp" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Stop & close" }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Listen first" }),
  ).toBeFocused();
});
test("server does not expose private files or write methods", async ({
  request,
}) => {
  for (const path of [
    "/.firecrawl/wallet-nfts.json",
    "/docs/TRACKING.md",
    "/src/directory.js",
    "/.git/config",
    "/api/directory/unknown",
  ])
    expect((await request.get(path)).status()).toBe(404);
  expect(
    (
      await request.post("/api/directory/dutchyyy", {
        data: { name: "changed" },
      })
    ).status(),
  ).toBe(405);
});
test("a stalled directory request times out without stranding the story", async ({
  page,
}) => {
  await page.clock.install();
  await page.route("**/api/directory/**", () => {});
  await page.goto("/#/moment/remix?person=three-oscillators");
  await expect(page.locator("#directory-status")).toContainText("Checking");
  await page.clock.runFor(8100);
  await expect(page.locator("#directory-status")).toContainText(
    "Music Nerd is taking a moment",
  );
  await page.getByRole("button", { name: "Close detail" }).click();
  await expect(page.locator("h1")).toContainText("Separate worlds");
});
