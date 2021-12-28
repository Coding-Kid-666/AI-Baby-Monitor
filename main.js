current_status = "";
objects = [];

song = "";

function preload(){
    song = loadSound('music.mp3');
}

function setup(){
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects...";

}

function draw(){
    image(video, 0, 0, 400, 300);
    object_Detector.detect(video, gotResults);
    if(current_status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status:Objects detected.";
            document.getElementById("recogniser").innerHTML = "Detector has detected objects.";
            percent = floor(objects[i].confidence * 100);
            stroke("ff0000");
            fill("#ff0000");
            text(objects[i].label + " " + percent + "%", objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#13fc03");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person"){
                song.stop();
                document.getElementById("recogniser").innerHTML = 'Baby/Person detected.';
            } else {
                song.play();
                song.loop();
               document.getElementById("recogniser").innerHTML = 'Baby/Person not detected.';
            }
        }
    }
}

function modelLoaded(){
    console.log("The model 'CocoSSD' is succesfully initialized.");
    current_status = true;
}

function gotResults(error,results){
    if(error){
        console.error();
        document.getElementById("recogniser").innerHTML = "Error_Code:2271. Check console for details.";
    }else{
        console.log(results);
        objects = results;
    }
}