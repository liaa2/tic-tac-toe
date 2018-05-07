//set up initial global scope variables
let board2D = [];
let n = 3;
let currentPlayer = "X";
// use turns to change currentPlayer for each move
let turns = 0;
//use moveCount to check if game is over
let moveCount = 0;
//use gameCount to swap which player starts for the next round
let gameCount = 0;
//set up initial score for player X
let playerXScore = 0;
// set up inital score for player O
let playerOScore = 0;
//check if game is over
let gameOver = false;

//AI player mode initial set up
let aiCount = 0;
//global variable to trigger ai on
let aiMode = false;




$(document).ready(function () {

  console.log('JQuery is ready - main.js');

  //check win conditions:
  //set current player (X or O) and board size as arguments
  //current player refers to line 172 and board size (n) refers to line 83
  const winner = function (board2D, player) {

    //set up inital diagonal and anti-diagonal arrays
    let diag = [];
    let antiDiag = [];


    const playerSymbol = player;
    //The symbols on one of the directions have to be the same in order to win the game
    //Use repeat() to concatenate string together
    player = player.repeat(n);
    // debugger;

    // iterate over rows
    for (let i = 0; i < n; i++) {
      let columns = [];
      // check row win, no need to check columns
      if ( board2D[i].join('') === player  ){
        console.log(`row WIN FOR ${player}!!!!`);
        return playerSymbol;
      };

      //interate over columns
      for (let j = 0; j < n; j++) {

        //update elements in diagonal array
        if ( i === j ) {
          diag.push(board2D[i][j]);
          console.log('diag push', i, j, board2D[i][j]);
        } //update elements in anti-diagonal array
        if ( i + j === n-1 ) {
          antiDiag.push(board2D[i][j]);
        };

        //update elements in columns array
        columns.push(board2D[j][i]);
      };

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
    };

    return false;  // this means no one has won on this move
  };



  //switch players between AI and user

  const aiMove = function (board2D, player, n) {
    console.log('ai game starts');
    // switch turns between 0 and 1
    // turns = 1 - turns;
    // currentPlayer = turns ? 'O' : 'X';
    console.log(`player: ${player}`);

    aiTurn(board2D, player);

    console.log(` current turn: ${turns}`);
  };




  //AI decides positions on the board and avoids overlap
  const aiTurn = function (board2D, player) {
    // check for empty squares
    x = parseInt(Math.random()*n)
    y = parseInt(Math.random()*n)

    if (!board2D[x][y]) {
      board2D[x][y] = player;
      console.log(board2D[x][y]);
    } else {
      aiTurn(board2D, player);
    }
    //updates player symbol to webpage
    $(`td[x = ${x}][y= ${y}]`).html(board2D[x][y]);
  };




  // ====================JQuery code======================


    //function to create grids based on n dimensions
    const createGrid = function(n) {

      // empty/reset my table
      $("table").empty();

      //create more cells in the table
      for (let i = 0; i < n; i++) {
        // initialise the board array
        board2D[i] = [];

        let $tr = $('<tr></tr>');
        // create table rows
        console.log(`${$tr}`);

        for (var j = 0; j < n; j++) {
          // set up inital value for board
          board2D[i][j]= null;
          // create cells for each row
          $tr.append(`<td class="checkbox" x="${i}" y="${j}">&nbsp;</td>`)
        }
        $("table").append($tr);
      };

      //function to get random numbers for colors on line 113
      const randRange = function (max) {
        return parseInt(Math.random()*max);
      };

      //create random colors for each cell in the table
      $(".checkbox").each(function() {
        let r = randRange(255);
        let g = randRange(255);
        let b = randRange(255);
        let color = `rgba(${r},${g},${b},0.5)`;
        $(this).css("backgroundColor", color);
      });

      //calculate each cell's height & width, minus 20px for extra space
      //calculate font size based on cell's size to prevent overflow
      let containerWidth = $("#container").width();
      let heightWidth = parseInt(containerWidth/n)-20;
      let fontSize = parseInt(heightWidth/2);


      $('tr').css({ "height": heightWidth });
      $("td").css({ "width": heightWidth })
      $("td").css("fontSize", fontSize);
    }; // end createGrid

    // drop down list to trigger AI player mode or human only mode
    $('#dropDown1').on('change', function () {
      // console.log($(this).val());
      if ($(this).val() === "AI Player mode: on") {
         aiMode = true;
         // console.log(aiMode);
         return aiMode;
      }
    });


    // create event listener for n (user chooses the number from the drop down list)
    $('#dropDown2').on('change', function () {
      console.log('changed!', $(this).val());
      n = parseInt(this.value);
      createGrid(n);
      $("h1, #choices").css("color","black");
      $("body").css("backgroundColor","white");
      $('.checkbox').css('border', `${12-n}px solid black`);
    });

    // delegate click handler to whole document - it will check for '.checkbox' on every click
    $(document).on("click", ".checkbox",  function() {

      //set variables for indices
      let x = $(this).attr("x");
      let y = $(this).attr("y");

      //if spot board2D[x][y] is not null i.e. aleady has symbol in it, ignore the click
      // if game is over, stop more clicks
      if( board2D[x][y] || gameOver ) {
        return;
      };

      // HUMAN TURN
      // let currentPlayer "X" or "O" replace board2D according to indices
      board2D[x][y] = currentPlayer;
      // link currentPlayer "X" or "O" to the webpage
      $(this).text(currentPlayer);
      checkForWinner();   // check if human (or X player) has won game
      if( gameOver ){
        // checkForWinner sets the global variable gameOver to true if the game has been won
        return;
      }

      //check if user selected AI mode
      console.log(`aiMode:${aiMode}`);

      if (aiMode ) {
        switchTurns();  // change turns to AI player
        aiMove(board2D, currentPlayer, n);
        checkForWinner();  //check if AI has won
      }

      switchTurns();

      moveCount++; //storing and incrementing the moves
    }); // end checkbox click handler

    //reset the game after each round
    const resetGame = function () {
      $("#message, #draw").hide();
      //no need to reset the game rounds as the whole game is still continuing, need to decide who is the next player
      gameCount++;
      //switch current player for the next round
      if (gameCount%2!==0) {
        currentPlayer = "O";
        turns = 1;
      } else {
        currentPlayer = "X";
        turns = 0;
      };
      //reset moves to 0
      moveCount = 0;
      //reset game over
      gameOver = false;
      //reset board according to n
      board2D = [];
      for (let i = 0; i < n; i++) {
        board2D[i] = [];
        for (let j = 0; j < n; j++) {
          board2D[i][j]= null;
        }
      }
      // clear the symbols "X" and "O" from the webpage
      $(".checkbox").text("");
      console.log($('#dropDown1').val());

      if ($('#dropDown1').val() === "AI Player mode: on") {
         aiMode = true;
         console.log(aiMode);
      }

      // Play AI move immediately if it's the AI's turn to start

      if (currentPlayer === "O" && aiMode ) {
        aiMove(board2D, currentPlayer, n);//Ai's turn to move
        checkForWinner();  //check if AI has won
        switchTurns();//switch player symbols
      }
    };

    const switchTurns = function () {
      turns = 1 - turns;   // switch turns between 0 and 1
      currentPlayer = turns ? 'O' : 'X'; // if turns is 1, currentPlayer is "O", vice versa

      // add CSS to underline current player's turn
      $().css("textDecoration", "underline")
    };

    const checkForWinner = function () {

      console.warn('checkForWinner', currentPlayer);

      let isWinner = winner(board2D, currentPlayer);
      //if there is a winner, trigger a function after win, otherwise trigger function after draw
      //winTrigger and drawTrigger refer to line 208 and 222
      if ( isWinner ) {
        winTrigger(isWinner);
        gameOver = true;
      } else if (moveCount===(n*n-1)) { //else if no winner and no more empty spot
        drawTrigger();
        gameOver = true;
      };
    };

    //incrementing scores for each player based on winner and pop up a message for user to choose
    //winnerSymbol is either "X" or "O"
    const winTrigger = function ( winnerSymbol ) {
      if ( winnerSymbol === "X" ){
        playerXScore++;
        console.log(`playerXScore: ${playerXScore}`);
        $("#player1 > div").text(playerXScore)
      } else {
        playerOScore++;
        console.log(`playerOScore: ${playerOScore}`);
        $("#player2 > div").text(playerOScore)
      }

      $("#message > div").html(`Winner is ${winnerSymbol}!<br>Play again?`);
      $("#message").show("slow");
    };

    //pop up a message for user to choose
    const drawTrigger = function () {
      $("#message > div").html(`Oops, draw!<br>Play again?`);
      $("#message").show("slow");
    };

    //"yes" and "no" button are nested inside "message" and "draw" message pop up
    //after click the "yes" button, reset the game
    $(document).on("click", ".yesButton", function() {
      console.log('yes!!');
      resetGame();
    });

    //after click the "no" button, update the message and redirect the page
    $(".noButton").on("click", function(){
      $("#message > div, #draw > div").html("Alright, see you next time!");
      setTimeout(function () {
        console.log("window redirecting");
        window.location.href = "https://www.google.com/";
      }, 1500);
    })
});
