import http from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { identities } from "./src/data.js";
import { readDirectoryArtist } from "./src/directory.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const files = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/src/app.js", "src/app.js"],
  ["/src/data.js", "src/data.js"],
  ["/src/style.css", "src/style.css"],
  ["/favicon.svg", "public/favicon.svg"],
]);
const types = {
  html: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  svg: "image/svg+xml",
};
const cache = new Map();
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-src https://bandcamp.com; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  );
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    return res.end("Read-only prototype");
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
});
server.listen(Number(process.env.PORT || 4178), "127.0.0.1", () =>
  console.log("Music NFT Era: http://127.0.0.1:" + (process.env.PORT || 4178)),
);
