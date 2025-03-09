
var userClickedPattern=[];
var gamePattern =[];
var buttonColours = ["green","red","yellow","blue"];
var level =0;
var started =false;

$(document).keydown(function(){
    if(!started){
        started=true;
        $("#level-title").html("Level "+level);
        nextSequence();
    }
})



function nextSequence(){
    level++;
    $("#level-title").html("Level "+level);


    var randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
    
            userClickedPattern = [];
        }
        
    }
    else{
        console.log(gamePattern);
        console.log(userClickedPattern);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    userClickedPattern=[];
    level=0;
    gamePattern=[];
    started =false;
}