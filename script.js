let canvas;

let classifier;

let synth;

function setup() {
    canvas = createCanvas(400, 300);
    canvas.parent("canvas-container");
    background("white");
    classifier = ml5.imageClassifier("DoodleNet", modelReady);
    synth = window.speechSynthesis;
    canvas.mouseReleased(classifyCanvas);
}
function modelReady() {
    console.log("Model loaded.");
}
function cleanCanvas() {
    background("white");
}
function draw() {
    strokeWeight(8);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}
function gotResults(error, results) {
    if (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
        return;
    } else {
        document.getElementById("object_name").innerHTML = `Object Name: ${results[0].label}`;
    }
    let utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}