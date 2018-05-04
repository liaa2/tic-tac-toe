
//set up initial global scope variables
let board2D = [];
let n = 3;
let currentPlayer = "X";
// use turns to change currentPlayer for each move
let turns = 0;
//use gameCount to swap which player starts for the next round
let gameCount = 0;
//use moveCount to check if game is over
let moveCount = 0;
//set up initial score for player X
let playerXScore = 0;
// set up inital score for player O
let playerOScore = 0;

//check win conditions:
//set current player (X or O) and board size as arguments
//current player refer to line 172 and board size (n) refer to line 130
const winner = function (board2D, player) {

  //set up inital diagonal and anti-diagonal arrays
  let diag = [];
  let antiDiag = [];

  const playerSymbol = player;
  //The symbols on one of the directions have to be the same in order to win the game
  //Use repeat() to concatenate string together
  player = player.repeat(n);

  // iterate over rows
  for (let i = 0; i < n; i++) {
    let columns = [];
    // check row win, no need to check columns
    if ( board2D[i].join('') === player  ){
      console.log(`row WIN FOR ${player}!!!!`);
      return playerSymbol;
    }

    //interate over columns
    for (let j = 0; j < n; j++) {

      //update elements in diagonal array
      if ( i === j ) {
        diag.push(board2D[i][j]);
        console.log('diag push', i, j, board2D[i][j]);
      } //update elements in anti-diagonal array
      if ( i + j === n-1 ) {
        antiDiag.push(board2D[i][j]);
      }

      //update elements in columns array
      columns.push(board2D[j][i]);
    }

    //check column wins
    if (columns.join('') === player ) {
      console.log(`col WIN FOR ${player}!!!!`);
      return playerSymbol;
    }
  };

  // check diag win & anti-diagonal win
  if (diag.join('') === player || antiDiag.join('') === player) {
    console.log(`diag WIN FOR ${player}!!!!`);
    return playerSymbol;
  }

  return false;  // this means no one has won on this move
};







// ====================JQuery code======================
$(document).ready(function () {

  console.log('JQuery is ready - main.js');

  //function to create grids based on n dimensions
  const createGrid = function(n) {

    // empty/reset my table
    $("table").empty();

    // initialise the board array
    for (let i = 0; i < n; i++) {
      board2D[i] = [];
      for (let j = 0; j < n; j++) {
        board2D[i][j]= null;
      }
    }

    //create more cells in the table
    for (let i = 0; i < n; i++) {
      let $tr = $('<tr></tr>');
      console.log(`${$tr}`);
      for (var j = 0; j < n; j++) {
        $tr.append(`<td class="checkbox" x="${i}" y="${j}">&nbsp;</td>`)
      }
      $("table").append($tr);
    }

    //function to get random numbers for colors on line 109
    const randRange = function (max) {
      return parseInt(Math.random()*max);
    }

    //create random colors for each cell in the table
    $(".checkbox").each(function() {
      let r = randRange(255);
      let g = randRange(255);
      let b = randRange(255);
      let color = `rgba(${r},${g},${b},0.5)`;
      $(this).css("backgroundColor", color);
    })

    //calculate each cell's height & width, minus extra 20px as they are sizes for borders (10px on each side)
    //calculate font size based on cell's size to prevent overflow
    let containerWidth = $("#container").width();
    let heightWidth = parseInt(containerWidth/n)-20;
    let fontSize = parseInt(heightWidth/2);


    $('tr').css({ "height": heightWidth });
    $("td").css({ "width": heightWidth })
    $("td").css("fontSize", fontSize);
  }; // end createGrid

  // create event listener for n (user chooses the number from the drop down list)
  $('#dropDown').on('change', function () {
    console.log('changed!', $(this).val());
    n = parseInt(this.value);
    createGrid(n);
    $("h1, #chooseSize").css("color","black");
    $("body").css("backgroundColor","white");
    $('.checkbox').css('border', `${12-n}px solid black`);
  });

  // delegate click handler to whole document - it will check for '.checkbox' on every click
  $(document).on("click", ".checkbox",  function() {

    //set variables for indices
    const x = $(this).attr("x")
    const y = $(this).attr("y")

    if( board2D[x][y] ) {
      console.log("Invalid click.")
      return;
    }

    // let currentPlayer "X" or "O" replace board2D according to indices
    board2D[x][y] = currentPlayer;

    // link currentPlayer "X" or "O" to the webpage
    $(this).text(currentPlayer);


    const isWinner = winner(board2D, currentPlayer);

    //if there is a winner, trigger a function after win, otherwise trigger function after draw
    if ( isWinner ) {
      winTrigger(isWinner);
    } else if (moveCount===(n*n-1)) { //else if no winner and no more empty cells
      drawTrigger();
    }


    turns = 1 - turns;   // switch turns between 0 and 1
    currentPlayer = turns ? 'O' : 'X'; // if turns is 1, currentPlayer is "O", vice versa

    moveCount++;
  }); // end checkbox click handler

  //reset the game after each round
  //reset turns, current player, empty the board and clear the symbols "X" and "O" from the webpage
  const resetGame = function () {
    $("#message, #draw").hide();

    gameCount++;
    //switch players
    if (gameCount%2!==0) {
      currentPlayer = "O";
      turns = 1;
    } else {
      currentPlayer = "X";
      turns = 0;
    }

    moveCount = 0;
    board2D = [];
    for (let i = 0; i < n; i++) {
      board2D[i] = [];
      for (let j = 0; j < n; j++) {
        board2D[i][j]= null;
      }
    }
    $(".checkbox").text("");
  };

  //incrementing scores for each player based on winner and pop up a message for user to choose
  //winnerSymbol is either "X" or "O"
  const winTrigger = function ( winnerSymbol ) {
    if ( winnerSymbol === "X" ){
      playerXScore++
      $("#player1 > div").text(playerXScore)
    } else {
      playerOScore++
      $("#player2 > div").text(playerOScore)
    }

    $("#message > div").html(`Winner is ${winnerSymbol}!<br>Play again?`)
    $("#message").show("slow");
  };

  //pop up a message for user to choose
  const drawTrigger = function () {
    $("#message > div").html(`Oops, draw!<br>Play again?`)
    $("#message").show("slow");
  };

  //after click the "yes" button, reset the game
  $(".yesButton").on("click", function() {
    console.log('yes!!');
    resetGame();
  });

  //after click the "no" button, update the message and close the window
  $(".noButton").on("click", function(){
    $("#message > div, #draw > div").html("Alright, see you next time!");
    setTimeout(function () {
      window.close();
    }, 1500);
  })
});
