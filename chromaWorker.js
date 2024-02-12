let chromaRgb = [233, 74, 74];
let chromaProcess = 1;
const chromaCycle = () => {
    if (chromaProcess == 1) {
        //add to green until 233
        if (chromaRgb[1] < 233) {
            chromaRgb[1] += 2;
        } else {
            chromaProcess = 2;
        }
    } else if (chromaProcess == 2) {
        //minus from red until 74
        if (chromaRgb[0] > 74) {
            chromaRgb[0] -= 2;
        } else {
            chromaProcess = 3;
        }
    } else if (chromaProcess == 3) {
        //add to blue until 233
        if (chromaRgb[2] < 233) {
            chromaRgb[2] += 2;
        } else {
            chromaProcess = 4;
        }
    } else if (chromaProcess == 4) {
        //minus from green until 74
        if (chromaRgb[1] > 74) {
            chromaRgb[1] -= 2;
        } else {
            chromaProcess = 5;
        }
    } else if (chromaProcess == 5) {
        //add to red until 233
        if (chromaRgb[0] < 233) {
            chromaRgb[0] += 2;
        } else {
            chromaProcess = 6;
        }
    } else if (chromaProcess == 6) {
        //minus from blue until 74
        if (chromaRgb[2] > 74) {
            chromaRgb[2] -= 2;
        } else {
            chromaProcess = 1;
        }
    }
    self.postMessage({ chromaRgb });
};

self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        // Start the chroma cycle
        setInterval(chromaCycle, 20);
    }
});