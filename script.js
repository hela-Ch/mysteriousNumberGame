let numberToFind  ;
let countElement = document.getElementById("counter");
let count = countElement.innerHTML;
//function to generate random number 
function generateRandomNumber(minValue,maxValue){
    let randomNumber =Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    return randomNumber;

}
//function to display a modal if success
function showBoxSuccess(note,essaies){
    const successBox = document.getElementById("modalResult");
    successBox.style.display = "block";
    document.getElementById("note").innerHTML = note;
    document.getElementById("score").innerHTML  =  `nombre d'essais : ${essaies}`;

}
// when user choose a difficulty level this function will determinate the min and max values and choose a random number
// if user didn't choose a difficulty level , the game will set the difficulty "easy" by default
function setDifficultyLevel(){
    let max,min,levelCheked;
    const levels = document.getElementsByName("difficulty");
    document.getElementById("modalBox").style.display = "none";

    for(const level of levels){
         level.checked ? levelCheked = level.id :null ;
    }

    switch (levelCheked){
        case "easy":  [min,max] =[1,10];
        break;
        case "medium" : [min,max] = [1,20];
        break; 
        case "difficult"  : [min,max] =[1,50];
        break; 
        default :    [min,max] =[1,10];
        break;    
    }
    numberToFind = generateRandomNumber(min,max);
    console.log(`min ${min}` );
    console.log(`max ${max}`);
   
    console.log(`numberToFind ${numberToFind}`);

}

//function to give a note to the user depending on number of tries
function giveNote ( numberOfTries){
    let message ='';
    if(numberOfTries  < 5){
        message ="Super bravo";

    }else if( numberOfTries>= 5 && numberOfTries <= 10){
        message = "Pas mal";

    }else if ( numberOfTries >= 11 && numberOfTries<= 15){
        message = "Peut mieux faire";

    }else{
        message= "Nul";

    }
    return message;

}
let prevNumber ;
//function to check equality and display a message to the user if he win or loose
function checkedEquality (event){
    event.preventDefault();
    const regex = /^[1-9][0-9]?$/;
     if(regex.test(document.getElementById("userInput").value)){
    let userInput = parseInt(document.getElementById("userInput").value);
    let message ;
    count ++ ;
    countElement.innerHTML = count;
    
    console.log(`userInput ${userInput}`);
    if(userInput === numberToFind){
        message = giveNote(count);
        showBoxSuccess(message,count);
          
    }else{
        message= "try again";
        if(count >= 2){
            console.log(`prevNumber ${prevNumber}`);
            message = Math.abs(numberToFind- prevNumber) >= Math.abs(numberToFind- userInput ) ? "tu chauffes" : "tu refroidis";
        }
        prevNumber = userInput;
    }
    document.getElementById("userInput").value = "";
    console.log(`count ${count}`);
    displayResult(message);
    }}

 // when users clickes the help button
 function getHelp(event){
     event.preventDefault();
     const userInput = document.getElementById("userInput").value;
     //we verify if there is a value or not
     let info;
     if (userInput && !isNaN(userInput)) { 
         if(parseInt(userInput) > numberToFind ){
             info = "plus petit";
         }else if (parseInt(userInput) < numberToFind ) {
             info = "plus grand";
         }else if (parseInt(userInput) == numberToFind ){
             info = "égale";
         }
         info = "le nombre mystére est "+ info;
     }else{
        info = "entrez un nombre avant";
 
    } 
    document.getElementById("resultImage").src="https://media.giphy.com/media/U7bo3ZBR8lcKSmGdlT/giphy.gif";
    document.getElementById("resultText").innerHTML =  info;
    
}    



 //close box of difficulty's choice
 function boxModelClose(){
     setDifficultyLevel();
     document.getElementById("modalBox").style.display= "none";
 }
 //validation of user input(only numbers )
 function validatioInput(event){
     const regex = /^[1-9][0-9]?$/;
     regex.test(event.target.value) ? document.getElementById("invalidInput").style.display = "none" : document.getElementById("invalidInput").style.display = "block";
     return regex.test(event.target.value) ;

 }

 //display a message if the input and mystery number not equals
 function displayResult(text){
    const resultImage = document.getElementById("resultImage");
    const resultText = document.getElementById("resultText");
    switch (text){
        case "try again" : 
               {
                resultImage.src ="https://media.giphy.com/media/dry8S89ncvPMrmgwvr/giphy.gif";
                resultText.innerHTML = "Try Again";
                }
        break;
        case "tu chauffes" :
               {
                resultImage.src ="https://media.giphy.com/media/26FL3uMhARSAvIZZS/giphy.gif";
                resultText.innerHTML = "Tu chauffes";
                }
        break;
        case "tu refroidis" : 
               {
                resultImage.src ="https://media.giphy.com/media/giFLHb8U7IhLgvB6wC/giphy.gif";
                resultText.innerHTML = "Tu refroidis";
                }
        break;
    }

 }
