/*
 ** author:sara magdy (engazharya@gmail.com)
 ** content:fend memory game 
 ** start at :27/3/2018
 ** end at :
 */
//------------ runner area -------------
var openCards = []; // restricted to two 
var moves = 0; //init
var ratingStars = 0;
var clicks = 0;
var theEnd = false;
CardsList = CardsInitalize();
var shuffleone = shuffle(CardsList);

var startTime;
var endTime;
var timerInterval;
var timerCounter = 0;
var timerMin = 0;
var domCards = [];
//var $deck = $('.deck');
var $rating = $('.fa-star');
var stars3 = 14;
var stars2 = 18;
var stars1 = 22;
var rate = rating(moves);
DisplayCards();


//Add event listener
$(".card").on('click', function() {
    //fire
    firematch(this);

});
$(".btn").on('click', function() {
    shuffle(CardsList);
    CardsMacker();
    hideSymbols(openCards);
    hideMatch(openCards);
    moves = 0;
    $(".moves").html(moves);
    resetGame();
    $rating.removeClass('fa-star-o').addClass('fa-star');
    function someFunc() {
            var ownName = arguments.callee.toString();
            ownName = ownName.substr('function '.length);        // trim off "function "
            ownName = ownName.substr(0, ownName.indexOf('('));        // trim off everything after the function name
            alert(ownName);
        };
});

$(".restart").on('click', function() {
    shuffle(CardsList);
    CardsMacker();
    hideSymbols(openCards);
    hideMatch(openCards);
    moves = 0;
    $(".moves").html(moves);
    resetGame();
    $rating.removeClass('fa-star-o').addClass('fa-star');

});
// ----------- operation model area  ----------

// ----------- start CardsInitalize  ----------
function CardsInitalize() {
    // logic to intilize cards 
    var domCards = [];
    domCards = document.getElementsByClassName("card");
    return transformer(domCards);
}
console.log(openCards);
// ----------- end CardsInitalize  ----------

//--------------- start transformer -----------
function transformer(obj) {
    //logic to return it to shuffle expect
    var maped = [];
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            maped.push(obj[key].innerHTML)
        };
    }
    return maped;
}
//--------------- end transformer -----------

//--------------- start DisplayCards ---------
function DisplayCards() {
    // logic to displayCards
    var list = CardsMacker();
    replacer(list);
}
//--------------- start DisplayCards ---------

// ------------ start replacer ----------------
function replacer(list) {
    document.getElementsByClassName("deck")[0].innerHTML = list.innerHTML;
}
// ------------ end replacer ------------------

//-------------- start CardsMacker ------------
function CardsMacker() {
    var list = document.createElement("ul");
    for (var i = 0; i < shuffleone.length; i++) {
        // create li element 
        var li = document.createElement("li");
        li.innerHTML = shuffleone[i];
        li.classList.add("card");
        list.appendChild(li);
        // add class card 
    } //end for
    return list;
}
//--------------- end CardsMacker ----------------

//--------------- start isClicked ----------------
function isClicked(card) {
    //if it has class open or match : clicked true
    if ($(card).hasClass("show") || $(card).hasClass("open")) {
        return true;
    }
    return false;
}
//--------------- end isClicked -------------------

//--------------- start firematch------------------
function firematch(card) {
    if (isClicked(card)) {
        return;
    }
    displaySymbol(card);
    markedOpend(card);

    //timer on the desk

    if (moves === 1) {
        timerInterval = setInterval(function() {
            startTimer();
        }, 1000);
    }
}
//--------------- end firematch----------------------

//----------------- start shuffle -------------------
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//----------------- end shuffle -------------------

// ---------------- start display symbo-------------
function displaySymbol(card) {
    // logic to show symbol
    $(card).addClass("show open");

}
// -------------- end display symbol------------------

//---------------- start incrementMoves---------------
function incrementMoves() {
    moves++;
    rating(moves);
    $(".moves").html(moves);
}
//---------------- end incrementMoves ------------------

//------------------- start isMatch --------------------
function isMatch(openCards) {
    openCards[0]
    openCards[1]
    let con1 = openCards[0].classList != openCards[1].classList;
    let con2 = $(openCards[0]).is($(openCards[1]));
    if (con1 || con2) {
        return false;
    }
    return true;
}
//------------------- end isMatch-----------------------

