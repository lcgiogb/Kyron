const videoElement = document.getElementById("videoElement");
const canvasElement = document.getElementById("outputCanvas");
const canvasCtx = canvasElement.getContext("2d");
const btnCalibrar = document.getElementById("btnCalibrar");
const hpBar = document.getElementById("hp-bar");
const txtHp = document.getElementById("txtHp");
const txtGameOver = document.getElementById("txtGameOver");
const statusPostura = document.getElementById("statusPostura");

let isCalibrated = false;
let requestCalibration = false;
let baselineNeckLength = 0;
let skeletonColor = "#00ffff";
let hp = 100;
let gameOver = false;

btnCalibrar.addEventListener("click", () => {
    requestCalibration = true;
    gameOver = false;
    hp = 100;
    txtGameOver.style.display = "none";
    hpBar.style.width = "100%";
    txtHp.innerText = "100";
    statusPostura.innerText = "Calibrando... fique em uma postura confortável.";
});

function calculateDistance(p1, p2) {
    return Math.sqrt(
        Math.pow(p1.x - p2.x, 2) +
        Math.pow(p1.y - p2.y, 2)
    );
}

function getMidpoint(p1, p2) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    };
}

function onResults(results) {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;

    canvasCtx.save();

    canvasCtx.translate(canvasElement.width, 0);
    canvasCtx.scale(-1, 1);

    canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
    );

    if (results.poseLandmarks) {
        const landmarks = results.poseLandmarks;

        const pLEar = {
            x: landmarks[7].x * canvasElement.width,
            y: landmarks[7].y * canvasElement.height
        };

        const pREar = {
            x: landmarks[8].x * canvasElement.width,
            y: landmarks[8].y * canvasElement.height
        };

        const pLShoulder = {
            x: landmarks[11].x * canvasElement.width,
            y: landmarks[11].y * canvasElement.height
        };

        const pRShoulder = {
            x: landmarks[12].x * canvasElement.width,
            y: landmarks[12].y * canvasElement.height
        };

        const midpointEar = getMidpoint(pLEar, pREar);
        const midpointShoulder = getMidpoint(pLShoulder, pRShoulder);

        const currentNeckLength = calculateDistance(
            midpointEar,
            midpointShoulder
        );

        if (requestCalibration) {
            baselineNeckLength = currentNeckLength;
            isCalibrated = true;
            requestCalibration = false;
            hp = 100;

            hpBar.style.width = "100%";
            txtHp.innerText = "100";

            statusPostura.innerText =
                "Postura calibrada! Mantenha-se confortável.";
        }

        if (isCalibrated && !gameOver) {
            const neckRatio =
                currentNeckLength / baselineNeckLength;

            if (neckRatio < 0.85) {
                skeletonColor = "#ff0000";
                hp -= 0.5;
                statusPostura.innerText = "⚠ Postura inadequada";
            } else if (neckRatio < 0.92) {
                skeletonColor = "#ffff00";
                hp -= 0.2;
                statusPostura.innerText =
                    "⚠ Atenção à sua postura";
            } else {
                skeletonColor = "#00ff00";
                hp += 0.3;
                statusPostura.innerText = "✓ Boa postura";
            }

            hp = Math.max(0, Math.min(100, hp));

            hpBar.style.width = hp + "%";
            txtHp.innerText = Math.round(hp);

            if (hp <= 0) {
                gameOver = true;
                txtGameOver.style.display = "block";
                statusPostura.innerText =
                    "Sua postura precisa de uma pausa.";
            }
        }

        drawConnectors(
            canvasCtx,
            landmarks,
            POSE_CONNECTIONS,
            {
                color: skeletonColor,
                lineWidth: 4
            }
        );
    }

    canvasCtx.restore();
}

const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }
});

pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

pose.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await pose.send({
            image: videoElement
        });
    },
    width: 1280,
    height: 720
});

camera.start();