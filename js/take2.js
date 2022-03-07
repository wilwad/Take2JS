'use strict' ;
class take2 {
    constructor(divPlayer1, divDeck, divPlayer2) {

        this.cards = null
        this.players = null
        this.totalCards = 52
        this.halfCards = this.totalCards / 2

        this.player1 = divPlayer1
        this.deck = divDeck
        this.player2 = divPlayer2
        
        this.currentcard = null
        this.turn_is_human = true // first player human
        this.maxStartCards = 5
        this.timerId = 0
        this.speedPC = 3000
        this.game_is_over = false
        this.deckClickable = null;
        this.allowHighlightValidCards = false

        // preload the sounds. 
        // so then we can play using this.audio.error.play()
        this.audio = {
                        'swipe': new Audio('audio/swipe.mp3'),
                        'error': new Audio('audio/error.mp3'),
                        'click': new Audio('audio/click.mp3'),
                        'fail': new Audio('audio/fail.mp3'),
                        'success': new Audio('audio/success.mp3'),
                        'unsuccessful': new Audio('audio/unsuccessful.mp3'),
                        'robot': new Audio('audio/robot.mp3'),
                        'ding': new Audio('audio/ding.mp3')
                    }

        this.characters = { PC: 0, Deck: 1, Human: 2 }
        this.textures = ['textures/wood1.webp']
        //this.deck.style.background = "url("+this.textures[0]+")";

        this.players = [
                            [] /*PC cards */,
                            [] /*Deck cards */,
                            [] /*Human cards*/
                        ]

        /** 
         * used bash to generate this list
         * for png in *.png; 
         * do 
         * echo "{image:'$png', taken: false, preload: this.loadImage('$png') },"
         * done
        */
        this.cards = [
            { image: '10_of_clubs.png', taken: false, preload: this.loadImage('cards/10_of_clubs.png') },
            { image: '10_of_diamonds.png', taken: false, preload: this.loadImage('cards/10_of_diamonds.png') },
            { image: '10_of_hearts.png', taken: false, preload: this.loadImage('cards/10_of_hearts.png') },
            { image: '10_of_spades.png', taken: false, preload: this.loadImage('cards/10_of_spades.png') },
            { image: '2_of_clubs.png', taken: false, preload: this.loadImage('cards/2_of_clubs.png') },
            { image: '2_of_diamonds.png', taken: false, preload: this.loadImage('cards/2_of_diamonds.png') },
            { image: '2_of_hearts.png', taken: false, preload: this.loadImage('cards/2_of_hearts.png') },
            { image: '2_of_spades.png', taken: false, preload: this.loadImage('cards/2_of_spades.png') },
            { image: '3_of_clubs.png', taken: false, preload: this.loadImage('cards/3_of_clubs.png') },
            { image: '3_of_diamonds.png', taken: false, preload: this.loadImage('cards/3_of_diamonds.png') },
            { image: '3_of_hearts.png', taken: false, preload: this.loadImage('cards/3_of_hearts.png') },
            { image: '3_of_spades.png', taken: false, preload: this.loadImage('cards/3_of_spades.png') },
            { image: '4_of_clubs.png', taken: false, preload: this.loadImage('cards/4_of_clubs.png') },
            { image: '4_of_diamonds.png', taken: false, preload: this.loadImage('cards/4_of_diamonds.png') },
            { image: '4_of_hearts.png', taken: false, preload: this.loadImage('cards/4_of_hearts.png') },
            { image: '4_of_spades.png', taken: false, preload: this.loadImage('cards/4_of_spades.png') },
            { image: '5_of_clubs.png', taken: false, preload: this.loadImage('cards/5_of_clubs.png') },
            { image: '5_of_diamonds.png', taken: false, preload: this.loadImage('cards/5_of_diamonds.png') },
            { image: '5_of_hearts.png', taken: false, preload: this.loadImage('cards/5_of_hearts.png') },
            { image: '5_of_spades.png', taken: false, preload: this.loadImage('cards/5_of_spades.png') },
            { image: '6_of_clubs.png', taken: false, preload: this.loadImage('cards/6_of_clubs.png') },
            { image: '6_of_diamonds.png', taken: false, preload: this.loadImage('cards/6_of_diamonds.png') },
            { image: '6_of_hearts.png', taken: false, preload: this.loadImage('cards/6_of_hearts.png') },
            { image: '6_of_spades.png', taken: false, preload: this.loadImage('cards/6_of_spades.png') },
            { image: '7_of_clubs.png', taken: false, preload: this.loadImage('cards/7_of_clubs.png') },
            { image: '7_of_diamonds.png', taken: false, preload: this.loadImage('cards/7_of_diamonds.png') },
            { image: '7_of_hearts.png', taken: false, preload: this.loadImage('cards/7_of_hearts.png') },
            { image: '7_of_spades.png', taken: false, preload: this.loadImage('cards/7_of_spades.png') },
            { image: '8_of_clubs.png', taken: false, preload: this.loadImage('cards/8_of_clubs.png') },
            { image: '8_of_diamonds.png', taken: false, preload: this.loadImage('cards/8_of_diamonds.png') },
            { image: '8_of_hearts.png', taken: false, preload: this.loadImage('cards/8_of_hearts.png') },
            { image: '8_of_spades.png', taken: false, preload: this.loadImage('cards/8_of_spades.png') },
            { image: '9_of_clubs.png', taken: false, preload: this.loadImage('cards/9_of_clubs.png') },
            { image: '9_of_diamonds.png', taken: false, preload: this.loadImage('cards/9_of_diamonds.png') },
            { image: '9_of_hearts.png', taken: false, preload: this.loadImage('cards/9_of_hearts.png') },
            { image: '9_of_spades.png', taken: false, preload: this.loadImage('cards/9_of_spades.png') },
            { image: 'ace_of_clubs.png', taken: false, preload: this.loadImage('cards/ace_of_clubs.png') },
            { image: 'ace_of_diamonds.png', taken: false, preload: this.loadImage('cards/ace_of_diamonds.png') },
            { image: 'ace_of_hearts.png', taken: false, preload: this.loadImage('cards/ace_of_hearts.png') },
            { image: 'ace_of_spades.png', taken: false, preload: this.loadImage('cards/ace_of_spades.png') },
            { image: 'jack_of_clubs.png', taken: false, preload: this.loadImage('cards/jack_of_clubs.png') },
            { image: 'jack_of_diamonds.png', taken: false, preload: this.loadImage('cards/jack_of_diamonds.png') },
            { image: 'jack_of_hearts.png', taken: false, preload: this.loadImage('cards/jack_of_hearts.png') },
            { image: 'jack_of_spades.png', taken: false, preload: this.loadImage('cards/jack_of_spades.png') },
            { image: 'king_of_clubs.png', taken: false, preload: this.loadImage('cards/king_of_clubs.png') },
            { image: 'king_of_diamonds.png', taken: false, preload: this.loadImage('cards/king_of_diamonds.png') },
            { image: 'king_of_hearts.png', taken: false, preload: this.loadImage('cards/king_of_hearts.png') },
            { image: 'king_of_spades.png', taken: false, preload: this.loadImage('cards/king_of_spades.png') },
            { image: 'queen_of_clubs.png', taken: false, preload: this.loadImage('cards/queen_of_clubs.png') },
            { image: 'queen_of_diamonds.png', taken: false, preload: this.loadImage('cards/queen_of_diamonds.png') },
            { image: 'queen_of_hearts.png', taken: false, preload: this.loadImage('cards/queen_of_hearts.png') },
            { image: 'queen_of_spades.png', taken: false, preload: this.loadImage('cards/queen_of_spades.png') }
        ]

        // give PC its cards
        this.getCard(this.characters.PC, this.maxStartCards)

        // give Human his cards
        this.getCard(this.characters.Human, this.maxStartCards)

        // give deck its cards
        var nottaken = this.cardsAvailable()
        for (var idx = 0; idx < nottaken.length; idx++) {
            let card = nottaken[idx]
            this.players[this.characters.Deck].push(card)
        }

        // the deck-clickable card
        var div = document.createElement('div')
        this.deckClickable = div
        div.style.background = "url(cards/off/back@2xdeck.png) no-repeat"
        div.style.backgroundSize = 'cover'
        div.classList.add('deck')
        div.style.position = 'absolute' // left aligned
        div.addEventListener('dblclick', () => {

            if (!this.turn_is_human) {
                this.queueAudio(this.audio.unsuccessful)
                console.log("Not your turn!")
                return
            }
            this.getCard(this.characters.Human, 1)
            this.setPlayerTurn(this.characters.PC)

        }, false)
        this.deck.appendChild(div)

        // get a random card from the deck as the Start card
        var card = this.getRandomCard()
        var div = document.createElement('div')
        card.taken = true
        div.style.background = "url(cards/" + this.shortenPreloadedImageUrl(card.preload.src) + ") white no-repeat"
        div.style.backgroundSize = 'contain'
        div.style.position = 'relative' // right-aligned
        div.style.left = '200px'
        div.classList.add( 'deck' )
        div.addEventListener('click', () => this.queueAudio(this.audio.error), false)
        this.deck.appendChild( div )
        this.currentcard = div // current card on deck

        // human's turn to play
        this.setPlayerTurn(this.characters.Human)
        var self = this
        this.timerId = window.setInterval(() => { 
            self.handlerPlayerPC()
            self.highlightValidCards()
        }, this.speedPC)
        this.dumpStats()
    } // constructor

