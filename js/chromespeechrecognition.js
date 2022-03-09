class ChromeSpeechRecognition {
    /**
     * @param {array} myphrases
     */    
    constructor(myphrases){
        this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.SpeechRecognition.continuous = true
        this.SpeechRecognition.interimResults = true
        this.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
        this.SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
        this.recognition = new this.SpeechRecognition()
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.speechRecognitionList = new this.SpeechGrammarList();
        this.onresultHandler = null // function(phrase, confidence)
        this.diagnostic = ''
        this.phrases = myphrases
        this.grammarPrefix = '#JSGF V1.0; grammar phrase; public <phrase> = '
        let grammar = this.grammarPrefix + this.phrases.join(' | ') + ' ;'
        this.speechRecognitionList.addFromString(grammar, 1);
        this.recognition.grammars = this.speechRecognitionList;    
        
        var self = this

        this.recognition.onresult = function(event) {
           
            // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
            // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
            // It has a getter so it can be accessed like an array
            // The first [0] returns the SpeechRecognitionResult at the last position.
            // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
            // These also have getters so they can be accessed like arrays.
            // The second [0] returns the SpeechRecognitionAlternative at position 0.
            // We then return the transcript property of the SpeechRecognitionAlternative object
            var phrase = event.results[0][0].transcript
            var confidence = event.results[0][0].confidence
            self.diagnostic = 'Result received: ' + phrase + '.' + ' Confidence: ' + confidence;

            if (typeof self.onresultHandler === 'function'){
                self.onresultHandler(phrase, confidence)
            } 
          }

          this.recognition.onend = function(){
            self.recognition.start();
          }
          this.recognition.onstart = function(){
              console.log('Litening: speak into the microphone')
          }
          
          this.recognition.onspeechend = function() {
            self.recognition.stop();
          }
          
          this.recognition.onnomatch = function(event) {
            //self.recognition.stop();
            self.diagnostic = "I didn't recognise that phrase.";
            console.log(self.diagnostic)
          }
          
          this.recognition.onerror = function(event) {
            //self.recognition.stop();
            self.diagnostic = 'Error occurred in recognition: ' + event.error;
            console.log(self.diagnostic)
          }   
          
          this.recognition.start()
    }

    /**
     * @param {(arg0: string, arg1: int) => void} func
     */
    set onresult(func){
        if (! (typeof func === 'function')) return
        this.onresultHandler = func
    }
    get diagnosticText(){
        return this.diagnostic
    }

    /**
     * @param {array} arr
     */
    addPhrases(arr){
        this.phrases.concat(arr)
        let grammar = this.grammarPrefix + this.phrases.join(' | ') + ' ;'
        this.speechRecognitionList.addFromString(grammar, 1);
        this.recognition.grammars = this.speechRecognitionList;        
    }
    /**
     * @param {string} phrase
     */    
    addPhrase(phrase){
        this.phrases.push(phrase)
        let grammar = this.grammarPrefix + this.phrases.join(' | ') + ' ;'
        this.speechRecognitionList.addFromString(grammar, 1);
        this.recognition.grammars = this.speechRecognitionList;           
    }

    clearPhrases(){
        this.phrases = []
    }

    recognitionStart(){
        this.recognition.start()
    }

    recognitionStop(){
        this.recognition.stop()
    }     
}