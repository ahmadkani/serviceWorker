// data-worker.js
self.addEventListener('message', async (event) => {
  const data = event.data;
  const processedData = processData(data);
  self.postMessage(processedData);
});

function processData(data) {
  // Perform data processing here
}