    get highlightOKcards(){
        return this.allowHighlightValidCards
    }
    set highlightOKcards(yesno){
        this.allowHighlightValidCards = yesno
    }

    highlightValidCards (){
        if (! this.allowHighlightValidCards) return

        // what is the current card
        var c = this.getPropsFromBgImage(this.currentcard.style.backgroundImage);
        var cnum = c.number;
        var ctype = c.type;
        
        // what cards does human have ?
        var divs = document.querySelectorAll('div#player2 > div')

        for (var idx = 0; idx < divs.length; idx++) {
            let div = divs[idx];
            var t = this.getPropsFromBgImage(div.style.backgroundImage);
            var num1 = t.number;
            var type1 = t.type;

            if (num1 == cnum || ctype == type1 || num1 == '8') {
                div.classList.add('hint')
            } else {
                div.classList.remove('hint')
            }
        }        
    }

    randomInt (max) {
        return Math.floor(Math.random() * max);
    };

    getRandomCard () {
        if ( !this.cardsAvailable().length ) this.resetDeck()

        return this.cardsAvailable()[this.randomInt(nottaken.length)]
    }

    queueAudio ( audio ) {
        try {
            audio.play()

        } catch (e) {
            // does not help
            console.log('Exception', e.message)
        }
    };

    cardsAvailable () {
        var nottaken = this.cards.filter(el => el.taken == false)
        return nottaken
    }

