self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.includes('ledgr-preview/') && !k.includes('ledgr-preview/app/'))
          .map((k) => caches.delete(k))
      );
    } catch (e) { /* cache API unavailable — unregister still frees the root */ }
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) client.navigate(client.url);
  })());
});
