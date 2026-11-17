// Self-healing recovery script for stale Service Worker caches
console.log('[Belle Ligne] Purging stale Service Worker cache and reloading fresh version...');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(regs) {
    for (var i = 0; i < regs.length; i++) {
      regs[i].unregister();
    }
  });
}
if ('caches' in window) {
  caches.keys().then(function(names) {
    return Promise.all(names.map(function(n) { return caches.delete(n); }));
  }).then(function() {
    window.location.reload();
  });
} else {
  window.location.reload();
}