    removeCard ( arr, background, moveToDeck ) {
        var match = background.replace('url("cards/', '').replace('")', '')
        var foundIdx = -1
        for (var idx = 0; idx < arr.length; idx++) {
            if ( arr[idx].image == match ) {
                foundIdx = idx
                break
            }
        }
        
        if ( foundIdx > -1 ) {
            var card = arr.splice( foundIdx, 1 ) // remove the card from arr
            if (moveToDeck) {
                this.players[ this.characters.Deck ].push( card[0] ) // move card to deck, not the array!
            }
        }
    };

    checkTicket () {
        /*
         * When a player has 1 card let, they shout ticket!
         * But they cannot end the game if that last card is ace, 2, 7 , 8, jack
         */
        this.player1.classList.remove('blink')
        this.player2.classList.remove('blink')

        if ( this.players[this.characters.PC].length == 1 ) {
            this.player1.classList.add('blink')

            var card = this.players[this.characters.PC][0]
            var num = this.getPropsFromBgImage(this.shortenPreloadedImageUrl(card.preload.src)).number

            switch (num) {
                case 'ace':
                case '2':
                case '7':
                case '8':
                case 'jack':
                    this.getCard(this.characters.PC, 1)
                    this.queueAudio(this.audio.ding)
                    console.log('PC had last card', num, 'as last card: got a new card!')
                    break
            }
        }

        if ( this.players[this.characters.Human].length == 1) {
            this.player2.classList.add('blink')

            var card = this.players[this.characters.Human][0]
            var num = this.getPropsFromBgImage(this.shortenPreloadedImageUrl(card.preload.src)).number;

            switch (num) {
                case 'ace':
                case '2':
                case '7':
                case '8':
                case 'jack':
                    this.getCard(this.characters.Human, 1)
                    this.queueAudio(this.audio.ding)
                    console.log('Human had last card', num, 'as last card: got a new card!')
                    break
            }
        }
    };

