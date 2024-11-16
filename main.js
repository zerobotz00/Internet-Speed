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
