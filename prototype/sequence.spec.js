import { test, expect } from "@playwright/test";
async function scene(page, n) {
  await page.locator("#beat-" + n).evaluate((e) =>
    scrollTo({
      top: e.getBoundingClientRect().top + scrollY + 80,
      behavior: "instant",
    }),
  );
  await expect(page.locator("body")).toHaveAttribute("data-scene", String(n));
}
test("scene progression keeps artifacts, collaborators and reading separate", async ({
  page,
}) => {
  await page.goto("/sequence/");
  for (let n = 0; n < 6; n++) {
    await scene(page, n);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await scene(page, 3);
  const people = await page.locator(".people").boundingBox(),
    copy = await page.locator("#beat-3 .copy").boundingBox();
  expect(people.y + people.height).toBeLessThan(copy.y);
  const play = await page.locator("#play-record").boundingBox();
  if ((await page.locator("#play-record").getAttribute("tabindex")) === "0")
    expect(Math.min(play.width, play.height)).toBeGreaterThanOrEqual(44);
});
test("context returns to the same scene and keyboard focus", async ({
  page,
}) => {
  await page.goto("/sequence/");
  await scene(page, 3);
  const y = await page.evaluate(() => scrollY);
  await page.locator('[data-person="pete-rango"]').click();
  await expect(page.locator("#context")).toBeVisible();
  await expect(page.locator("#context-body h2")).toHaveText("Pete Rango");
  await page.goBack();
  await expect(page.locator("#context")).not.toBeVisible();
  expect(await page.evaluate(() => scrollY)).toBe(y);
  await expect(page.locator('[data-person="pete-rango"]')).toBeFocused();
  await page.locator("#chapters").click();
  await page.locator('#context a[href="#beat-1"]').click();
  await expect(page.locator("#context")).not.toBeVisible();
  await expect(page).toHaveURL(/#beat-1$/);
});
test("reduced motion stays silent and a failed original lookup remains retryable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  let requests = 0;
  await page.route("**/api/nft/**", (route) => {
    requests++;
    return route.fulfill({ status: 503, body: "Unavailable" });
  });
  await page.goto("/sequence/");
  await expect(page.locator("#motion")).toHaveAttribute("aria-pressed", "true");
  expect(requests).toBe(0);
  expect(await page.locator("video").evaluate((v) => v.paused)).toBe(true);
  await scene(page, 0);
  await page.locator("#pause").click();
  await expect(page.locator("#status")).toContainText("Press play to retry");
  expect(requests).toBe(1);
  await page.locator("#pause").click();
  await expect.poll(() => requests).toBe(2);
});

test("full history opens context and preserves position through music and nested profiles", async ({
  page,
}) => {
  await page.goto("/sequence/");
  await expect(page.locator(".doc-chapter")).toHaveCount(14);
  await page.locator("#history-catalog").scrollIntoViewIfNeeded();
  await page
    .locator("#history-catalog .doc-art img")
    .evaluate((img) => img.decode());
  await page
    .locator('#history-catalog a[href="#person-jeremy-stern"]')
    .first()
    .scrollIntoViewIfNeeded();
  const y = await page.evaluate(() => scrollY);
  await page
    .locator('#history-catalog a[href="#person-jeremy-stern"]')
    .first()
    .click();
  await expect(page.locator("#context h2")).toHaveText("Jeremy Stern");
  await page.locator('#context a[href="#chapter-catalog"]').click();
  await expect(page.locator("#back-context")).toBeVisible();
  await page.locator("#close-context").click();
  await expect(page.locator("#context")).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(y);
  await page.locator(".music-nav").click();
  await expect(page.locator("#music-library")).toBeVisible();
  await page.locator(".filter-disclosure").evaluate((e) => (e.open = true));
  await page.locator("#music-collection").selectOption("CHAOS");
  await expect(page.locator("#music-count")).not.toHaveText("232 recordings");
  await expect(page.locator(".music-card").first()).toContainText("Walls");
  await page.locator(".music-card a").first().click();
  await expect(page.locator("#context h2")).toContainText("Walls");
  await page.keyboard.press("Escape");
  await expect(page.locator("#music-collection")).toHaveValue("CHAOS");
  await page.locator("#back-story").click();
  await expect(page.locator("#film")).toBeVisible();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(y);
});

test("library combines filters, gives useful empty state and restores through back", async ({
  page,
}) => {
  await page.goto("/sequence/#music?artist=Jamee+Cornelia&kind=video");
  await expect(page.locator(".music-card")).toHaveCount(2);
  await expect(page.locator(".music-card")).toContainText(["Dizzy", "CULTURE"]);
  await page.locator("#music-search").fill("no matching recording");
  await expect(page.locator(".no-results")).toBeVisible();
  await page.locator(".filter-disclosure").evaluate((e) => (e.open = true));
  await page.locator("#clear-music").click();
  await expect(page.locator(".music-card")).toHaveCount(24);
  await page.locator("#music-platform").selectOption("Songcamp");
  await page.locator(".filter-disclosure").evaluate((e) => (e.open = true));
  await page.locator("#music-collection").selectOption("CHAOS");
  await expect(page.locator(".music-card").first()).toContainText("Walls");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("artwork playback uses one player, queues next and pauses on the same button", async ({
  page,
}) => {
  const wav = Buffer.alloc(44 + 160000);
  wav.write("RIFF");
  wav.writeUInt32LE(wav.length - 8, 4);
  wav.write("WAVEfmt ", 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(8000, 24);
  wav.writeUInt32LE(16000, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(160000, 40);
  await page.route("**/api/nft/**", (r) =>
    r.fulfill({
      json: {
        status: "live",
        mediaURL: "https://ipfs.filebase.io/ipfs/test/doc.wav",
      },
    }),
  );
  await page.route("**/ipfs/test/doc.wav", (r) =>
    r.fulfill({ body: wav, contentType: "audio/wav" }),
  );
  await page.goto("/sequence/#music");
  await page.locator('[data-listen="record-69c77ef0"]').click();
  await expect(page.locator(".collection-player")).toBeVisible();
  await expect
    .poll(() =>
      page.locator(".playlist-screen audio").evaluate((e) => !e.paused),
    )
    .toBe(true);
  await page.locator('[data-queue="record-chaos-walls"]').click();
  await page.getByRole("button", { name: "Show queue", exact: true }).click();
  await expect(page.locator(".playlist-queue li").nth(1)).toContainText(
    "Walls",
  );
  await page
    .getByRole("button", { name: "Collapse queue", exact: true })
    .click();
  await page.locator('[data-listen="record-69c77ef0"]').click();
  await expect
    .poll(() =>
      page.locator(".playlist-screen audio").evaluate((e) => e.paused),
    )
    .toBe(true);
  await page.locator("#back-story").click();
  await page
    .getByRole("button", { name: "Stop and close player", exact: true })
    .click();
  await scene(page, 2);
  await page.locator("#play-record").click();
  await expect(page.locator(".collection-player")).not.toBeVisible();
  await expect
    .poll(() => page.locator("body > audio").evaluate((e) => !e.paused))
    .toBe(true);
  expect(await page.locator("#performance").evaluate((e) => e.paused)).toBe(
    true,
  );
});

test("chapter images and source drawers remain usable at this viewport", async ({
  page,
}) => {
  await page.goto("/sequence/");
  for (const section of await page.locator(".doc-chapter").all()) {
    await section.scrollIntoViewIfNeeded();
    await section.locator(".doc-art>img").evaluate((img) => img.decode());
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.locator("#history-latasha-videos").scrollIntoViewIfNeeded();
  await page
    .locator('#history-latasha-videos a[href="#person-latasha"]')
    .first()
    .click();
  await page
    .locator("#context .profile-photo img")
    .evaluate((img) => img.decode());
  await expect(page.locator("#context .profile-photo")).toBeVisible();
});

test("credited contributors expose their recordings", async ({ page }) => {
  await page.goto("/sequence/#music");
  await page.locator(".filter-disclosure").evaluate((e) => (e.open = true));
  await page.locator("#music-artist").selectOption("Pete Rango");
  await expect(page.locator(".music-grid")).toContainText("MIAMI FREESTYLE");
  await page.goto("/sequence/#person-pete-rango");
  await expect(
    page.locator("#context [data-library-play]").first(),
  ).toBeVisible();
});

test("foundations precede experiments and the performance follows Zoratopia", async ({
  page,
}) => {
  await page.goto("/sequence/");
  await expect(page.locator("#history-start h1")).toHaveText(
    "The Web3Music Era.",
  );
  await page.screenshot({
    path: `/tmp/web3-music-era-${test.info().project.name}.png`,
  });
  const order = await page.evaluate(() =>
    [
      "history-start",
      "why-this-mattered",
      "understanding-nfts",
      "history-tiny-human",
      "history-tape",
      "history-catalog",
      "history-zoratopia",
      "beat-0",
      "history-future-surf",
    ].map((id) => document.getElementById(id).getBoundingClientRect().top),
  );
  expect(order).toEqual([...order].sort((a, b) => a - b));
  await expect(page.locator("#understanding-nfts")).toContainText(
    "Non-fungible",
  );
  await expect(page.locator("#history-tape")).toContainText("Jacob Horne");
  await expect(page.locator("#history-catalog")).toContainText("Loft Radio");
  await expect(page.locator("#history-latasha-videos")).toContainText(
    "Jahmel Reynolds",
  );
  await expect(page.locator("body")).toHaveClass(/in-history/);
  await scene(page, 0);
  await expect(page.locator("body")).not.toHaveClass(/in-history/);
  await page.locator("#history-future-surf").scrollIntoViewIfNeeded();
  await expect(page.locator("body")).toHaveClass(/in-history/);
});

test("video recovery preserves thumbnails, contributor discovery and original-token details", async ({
  page,
}) => {
  await page.goto("/sequence/#music?artist=Jamee%20Cornelia&kind=video");
  const card = page
    .locator(".music-card")
    .filter({ has: page.locator('[data-listen="latasha-zora-8233"]') });
  await expect(card).toBeVisible();
  await expect(card.locator("img")).toHaveAttribute(
    "src",
    "/media/video-latasha-8233-480.webp",
  );
  await card.getByRole("link", { name: "Details" }).click();
  await expect(page.locator("#context-body")).toContainText("Jamee Cornelia");
  await expect(
    page.locator("#context-body a").filter({ hasText: "Inspect the token" }),
  ).toHaveAttribute(
    "href",
    /0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7\?a=8233/,
  );
  await page.goBack();
  await expect(card).toBeVisible();
});

test("artist display names retain accents while older filter links and searches work", async ({
  page,
}) => {
  await page.goto("/sequence/#music?artist=LATASHA&kind=video");
  await expect(page.locator("#music-artist")).toHaveValue("LATASHÁ");
  await expect(page.locator(".music-card").first()).toContainText("LATASHÁ");
  await page.locator("#music-search").fill("latasha");
  await expect(page.locator('[data-listen="latasha-zora-623"]')).toBeVisible();
  await page
    .locator(".music-card")
    .filter({ has: page.locator('[data-listen="latasha-zora-623"]') })
    .getByRole("link", { name: "Details" })
    .click();
  await expect(page.locator("#context-body a.entity").first()).toHaveText(
    "LATASHÁ",
  );
  await page.goto("/sequence/#chapter-spinamp");
  await expect(page.locator("#context-body")).toContainText(
    "The music needed a player.",
  );
  await expect(
    page.locator(
      '#context-body a[href="https://www.quicknode.com/blog/feature-fridays-spinamp"]',
    ),
  ).toBeVisible();
});

test("ambient performance moves silently only in its scene and honors reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/sequence/");
  await scene(page, 0);
  const v = page.locator("#performance");
  await expect
    .poll(() => v.evaluate((e) => e.currentTime))
    .toBeGreaterThan(0.2);
  expect(await v.evaluate((e) => e.muted)).toBe(true);
  await expect(v).toHaveAttribute("src", "/media/iman-mwwm-loop.webm");
  await page.locator("#history-future-surf").scrollIntoViewIfNeeded();
  await expect.poll(() => v.evaluate((e) => e.paused)).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await scene(page, 0);
  expect(await v.evaluate((e) => e.paused && !e.currentSrc)).toBe(true);
});

test("collection artwork changes before a delayed original-media lookup completes", async ({
  page,
}) => {
  await page.route("**/api/nft/**", async (route) => {
    await new Promise((r) => setTimeout(r, 1500));
    await route.fulfill({ json: { status: "unavailable" } });
  });
  await page.goto("/sequence/#music?q=No%20One%20Knows");
  await page
    .locator(
      '[data-listen="sound-legacy-fa947daea2b941da51ed42147cb9e8cdcf6445fc-1"]',
    )
    .click();
  await expect(page.locator(".player-cover")).toHaveAttribute(
    "src",
    "/media/nokmly-480.webp",
  );
  await expect
    .poll(() =>
      page
        .locator(".player-cover")
        .evaluate((e) => e.complete && e.naturalWidth > 0),
    )
    .toBe(true);
});

test("camp history and collaborator portraits open useful context without sale-timestamp warnings", async ({
  page,
}) => {
  await page.goto("/sequence/");
  await expect(
    page.locator('#history-chaos a[href="#chapter-elektra"]').first(),
  ).toBeVisible();
  await page
    .locator('#history-chaos a[href="#chapter-elektra"]')
    .first()
    .click();
  await expect(page.locator("#context-body")).toContainText(
    "Camp Genesis was Songcamp’s first camp",
  );
  await page.goto("/sequence/#chapter-latasha-videos");
  await expect(page.locator("#context-body")).not.toContainText(
    "What remains unconfirmed",
  );
  await page.goto("/sequence/");
  await expect(page.locator("#history-catalog .doc-people a")).toHaveCount(3);
  await expect(page.locator("#history-future-surf .doc-people a")).toHaveCount(
    3,
  );
});

test("playing inside a chapter exposes the player and loading feedback", async ({
  page,
}) => {
  await page.route("**/api/nft/**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await route.fulfill({ json: { status: "unavailable" } });
  });
  await page.goto("/sequence/#chapter-latasha-videos");
  await page.locator('#context [data-library-play="latasha-zora-623"]').click();
  await expect(page.locator("#context")).not.toBeVisible();
  await expect(page.locator('.player-track [role="status"]')).toHaveText(
    "Loading original recording…",
  );
  await expect(page.locator(".player-expanded")).toBeVisible();
});

test("homepage is the documentary and the old draft address redirects", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#history-start h1")).toHaveText(
    "The Web3Music Era.",
  );
  await expect(page.locator(".film-hero-copy")).toHaveCount(0);
  await page.goto("/sequence/#history-afterglow");
  await expect(page).toHaveURL(/\/#history-afterglow$/);
  await expect(
    page.locator('#history-afterglow img[src*="rae-isla-live"]').first(),
  ).toBeVisible();
});