    resetDeck () {
        // make deck cards available for play
        for (var idx = 0; idx < this.players[this.characters.Deck].length; idx++) {
            // find this card in this.cards then set taken = false
            let card = this.players[this.characters.Deck][idx]

            for (var idy = 0; idy < this.cards.length; idy++) {
                if (this.cards[idy].image == this.shortenPreloadedImageUrl(card.preload.src)) {
                    this.cards[idy].taken = false
                    break
                }
            }

            card.taken = false
        }
        var ava = this.cardsAvailable()
        for (var idx = 0; idx < ava.length; idx++)
            console.log(ava[idx])
    }

    checkWinner () {
        if (this.game_is_over) return

        if (!this.players[this.characters.PC].length) {
            this.queueAudio(this.audio.success)
            this.game_is_over = true
            window.clearInterval( this.timerId)
            alert("PC has won!")
            window.location.reload()
            return
        }

        if (!this.players[this.characters.Human].length) {
            this.queueAudio(this.audio.success)
            this.game_is_over = true
            window.clearInterval( this.timerId)
            alert("Human has won!")
            window.location.reload()
            return
        }
    }

    dumpStats () {
        console.clear()
        console.log('Current card', this.currentcard.style.backgroundImage )
        console.log('cardsAvailable:', this.cardsAvailable().length)

        for (var idx = 0; idx < this.players.length; idx++) {
            console.log(['PC', 'Deck', 'Human'][idx], this.players[idx].length)

            for (var idy = 0; idy < this.players[idx].length; idy++)
                console.log((idy + 1), this.players[idx][idy])
        }
    }

    getCard (player, numberOfCards) {
        if (!this.cardsAvailable().length) {
            console.log('No cards available, restoring the deck')
            this.resetDeck()
        }

        if ( this.cardsAvailable().length <= this.halfCards) {
            console.log('Cards available less than half restoring the deck')
            this.resetDeck()
        }

        // get 2 cards off the deck
        for (var idx = 0; idx < numberOfCards; idx++) {
            var card = this.getRandomCard()

            if (!card) {
                alert("Error: could not get a card. Restarting game!");
                window.location.reload()
                return
            }

            // remove the card from the deck
            this.removeCard(this.players[this.characters.Deck], this.shortenPreloadedImageUrl(card.preload.src))

            card.taken = true

            this.players[player].push(card)
            let div = document.createElement('div')

            console.log('Preload', this.shortenPreloadedImageUrl(card.preload.src))
            this.setTooltip(div, this.shortenPreloadedImageUrl(card.preload.src))

            if (player == this.characters.PC) {
                div.style.background = "url(cards/off/back@2x.png) #fff no-repeat"
                // hidden image
                div.setAttribute('actualBackgroundImage', this.shortenPreloadedImageUrl(card.preload.src))

                div.style.backgroundSize = 'cover'
                div.classList.add('player1')
                this.player1.appendChild(div)

            } else {
                div.style.background = "url(cards/" + this.shortenPreloadedImageUrl(card.preload.src) + ") #fff no-repeat"
                div.style.backgroundSize = 'contain'
                div.classList.add('player2')

                // attach click events
                div.addEventListener('dblclick', () => this.handlerPlayerHuman(div), false);

                // human new cards appear on the left
                this.player2.insertBefore(div, this.player2.firstElementChild)
            }

            this.queueAudio(this.audio.click)
        } // for

        this.checkTicket()
    };

