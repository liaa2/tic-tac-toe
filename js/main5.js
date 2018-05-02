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




// let board = [ null, null, null, null, null, null, null, null, null ]

let board2D = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// board[ 4 ]

board2D[ 2 ][ 2 ]
// console.log(board2D[ 2 ][ 2 ]);


let currentPlayer = "O";
let turns = 0;


const winner = function (board2D) {

  let n = 3;
  // let numX = 0;
  // let numO = 0;


  let count = {X : 0, O: 0};？？？？？？？？？？？？？？？
  // check rows
  for (let i=0; i<n; i++) {
    for (let j=0; j<n; j++) {
      // console.log(board2D[i][j]);
      // set a variable to store coordinate
      const rowSquare = board2D[i][j];

      if( rowSquare ){
        count[ rowSquare ]++;
        if (count[ rowSquare ]===3) {
          console.log(`${rowSquare}: ${count[ rowSquare ]}, win.`);
          return true;
        }
      }


      // check columns
      const colSquare = board2D[j][i];
      if ( colSquare ) {
        count[ colSquare ]++
        if (count[ colSquare ]===3) {
          console.log(`${colSquare}: ${count[ colSquare ]}, win.`);
          return true;
        }
      }
    } // for j
  } // for i

  count = {X : 0, O: 0};
  // check diagonal
  for (i=0; i<n; i++) {
    let count = {X : 0, O: 0};
    const diagSquare = board2D[i][i];
    if (diagSquare) {
      count[ diagSquare ]++
      // console.log(count[ diagSquare ].diag);
      if (count[ diagSquare ]===3) {
        console.log(`${diagSquare}: ${count[ diagSquare ]}, win.`);
        return true;
      }
    }
  }

  count = {X : 0, O: 0};
  // check antiDiagonal
  // replationship between i and j: i+j = n-1;
  for (i=0; i<n; i++) {
    let count = {X : 0, O: 0};
    const antiDiagSquare = board2D[i][n-1-i];
    if (antiDiagSquare) {
      count[ antiDiagSquare ]++
      if (count[ antiDiagSquare ]===3) {
        console.log(`${antiDiagSquare}: ${count[ antiDiagSquare ]}, win.`);
        return true;
      }
    }
  }
  return false;
};




// ====================JQuery code======================
$(document).ready(function () {
  console.log(board2D);

  console.log('JQuery is ready - main3.js');

  $(".checkbox").on("click", function(){
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
    if (turns%2===0) {
      currentPlayer = "X"
      turns++
    } else {
      currentPlayer = "O"
      turns++
    };

    winner(board2D);


  })





});
