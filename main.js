song1="";
song2="";

leftWristX=0;
rightWristX=0;

leftWristY=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
song1=loadSound("jaga.mp3");

song2=loadSound("beliver.mp3");
}

function setup(){
canvas=createCanvas(600,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotposes);
}

function modelLoaded(){
    console.log("Model is loaded!");
}

function gotposes(results){
if(results.length>0){
    console.log(results);
leftWristX=results[0].pose.leftWrist.x;

leftWristY=results[0].pose.leftWrist.y;

rightWristX=results[0].pose.rightWrist.x;

rightWristY=results[0].pose.rightWrist.y;

console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

scoreRightWrist=results[0].pose.keypoints[10].score;

scoreLeftWrist=results[0].pose.keypoints[9].score;
}
}

function draw(){
image(video,0,0,600,400);

fill("#FF0000");
stroke("#FF0000");
if(scoreLeftWrist>0.2){
    circle(leftWristX, leftWristY, 20);
    song1.play();
    song1.setVolume(0.5);
    song2.stop();
    document.getElementById("song_name").innerHTML="Song Name - Playing Rakita Rakita";
}

if(scoreRightWrist>0.2){
    circle(rightWristX, rightWristY, 20);
    song2.play();
    song2.setVolume(0.5);
    song1.stop();
    document.getElementById("song_name").innerHTML="Song Name - Playing Beliver";
}
}
