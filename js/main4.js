// Overview
// Let's start out with something fun - a game!
//
// We'll be making Tic Tac Toe, a game that takes seconds to learn but minutes to master! Everyone will get a chance to be creative, and work through some really tough programming challenges to get your feet wet in the world of web development.
//
// "hand me your phone," load up the game, and play a quick round!
//
// You will be working individually for this project, but we'll be guiding you along the process and helping as you go. Show us what you've got!
//
// What You've Learned
// By the time you submit this project, you will have covered new ground in many of the big themes of the course:
//
// Command Line: Practice interacting with the computer and navigating the filesystem from the command line.
// Source Control: Manage and interact with a git repository to store changes to code.
// Programming Fundamentals: Work with array, objects, event handlers & callbacks, while learning how to strategically solve problems and resolve errors.
// Web Fundamentals: Learn how communication happens over the internet, and how to structure, style, and animate documents within a browser. Also learn how to respond to actions taken by your users and the data they input into the browser.
// Browser Applications: Dive into CSS and learn how to use libraries and frameworks to get lots of style for free.
// Deployment: Host a static web site in a managed hosting environment.
// Products and Teams: Document your code and your code repository so others understand what you've built.
// Big Goals
// Build a web application from scratch, without a starter codebase
// Use your programming skills to map out the game logic for a simple game like Tic Tac Toe
// Separate HTML, CSS, and JavaScript files in your application
// Build an application to a spec that someone else gives you
// Build a dynamic game that allows two players to compete
// Craft a readme.md file that explains your app to the world
// Technical Requirements
// Your app must:
//
// Render a game board in the browser
// Switch turns between X and O (or whichever markers you select); your game should prevent users from playing a turn into a square that is already occupied
// Visually display which side won if a player gets three in a row or show a draw/"cat’s game" if neither wins
// Include separate HTML / CSS / JavaScript files
// Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
// Use Javascript with jQuery for DOM manipulation
// Deploy your game online, where the rest of the world can access it
// Use semantic markup for HTML and CSS (adhere to best practices)
// Bonus
// These are for extra credit! Don't focus on these until you've hit the core requirements.
//
// Keep track of multiple game rounds with a win counter
// Allow players to customize their tokens (X, O, name, picture, etc)
// Get inventive with your styling, e.g. use hover effects or animations to spiff things up
// Use LocalStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity
// Support custom board sizes: default is 3x3 but you could allow users to choose a larger board
// Support networked multiplayer: https://www.firebase.com/ has a nice quickstart guide
// TRICKIEST: Create an AI opponent: teach Javascript to play an unbeatable game against you
// Start by implementing a few simple rules which can be easily checked and are always good moves, such as "always take the center square if it's available" - you can google these rules for yourself
// You can build in as many AI player rules as you like but you'll quickly end up with a longwinded list of if-else-if statements. To make a truly unbeatable AI opponent you'll need to look into implementing an algorithm like MiniMax - for advanced/bold students only!
// //


let turns = 0;
let currentPlayer = 'X';
let playerXScore= 0;
let playerOScore= 0;


const board = [
  null, null, null,
  null, null, null,
  null, null, null,
]


const winningCombo = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];


const winner = function ( player ) {
  if (
     board[0] ==player && board[1] ==player && board[2] ==player ||
     board[3] ==player && board[4] ==player && board[5] ==player ||
     board[6] ==player && board[7] ==player && board[8] ==player ||
     board[0] ==player && board[3] ==player && board[6] ==player ||
     board[1] ==player && board[4] ==player && board[7] ==player ||
     board[2] ==player && board[5] ==player && board[8] ==player ||
     board[0] ==player && board[4] ==player && board[8] ==player ||
     board[2] ==player && board[4] ==player && board[6] ==player
     ){

    // console.log("Winner: player 1");

    return true;

  }
  //
  // if (
  //    board[0] =="O" && board[1] =="O" && board[2] =="O" ||
  //    board[3] =="O" && board[4] =="O" && board[5] =="O" ||
  //    board[6] =="O" && board[7] =="O" && board[8] =="O" ||
  //    board[0] =="O" && board[3] =="O" && board[6] =="O" ||
  //    board[1] =="O" && board[4] =="O" && board[7] =="O" ||
  //    board[2] =="O" && board[5] =="O" && board[8] =="O" ||
  //    board[0] =="O" && board[4] =="O" && board[8] =="O" ||
  //    board[2] =="O" && board[4] =="O" && board[6] =="O"
  //  ) {
  //
  //   // console.log("Winner: player 2");
  //   return true;
  // }


  // console.log("No winner.");
  return false;

};



// ============================JQuery/Gui code=====================

$(document).ready(function(){
  console.log('JQuery is ready');

  const resetGame = function () {
    // hide message board
    $('#message,#draw').hide();
    // reset turns to 0
    turns = 0;

    // reset player to X
    currentPlayer = 'X';

    // reset board to null
    for (let i=0; i<board.length; i++) {
      board[i] = null;
    }

    //clear the webpage
    $(".checkbox").text("");
  };


  const draw = function () {
    $('#draw > div').html(`Oops, draw!<br>Play again?`);
    $('#draw').show('slow');
  }



  $(".checkbox").on("click", function () {

    const index = $(this).attr('position');

     if (board[index] !== null) {
       console.log("Invalid click");
       return;
     }

    $(this).text( currentPlayer );
    board[ index ] =  currentPlayer;

    // console.log(board);

    const isWinner = winner( currentPlayer );


    const countScore = function() {
      if (currentPlayer === 'X') {
        playerXScore++;
        $('#player1 > div').text(playerXScore);
        // console.log(`player ${currentPlayer} won`);
        // console.log(`${currentPlayer}`+playerXScore);
      } else{
        playerOScore++;
        $('#player2 > div').text(playerOScore);
        // console.log(`player ${currentPlayer} won`);
        // console.log(`${currentPlayer}`+playerOScore);
      }

      // $('#message').html(` player ${currentPlayer} won! <br> Play again?<br><button id="yesButton">yes</button><br><button id="noButton">no</button>`);
      $('#message > div').html(` player ${currentPlayer} won!<br>Play again?`);
      // $('#yesButton, #noButton').css({'background': 'inherit', 'fontSize': '50px','fontFamily': 'Black Han Sans'})
      $('#message').show('slow');
    };

    if( isWinner ){
      countScore();
      // resetGame();
    } else if (turns===8) {
      draw();
      // resetGame();     //$('#message').html(`${currentPlayer} won`).fadeIn();
    };


    if ( turns%2 !== 0 ) {
      currentPlayer = 'X';  // Odd turns belong to X
    } else {
      currentPlayer = 'O';
    }

    turns++;
  });


  const randRange = function (max) {
    return parseInt( Math.random() * max);
  }


  $(".checkbox").each(function () {
    const r = randRange(255);
    const g = randRange(255);
    const b = randRange(255);
    const color = `rgba(${r},${g},${b},0.7)`
    $(this).css("backgroundColor", color);
  })

  // console.log("$('#yesButton') results:", $('#yesButton').length);
  $('.yesButton').on('click', function(){
    // debugger;
    resetGame();
    console.log('reset!');
  })


  $('.noButton').on('click', function(){
    $('#message > div, #draw > div').html(`Alright, see you next time!`);
    setTimeout(function(){
    window.close();
    },2000);
  })
});
