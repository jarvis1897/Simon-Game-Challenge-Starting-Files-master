var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).animate({opacity: 0.5}).fadeOut(100).fadeIn(100).animate({opacity: 1});
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    level += 1;
    $("h1").html("Level "+level);

}

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

var started = false;

var level = 0;

$(document).on("keydown", function(){
    if(started === false){
        started = true;
        nextSequence();
    }    
});

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart!");
        setTimeout(() => {
            startOver();
        }, 100);
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
