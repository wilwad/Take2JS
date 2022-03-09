/* Testing ES6 class */
class test {
    constructor(){
        this.arr = [1,2]
    }

    set  vals(els){
        this.arr = els
    }

    get vals(){
        return this.arr
    }
}

//let x = new test();
//console.log(x.vals)
//x.vals = [2,3]
//console.log(x.vals)
var phrases = 'orange|yellow|blue|green|red|black|white|pink|gold|magenta|close|full screen'.split('|')
var recog = new ChromeSpeechRecognition(phrases)
recog.onresult = function(phrase, confidence){
    phrase = phrase.toLowerCase()
    console.log('I heard you say', phrase)
    if (phrases.indexOf(phrase) > -1) 
        if (phrase == 'close') 
            window.close()
        else if (phrase == 'full screen')
            openFullscreen(document.body)
        else
            document.body.style.backgroundColor = phrase
    else
        console.log('unrecognized phrase', phrase)    
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Swipe left/right on Tinder using speechrecognition */
var phrases = ['like','dislike']
var recog = new ChromeSpeechRecognition(phrases)
recog.onresult = function(phrase, confidence){
    phrase = phrase.toLowerCase()
    console.log('I heard you say', phrase)
    if (phrases.indexOf(phrase) > -1) 
        switch (phrase){
            case 'like':
                document.querySelector('button[data-testid="gamepadLike"]').click()
                break;
                
            case 'dislike':
                document.querySelector('button[data-testid="gamepadDislike"]').click()
                break;
        }
    else
        console.log('unrecognized phrase', phrase)    
}
/* Swipe left/right on Tinder using speechrecognition */
var phrases = ['yes', 'no'];

var recog = new ChromeSpeechRecognition(phrases)
recog.onresult = function(phrase, confidence){
    phrase = phrase.toLowerCase()
    console.log('I heard you say', phrase)
    if (phrases.indexOf(phrase) > -1) 
        switch (phrase){
            case 'yes':
                document.querySelector('button[data-testid="gamepadLike"]').click()
                break;
                
            case 'no':
                document.querySelector('button[data-testid="gamepadDislike"]').click()
                break;
        }
    else
        console.log('unrecognized phrase', phrase)    
}

/* Flipboard.com scroll up or down */
var phrases = ['up', 'down'];
document.querySelector('html').style.scrollBehavior = "smooth";
var recog = new ChromeSpeechRecognition(phrases)
recog.onresult = function(phrase, confidence){
    phrase = phrase.toLowerCase()
    console.log('I heard you say', phrase)
    if (phrases.indexOf(phrase) > -1) 
        switch (phrase){
            case 'up':
                document.documentElement.scrollTop +=250;
                break;
                
            case 'down':
                document.documentElement.scrollTop -=250;
                break;
        }
    else
        console.log('unrecognized phrase', phrase)    
}