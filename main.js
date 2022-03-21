function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status : Detecting Objects";
}
status = "";
img = "";
objects = [];

function preload() {
    img = loadImage("https://thumbs.dreamstime.com/b/street-view-above-private-cars-taxi-cabs-working-people-kolkata-india-busy-city-kolkata-has-density-vehicles-42764000.jpg");
}
function draw() {
    image(img, 0, 0, 640, 420);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status : Objects Detected";

            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function modelLoaded() {
    console.log('Model Loaded!');
    status = true;
    objDetect.detect(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects=results;
    }
}