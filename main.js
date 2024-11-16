// Include the Speedtest API or similar library
const startButton = document.getElementById("startTest");
const resultsDiv = document.getElementById("results");

async function testSpeed() {
 resultsDiv.innerHTML = "Testing...";

 try {
  // Fetch speed test results from an API
  const response = await fetch("https://fast.com/api/test"); // Example API
  const data = await response.json();

  const downloadSpeed = data.download; // Example property
  const uploadSpeed = data.upload; // Example property
  const ping = data.ping; // Example property

  resultsDiv.innerHTML = `
      <p>Download Speed: ${downloadSpeed} Mbps</p>
      <p>Upload Speed: ${uploadSpeed} Mbps</p>
      <p>Ping: ${ping} ms</p>
    `;
 } catch (error) {
  resultsDiv.innerHTML = "Error testing speed. Please try again.";
  console.error(error);
 }
}

startButton.addEventListener("click", testSpeed);
// Speed test logic using Open Source 'speedtest.js' library
const startButton = document.getElementById("startTest");
const resultsDiv = document.getElementById("results");

// Function to simulate speed test
async function testSpeed() {
  resultsDiv.innerHTML = "Testing speed, please wait...";

  try {
    // Fetch speed test results
    const speedTest = new Worker("https://cdn.jsdelivr.net/gh/adolfintel/speedtest/speedtest_worker.min.js");
    speedTest.postMessage("start");

    speedTest.onmessage = (event) => {
      const data = event.data;

      if (data.testState === 4) {
        // Test complete
        resultsDiv.innerHTML = `
          <p>Download Speed: ${data.dlStatus} Mbps</p>
          <p>Upload Speed: ${data.ulStatus} Mbps</p>
          <p>Ping: ${data.pingStatus} ms</p>
        `;
        speedTest.terminate();
      }
    };
  } catch (error) {
    resultsDiv.innerHTML = "Error testing speed. Please try again.";
    console.error("Speed Test Error:", error);
  }
}

startButton.addEventListener("click", testSpeed);

