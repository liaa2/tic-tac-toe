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


let board2D = [];

let n = 3;
let currentPlayer = "X";
let turns = 0;
let playerXScore = 0;
let playerOScore = 0;


const winner = function (board2D, player) {

  let diag = [];
  let antiDiag = [];

  const playerSymbol = player;
  player = player.repeat(n);

  // check rows
  for (let i = 0; i < n; i++) {
    let columns = [];
    // check row win
    if ( board2D[i].join('') === player  ){
      console.log(`row WIN FOR ${player}!!!!`);
      return playerSymbol;
    }

    for (let j = 0; j < n; j++) {

      //create diagonal array
      if ( i === j ) {
        diag.push(board2D[i][j]);
        console.log('diag push', i, j, board2D[i][j]);
      } //create anti-diagonal array
      if ( i + j === n-1 ) {
        antiDiag.push(board2D[i][j]);
      }

      //create column as array
      columns.push(board2D[j][i]);
    }
    // console.log(columns);
    // console.log(player );
    if (columns.join('') === player ) {
      console.log(`col WIN FOR ${player}!!!!`);
      return playerSymbol;
    }
    // console.log(columns);
  }

  // check diag win & anti-diagonal win
  if (diag.join('') === player || antiDiag.join('') === player) {
    console.log(`diag WIN FOR ${player}!!!!`);
    return playerSymbol;
  }

  return false;  // this means no one has won on this move
};






// ====================JQuery code======================
$(document).ready(function () {
  // console.log(board2D);

  console.log('JQuery is ready - main9.js');

  // create board size based on user's choice
  const createGrid = function(n) {

    // empty my table
    $("table").empty();

    // initialise the board array
    for (let i = 0; i < n; i++) {
      board2D[i] = [];
      for (let j = 0; j < n; j++) {
        board2D[i][j]= null;
      }
    }

    //create more tables
    for (let i = 0; i < n; i++) {
      let $tr = $('<tr></tr>');
      console.log(`${$tr}`);
      for (var j = 0; j < n; j++) {
        $tr.append(`<td class="checkbox" x="${i}" y="${j}">&nbsp;</td>`)
      }
      $("table").append($tr);
    }

    $(".checkbox").each(function() {
      let r = randRange(255);
      let g = randRange(255);
      let b = randRange(255);
      let color = `rgba(${r},${g},${b},0.7)`;
      $(this).css("backgroundColor", color);
    })

    //create width and height for grid, create font-size for text inside
    let containerWidth = $("#container").width();
    let heightWidth = parseInt(containerWidth/n)-20;
    let fontSize = parseInt(heightWidth/2);

    $('tr').css({ "height": heightWidth });
    $("td").css({ "width": heightWidth })
    $("td").css("fontSize", fontSize);
  }; // end createGrid


  // create event listener for n
  $('#dropDown').on('change', function () {
    console.log('changed!', $(this).val()); //or this.value <--- vanilla JS
    n = parseInt(this.value); //convert n from string to number. Number() could also work
    createGrid(n);
  });



  const ai = function () {
    if (!board2D[x][y]) {
      x = Math.floor(Math.random()*5);
      y = Math.floor(Math.random()*5);
      return board2D[x][y];
    } else {
      return false;
    }
  };

  // delegate click handler to whole document - it will check for '.checkbox' on every click
  $(document).on("click", ".checkbox",  function() {
    console.log('in here');
    //set variables for indices
    const x = $(this).attr("x")
    const y = $(this).attr("y")
    // debugger;

    // console.log(board2D[x][y]);

    // prevents overlap - place this function before switch player function otherwise it would switch player first and show the error message

    // if( board2D[x][y] ) is equivalents to if( board2D[x][y]===true ) which is also equivalents to if( board2D[x][y] !== null)
    if( board2D[x][y] ) {
      console.log("Invalid click.")
      return;
    }
    // debugger;

    // let currentPlayer "X" or "O" replace board2D
    board2D[x][y] = currentPlayer;

    // let currentPlayer "X" or "O" shows on the screen
    $(this).text(currentPlayer);

    //switch players by increment turns
    // the initial player is "O", but turns stays zero when the below function starts to work, put line 156 to "X" so the players would switch. Otherwise it would be like: initial click "O" -> click again "O" -> click again "X"

    const isWinner = winner(board2D, currentPlayer);

    if ( isWinner ) {
      winTrigger(isWinner);
    } else if (turns===(n*n-1)) { //else if winner condition doesnt meet and already played 9 times
      drawTrigger();
    }

    // console.log(`before: turns=${turns}, currentPlayer=${currentPlayer}`);
    if (turns%2 === 0) {
      currentPlayer = "O"; //AI player
    } else {
      currentPlayer = "X";
    };
    turns++;
    // console.log(`AFTER: turns=${turns}, currentPlayer=${currentPlayer}`);

    // AI Player Turn function here!

    // then back to human turns

  }); // end checkbox click handler


  const resetGame = function () {
    $("#message, #draw").hide();
    currentPlayer = "X";
    turns = 0;
    board2D = [];
    $(".checkbox").text("");
  };


  const winTrigger = function ( winnerSymbol ) {
    if ( winnerSymbol === "X" ){
      playerXScore++
      // console.log(playerXScore);
      $("#player1 > div").text(playerXScore)
    } else {
      playerOScore++
      $("#player2 > div").text(playerOScore)
    }

    $("#message > div").html(`Winner is ${winnerSymbol}!<br>Play again?`)
    $("#message").show("slow");
  };

  const drawTrigger = function () {
    $("#message > div").html(`Oops, draw!<br>Play again?`)
    $("#message").show("slow");
  };


  const randRange = function (max) {
    return parseInt(Math.random()*max);
  }


  $(".yesButton").on("click", function() {
    console.log('yes!!');
    resetGame();
  });

  $(".noButton").on("click", function(){
    $("#message > div, #draw > div").html("Alright, see you next time!");
    setTimeout(function () {
      window.close();
    }, 1500);
  })
});
