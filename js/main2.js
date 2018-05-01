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




let board = [
  null, null, null,
  null, null, null,
  null, null, null,
]


// 3 X 3 matrix
// set maxtrix a[i][j]


board = [
  a11, a12, a13,
  a21, a22, a23,
  a31, a32, a33
]

// players start from (0,0)

//each row is i, each column is j;


                              // y-axis === j
                              //   ^
                              //   |
//                                 |   let positionPlayer1 = [
//                                 |      (1,1), (1,2), (1,3),
//                                 |      (2,1), (2,2), (2,3),
//                                 |      (3,1), (3,2), (3,3)
//                                 |    ]
// // --------------------------------|-----------------------------> x-axis === i
//                                 |     let positionPlayer1 = [
//                                 |n=3      (3,1), (3,2), (3,3),
//                                 |n-2      (2,1), (2,2), (2,3),
//                                 |n=1      (1,1), (2,1), (3,1)
//                                 |    ]
// --------------------------------|-----------------------------> x-axis === i
//   let positionPlayer2 = [       |
//     (-3,-1), (-2,-1), (-1,-1),  |n=-1
//     (-3,-2), (-2,-2), (-1,-2),  |n=-2
//     (-3,-3), (-2,-3), (-1,-3)   |n=-3
//   ]

//for player 1, row is i, column is j
// for player 2, row is j, column is i

     positionPlayer2 = [       |
    (-3,-3), (-2,-1), (-1,-3),  |n=-3
    (-3,-2), (-2,-2), (-1,-2),  |n=-2
    (-3,-1), (-2,-1), (-1,-1)   |n=-1
  ]                             |                             |
                      <-----player2
--------------------------------|-----------------------------> x-axis
                                     player1----->
                                             positionPlayer1 = [
                                     |      (1,1), (1,2), (1,3),
                                     |      (2,1), (2,2), (2,3),
                                     |      (3,1), (3,2), (3,3)
                                     |    ]


// for loop??

let rows = 0;
let columns = 0;

//player 1 & player 2, opposite direction
let player1 = 1;
let player2 = 2;




// ===How to win the game===
// player1, player2, addition and subtraction
// for each row, as long as i reaches 3 (or -3), player1 (or player2) wins;
//for each column, as long as j reaches 3 (or -3), player1 (or player 2) wins;
//for diagonal, as long as i=j && i and j reaches 3 (or i=j && i and j reaches -3), player 1 (or player 2) wins
// set diagonal inital value to 0, if diagonal reaches 3 (or -3), player 1 (or player 2) wins
// for anti-diagonal, as long as i + j = n -1  && i reaches 3 or j reaches 3
// set anti-diagonal to 0, if anti-diagonal reaches 3 (or -3), player 1 (or player 2) wins

let diagonal=0;
let antiDiagonal=0;

const winner = function (player) {
 // for (n = 1; n <= 3; n ++) {?????

   if (player === 1) {
     rows++;
     columns++;
     if (rows === columns) {
       diagonal++;
     }
     if (rows + columns == n - 1) {
       antiDiagonal++;
     }
  } else if (player === 2) {
      rows--;
      columns--;
     if (rows === columns) {
       diagonal--;
     }
     if (rows + columns == n - 1) {
       antiDiagonal--;
       }
    }

  if(rows===3 || columns ===3 || diagonal ===3 || antiDiagonal===3) {
    console.log(`winner: ${1}.`);
  } else if (rows=== -3 || columns === -3 || diagonal === -3 || antiDiagonal=== -3)
    console.log(`winner: ${2}.`);
}







const game = function (player) {
  rows++
  if (rows=1) {
   if (player === 1) {
     columns++;
     if (rows === columns) {
       diagonal++;
     }
     if (rows + columns = n - 1) {
       antiDiagonal++;
     }
     rows++
  } else if (player === 2) {
      columns--;
       if (rows === columns) {
         diagonal--;
       }
       if (rows + columns = n - 1) {
         antiDiagonal--;
       }
      rows--
    }
  }

  if (rows=2) {
   if (player === 1) {
     columns++;
     if (rows === columns) {
       diagonal++;
     }
     if (rows + columns = n - 1) {
       antiDiagonal++;
     }
     rows++
  } else if (player === 2) {
      columns--;
       if (rows === columns) {
         diagonal--;
       }
       if (rows + columns = n - 1) {
         antiDiagonal--;
       }
       rows--
      }
    }
  }

  if (rows=3) {
   if (player === 1) {
     columns++;
     if (rows === columns) {
       diagonal++;
     }
     if (rows + columns = n - 1) {
       antiDiagonal++;
     }
     rows++

  } else if (player === 2) {
      columns--;
       if (rows === columns) {
         diagonal--;
       }
       if (rows + columns = n - 1) {
         antiDiagonal--;
       }

       rows--
    }
  }

  if(rows===3 || columns ===3 || diagonal ===3 || antiDiagonal===3) {
    console.log(`winner: ${1}.`);
  } else if (rows=== -3 || columns === -3 || diagonal === -3 || antiDiagonal=== -3)
    console.log(`winner: ${2}.`);
};