//------------------- start MarkAsMatch-----------------
function MarkAsMatch(openCards) {
    for (var i = 0; i < openCards.length; i++) {
        $(openCards[i]).addClass("match  jello rubberBand animated");
    }
}
//------------------- end MarkAsMatch--------------------
//------------------- start MarkAsMatch-----------------
function hideMatch(openCards) {
    for (var i = 0; i < openCards.length; i++) {
        $(openCards[i]).removeClass("match rubberBand animated");
    }
}
//------------------- end MarkAsMatch--------------------
//-------------------- start handleMatchCase-------------
function handleMatchCase(openCards) {
    //logic to handle match case
    MarkAsMatch(openCards);
    //trancade open cards
}
//-------------------- end handleMatchCase----------------

//------------------ start handleNoMatchCase--------------
function handleNoMatchCase(openCards) {
    //logic to handle no match case 
    //animate them
    animate(openCards);
    styleDanger(openCards);
    setTimeout(function() {
        //hide symbol
        hideSymbols(openCards);
    }, 1000);

    //trancade open cards
    //openCards = [];
}
//------------------ end handleNoMatchCase-------------------

//------------------- start animate--------------------------
function animate(openCards) {

}
//------------------- end animate----------------------------

//------------------------end styleDanger--------------------
function styleDanger(openCards) {
    for (var i = 0; i < openCards.length; i++) {
        $(openCards[i]).addClass("red swing rubberBand wobble animated ");
    }
}
//----------------------- end styleDanger---------------------

//---------------------- start hideSymbols -------------------
function hideSymbols(openCards) {
    for (var i = 0; i < openCards.length; i++) {
        $(openCards[i]).removeClass("open swing show rubberBand wobble animated");
    }
}
//---------------------- end hideSymbols ---------------------

//------------------- start markedOpend ---------------------
function markedOpend(card) {
    // check of open cards array
    if (openCards.length > 0) {
        //not yet 
        incrementMoves();
        // displaySymbol(card);
        openCards.push(card);
        // check if matched 
        if (isMatch(openCards)) {
            handleMatchCase(openCards);
            openCards = [];

        } else {
            handleNoMatchCase(openCards);
            openCards = [];
        }

    } else {
        openCards.push(card);
        incrementMoves();

        //increment  it
    }

    checkMatchAll();

}
//--------------- end markedOpend---------------------------------

//--------------- start checkMatchAll -----------------------------
function checkMatchAll() {
    let all = true;
    $(".card").each(function() {
        return all = $(this).hasClass("match"); // hasClass return true or false 
    });
    if (all) {
        //alert("all matched");
        // owsomeAlert();
        showStaticies();
        theEnd = true;
        resetGame();
        shuffle(CardsList);
        CardsMacker();
        hideSymbols(openCards);
        hideMatch(openCards);
        moves = 0;
        $(".moves").html(moves);
        resetGame();
        $rating.removeClass('fa-star-o').addClass('fa-star');
    }
}
//--------------- end checkMatchAll-----------------------------

//--------------- start showStaticies---------------------------------
function showStaticies() {
    //score
    //time
    //moves
    //sweetAlert("congrats");
    sweetAlert("congratulations! you are winning", "with " + moves + " in " + timerCounter + " time scoring !" + rate + " star", "success");
}
//--------------- end showStaticies---------------------------------

//--------------- start timer -------------------------------
function startTimer() {
    let sec;
    timerCounter++
    sec = timerCounter;
    if (timerCounter === 60) {
        timerMin++;
        sec = 0;
        timerCounter = 0;
    }
    document.querySelector('#timer').innerHTML = addZeroToTimer(timerMin) + ':' + addZeroToTimer(sec);
}

function addZeroToTimer(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }

}

function resetGame() {

    stopTimer();
    for (var i = 0; i < openCards.length; i++) {
        openCards[i].classList.remove("show", "open", "match")

    }
}


function stopTimer() {
    clearInterval(timerInterval);
    timerCounter = 0;
    timerMin = 0;
    document.querySelector('#timer').innerHTML = '00:00';
}
//--------------- end timer ---------------------------------

//--------------- rating Moves  ------------------------------
function rating(moves) {
    let rating = 3;
    if (moves > stars3 && moves < stars2) {
        $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
    } else if (moves > stars2 && moves < stars1) {
        $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
        rating = 2;
    } else if (moves > stars1) {
        $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    }
    return { score: rating };
}
//--------------- rating Moves -------------------------------
