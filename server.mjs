import { createReadCache } from "./src/request-cache.mjs";
import { readCollection } from "./src/nft-collections.mjs";
import { nftCatalog } from "./src/nft-catalog.js";
import { readNFT } from "./src/nft-reader.mjs";
import { portraits } from "./src/portraits.js";
import http from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { identities } from "./src/data.js";
import { readDirectoryArtist } from "./src/directory.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const files = new Map([
  ["/sequence/documentary.js", "prototype/documentary.js"],
  ["/sequence/library.js", "prototype/library.js"],
  ["/sequence/", "prototype/sequence.html"],
  ["/sequence/sequence.css", "prototype/sequence.css"],
  ["/sequence/sequence.js", "prototype/sequence.js"],
  ["/sequence/performance-frame.webp", "prototype/performance-frame.webp"],
  ["/prototype/", "prototype/index.html"],
  ["/prototype/prototype.css", "prototype/prototype.css"],
  ["/prototype/prototype.js", "prototype/prototype.js"],
  ["/", "prototype/sequence.html"],
  ["/legacy/", "index.html"],
  ["/index.html", "prototype/sequence.html"],
  ["/src/app.js", "src/app.js"],
  ["/src/playlist.js", "src/playlist.js"],
  ["/src/media-recovery.js", "src/media-recovery.js"],
  ...[
    "sound-import-1",
    "sound-import-10",
    "sound-import-v1-1",
    "sound-import-v1-10",
    "sound-legacy-import",
    "park-import",
    "video-import",
  ].map((name) => [`/src/${name}.js`, `src/${name}.js`]),
  ["/src/nft-catalog.js", "src/nft-catalog.js"],
  ["/src/data.js", "src/data.js"],
  ["/src/narrative.js", "src/narrative.js"],
  ["/src/portraits.js", "src/portraits.js"],
  ["/src/style.css", "src/style.css"],
  ["/src/film.css", "src/film.css"],
  ["/favicon.svg", "public/favicon.svg"],
]);
for (const name of [
  "web3-music-era-cover.png",
  "helmet-city-poster.png",
  "iman-mwwm-loop.webm",
  "nokmly-480.webp",
  "video-latasha-623-1500.webp",
  "lab-preview-20261104.png",
  "sound-of-fractures-press.jpg",
  "latasha-press.jpg",
  "rae-isla-live.jpg",
  "iman-europe-press.png",
  "cc0lab-01.png",
  "cc0lab-08.png",
  "BarlowCondensed-Bold.ttf",
])
  files.set(`/media/${name}`, `public/media/${name}`);
for (const stem of [
  "helmet-city-poster",
  "record-69c77ef0",
  "record-not4me",
  "record-not4me-acoustic",
  "record-xcelencia-isla",
  "record-xcelencia-soltera",
  "imogen-song-map",
  "tk-never-forget",
  "genesis-party",
  "chaos-walls",
  "catalog-eprom",
  "tape-launch",
  "genesis-chat",
  "daniel-allan",
  "overstimulated",
  "sound-year",
  "sound-of-fractures-press",
  "latasha-press",
  "rae-isla-live",
  "iman-europe-press",
  "cc0lab-01",
  "cc0lab-08",
]) {
  for (const width of [480, 960, 1500])
    files.set(
      `/media/${stem}-${width}.webp`,
      `public/media/${stem}-${width}.webp`,
    );
}
for (const [id, portrait] of Object.entries(portraits)) {
  if (!portrait.file)
    for (const width of [160, 640])
      files.set(
        `/people/${id}-${width}.webp`,
        `public/people/${id}-${width}.webp`,
      );
}
for (const record of nftCatalog) {
  if (/^\/media\/video-latasha-\d+-480\.webp$/.test(record.localArtwork || ""))
    files.set(record.localArtwork, `public${record.localArtwork}`);
}
const types = {
  webm: "video/webm",
  webp: "image/webp",
  jpg: "image/jpeg",
  png: "image/png",
  ttf: "font/ttf",
  html: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  svg: "image/svg+xml",
};
const cache = new Map();
const readToken = createReadCache();
export async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://arweave.net https://*.arweave.net https://ipfs.filebase.io https://arpeggi-prod-public.s3.us-west-2.amazonaws.com; media-src 'self' https://turbo-gateway.com https://*.turbo-gateway.com https://gateway.pinata.cloud https://arweave.net https://*.arweave.net https://ipfs.filebase.io https://arpeggi-prod-public.s3.us-west-2.amazonaws.com; connect-src 'self'; frame-src https://bandcamp.com; object-src 'none'; base-uri 'none'; frame-ancestors 'self' https://lab.musicnerd.net https://lab.musicnerd.vercel.app",
  );
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    return res.end("Read-only prototype");
  }
  if (url.pathname === "/sequence/" || url.pathname === "/sequence") {
    res.writeHead(308, { Location: "/" + url.search });
    return res.end();
  }
  if (url.pathname.startsWith("/api/collection/")) {
    const record = nftCatalog.find((r) => r.id === url.pathname.slice(16));
    if (!record) {
      res.writeHead(404);
      return res.end("Unknown collection");
    }
    const value = await readCollection(record, url.searchParams.get("cursor"));
    res.writeHead(value.status === "indexed" ? 200 : 503, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    return res.end(JSON.stringify(value));
  }
  if (url.pathname.startsWith("/api/nft/")) {
    const record = nftCatalog.find((r) => r.id === url.pathname.slice(9));
    if (!record) {
      res.writeHead(404);
      return res.end("Unknown recording");
    }
    const requestedToken = url.searchParams.get("token");
    if (
      requestedToken &&
      (!/^\d{1,78}$/.test(requestedToken) ||
        BigInt(requestedToken) >= 2n ** 256n)
    ) {
      res.writeHead(400);
      return res.end("Invalid token ID");
    }
    const selected = requestedToken
      ? { ...record, tokenId: requestedToken }
      : record;
    const key = "nft:" + record.id + ":" + selected.tokenId;
    const value = await readToken(key, () => readNFT(selected));
    res.writeHead(value.status === "live" ? 200 : 503, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    return res.end(req.method === "HEAD" ? undefined : JSON.stringify(value));
  }
  if (url.pathname.startsWith("/api/directory/")) {
    const key = url.pathname.slice("/api/directory/".length);
    if (!Object.hasOwn(identities, key)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ status: "unconfirmed" }));
    }
    const hit = cache.get(key);
    const value =
      hit && Date.now() - hit.time < 300000
        ? hit.value
        : await readDirectoryArtist(identities[key]);
    if (value.status === "live") cache.set(key, { time: Date.now(), value });
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    return res.end(JSON.stringify(value));
  }
  const file = files.get(url.pathname);
  if (!file) {
    res.writeHead(404);
    return res.end("Not found");
  }
  try {
    const body = await readFile(root + file);
    res.writeHead(200, {
      "Content-Type": types[file.split(".").pop()],
      "Cache-Control": "no-cache",
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(500);
    res.end(
      "The exhibition could not be loaded. Please restart the local server.",
    );
  }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  http
    .createServer(handler)
    .listen(Number(process.env.PORT || 4178), "127.0.0.1", () =>
      console.log(
        "Music NFT Era: http://127.0.0.1:" + (process.env.PORT || 4178),
      ),
    );
}
