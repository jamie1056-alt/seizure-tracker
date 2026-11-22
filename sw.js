// Caches the app so it opens instantly and works with no signal.
// Only the app's own files and the Firebase library are cached – never database traffic.
const CACHE = "seizure-tracker-v26";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-v2-192.png", "./icon-v2-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  const own = u.origin === self.location.origin;
  const lib = u.hostname === "www.gstatic.com" && u.pathname.startsWith("/firebasejs/");
  if (!own && !lib) return;                       // leave Firestore, sign-in and everything else alone
  e.respondWith(fetch(e.request).then(r => { if (r.ok && !u.search) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: own}).then(r => r || (own ? caches.match("./index.html") : undefined))));
});
