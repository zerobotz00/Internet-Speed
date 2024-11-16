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