    setPlayerTurn (currentPlayer) {

        this.player1.classList.remove('turn')
        this.player2.classList.remove('turn')

        if (currentPlayer == this.characters.PC) {
            this.player1.classList.add('turn')
            this.turn_is_human = false
        } else {
            this.player2.classList.add('turn')
            this.turn_is_human = true
        }
    };

    // input : 6_of_diamonds.png output: number=>6, type=>diamonds
    getPropsFromBgImage (image) {
        // sometimes image = "cards/card.png" so remove "cards/""
        var buff = image.indexOf('/') > -1 ? image.split('/')[1] : image
        var c1 = buff.split('of')
        var num = c1[0].replace('_', '')
        var type = c1[1].replace('_', '').replace(')', '')

        type = type.replace('.png', '').replace('"', '')
        num = num.replace('"', '')

        return { 'number': num, 'type': type }
    }

    /* put hints for certain cards as tool tips on hover
     * ace -- can't die with ace 2,7,8,jack
     * 2 -- Give 2 cards
     * 7, jack -- play again
     * 8 -- change face
     */
    setTooltip (div, image) {
        var n = this.getPropsFromBgImage(image).number
        switch (n) {
            case 'ace':
                div.title = "You cannot be left with this card"
                break
                
            case '2':
                div.title = "Give your opponent 2 cards"
                break
                
            case '8':
                div.title = "Change the current card on the deck to this card"
                break
                
            case '7':
            case 'jack':
                div.title = "Play once more"
                break
        }
    }
    
    loadImage (src) {
        var img = new Image()
        img.load = ()=>{
            console.log('loadedImage done', this.src)
        }
        img.src = src
        return img
    }

    // http://domain.com/take2/cards/6_of_hearts.png => 6_of_hearts.png
    shortenPreloadedImageUrl (url) {
        var idx = url.lastIndexOf('/')
        url = url.substr(idx + 1)
        console.log('shortenPreloadedImageUrl', url)
        return url
    }

