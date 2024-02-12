const root = document.querySelector(":root");
const chromaWorker = new Worker('/chromaWorker.js');

chromaWorker.addEventListener('message', (event) => {
    // Update the colors on the main thread using the received chromaRgb
    const { chromaRgb } = event.data;

    let _chromaRgbR = chromaRgb[0];
    let _chromaRgbG = chromaRgb[1];
    let _chromaRgbB = chromaRgb[2];

    root.style.setProperty(
        "--chroma-color-left",
        `rgb(${_chromaRgbR}, ${_chromaRgbG}, ${_chromaRgbB})`
    );
    root.style.setProperty(
        "--chroma-color-right",
        `rgb(${_chromaRgbG}, ${_chromaRgbB}, ${_chromaRgbR})`
    );
});

// Start the web worker
chromaWorker.postMessage('start');