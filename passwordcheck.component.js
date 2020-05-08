var password = document.querySelector("input[name='password']")
password.addEventListener('input',validatePassword(password.value));
console.log("In JS");
function validatePassword (value){
    console.log("Inside function")
    var barLevel = document.getElementById('strengthBar')
    console.log(barlevel)
    var level = {
        0:"Bad",
        1:"Weak",
        2:"Okay",
        3:"Good",
        4:"Strong"
    }
    var score = 0;
    if(value.match(/[a-zA-Z0-9][a-zA-Z0-9]+/)){
        score+=1;
    }
    if (password.match(/[~<>?]+/)){
        score+=1;
    }
    if (password.match(/[!@#$%^&*()-=_+]+/)){
        score+=1;
    }
    if (value.length > 6 ){
        score +=1;
    }
    console.log(`The password score is:${score}`)
    barLevel.value = score
}