    // PC playing
    handlerPlayerPC () {
        if ( this.turn_is_human ) {
            //this.queueAudio( this.audio.unsuccessful )
            console.log("Not your turn PC!")
            return
        }

        // what is the current card
        var c = this.getPropsFromBgImage(this.currentcard.style.backgroundImage)
        var cnum = c.number
        var ctype = c.type
        var validCards = []

        // what cards does PC have on hand
        var divs = document.querySelectorAll('div#player1 > div')

        for (var idx = 0; idx < divs.length; idx++) {
            let div = divs[idx]
            var t = this.getPropsFromBgImage(div.getAttribute('actualBackgroundImage'))
            var num1 = t.number
            var type1 = t.type

            if (num1 == cnum || ctype == type1) {
                switch (num1){
                    case '2':
                    case '7':
                    case 'jack':
                        validCards.unshift( div )  // add to front
                        break

                    default:
                        validCards.push(div) // normal add to end
                }
                
            }
        }

        if ( !validCards.length) {
            console.log('PC had no valid card to play', this.players[this.characters.PC].length)
            // pick a card
            this.getCard(this.characters.PC, 1)
            this.queueAudio(this.audio.error)
            this.setPlayerTurn(this.characters.Human)

        } else {
            // play a card from the valid ones
            let div = validCards.shift() //validCards[this.randomInt(validCards.length)]

            // set the real image behind the hidden image as card to be played
            let image = "url(cards/" + div.getAttribute('actualBackgroundImage') + ")"
            this.currentcard.style.backgroundImage = image
            div.style.backgroundImage = image

            // add to deck = true
            this.removeCard(this.players[this.characters.PC],  div.style.backgroundImage, true)
            this.player1.removeChild(div)
            this.queueAudio(this.audio.robot)
            console.log('PC has played card', div.style.backgroundImage, this.players[this.characters.PC].length, 'cards left')

            // if the last card I played was 2, 7, ace
            var num = this.getPropsFromBgImage(image).number

            switch (num) {
                case '2':
                    this.getCard(this.characters.Human, 2)
                    this.queueAudio(this.audio.fail)
                    console.log('PC still playing!')
                    break

                case '7':
                case 'jack':
                    // play again
                    console.log('*********** PC playing again')
                    break

                default:
                    this.setPlayerTurn(this.characters.Human)
            }
        }

        this.checkTicket()
        this.checkWinner()
        this.dumpStats()
    }// handlePlayerPC

    handlerPlayerHuman(div) {
        if (!this.turn_is_human) {
            this.queueAudio(this.audio.unsuccessful)
            console.log("Not your turn Human!")
            return
        }

        var deck = this.currentcard.style.backgroundImage
        var mine = div.style.backgroundImage

        console.log('Check', deck, 'vs', mine)

        var c1 = this.getPropsFromBgImage(deck)
        var n1 = c1.number
        var t1 = c1.type

        var c2 = this.getPropsFromBgImage(mine)
        var n2 = c2.number
        var t2 = c2.type

        console.log('dump', n1, n2, t1, t2)

        if (n1 == n2) {

            this.currentcard.style.backgroundImage = div.style.backgroundImage
            // add to deck = true
            this.removeCard(this.players[this.characters.Human], div.style.backgroundImage, true)
            this.player2.removeChild(div)
            this.queueAudio(this.audio.swipe)

            switch (n2) {
                case '2':
                    this.getCard(this.characters.PC, 2)
                    this.queueAudio(this.audio.fail)
                    console.log('Human still playing!')
                    break

                case '7':
                case 'jack':

                    break;
            }

        } else if (t1 == t2) {

            switch (n2) {
                case '2':
                    // get 2 cards off the deck
                    this.getCard(this.characters.PC, 2)
                    this.queueAudio(this.audio.fail)
                    console.log('Human still playing!')
                    break;

                case '7':
                case 'jack':
                    console.log('Human still playing!')
                    break
            }

            this.currentcard.style.backgroundImage = div.style.backgroundImage // set new card

            // add to deck = true
            this.removeCard(this.players[this.characters.Human], div.style.backgroundImage, true)
            this.player2.removeChild(div)
            this.queueAudio(this.audio.swipe)

        } else if (n2 == '8') {
            // allowed to play an 8
            console.log('8 allowed')

            this.currentcard.style.backgroundImage = div.style.backgroundImage
            // add to deck = true
            this.removeCard(this.players[this.characters.Human], div.style.backgroundImage, true)
            this.player2.removeChild(div)
            this.queueAudio(this.audio.swipe)

        } else {
            this.queueAudio(this.audio.error)
        }


        this.checkTicket();
        this.checkWinner();
        this.dumpStats();

        // change 
        switch (n2) {
            case '2':
            case '7':
            case 'jack':
                console.log('Human still playing!')
                break;

            default:
                this.setPlayerTurn(this.characters.PC)
        }
    } // handlePlayerHuman
    
} // class Take2
