// main.js
const worker = new Worker('worker.js');
worker.onmessage = ({data}) => console.log('onmessage', data);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
}

if ('serviceWorker' in navigator && 'SyncManager' in window) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.sync.register('my-sync').then(() => {
      console.log('Sync registered');
    });
  });
}