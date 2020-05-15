var password = document.querySelector("input[name='password']")
password.addEventListener('keydown',validatePassword);

function validatePassword (){
    console.log("Inside function")
    var value = password.value
    console.log(value)
    var barLevel = document.getElementById('strengthBar')
    console.log(barLevel)
    // var level = {
    //     0:"Bad",
    //     1:"Weak",
    //     2:"Okay",
    //     3:"Good",
    //     4:"Strong"
    // }
    var score = 0;
    if(value.match(/[a-z][a-z]+/)){
        score+=1;
        console.log('Check 1 done')
    }
    if (value.match(/[A-Z]+/)){
        score+=1;
        console.log('Check 2 done')
    }
    if (value.match(/[!"#$%&'()*+,-./:;<=>?@^_`~]+/)){
        score+=1;
        console.log('Check 3 done')
    }
    if(value.match(/[0-9]+/)){
        score+=1;
        console.log('Check 4 done')
    }
    if (value.length > 7 ){
        score +=1;
        console.log('Check 5 done')
    }
    console.log(`The password score is:${score}`)
    barLevel.value = score
}
debugger;