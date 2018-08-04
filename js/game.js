var tictactoe = (function() {

  let player = 1;
  let board;

  // Check for winner or tie
  // Returns true if the game is over
  function check() {

    let count;
    let current;
    let zeros = 0;

    // Checks for three in a row
    function three(n) {

      if(n && current != n) {
        current = n;
        count = 0;
      }
      else if(n) {
        count++;
      }

      // Call onend if there is three in a row or column etc...
      if(count === 2 && current === n && typeof exports.onend === 'function')
        return exports.onend(current), true;

      return false;
    }

    // Check each row
    for(let column = 0; column < 3; column++) {

      count = 0;
      current = null;

      for(let row = 0; row < 3; row++) {

        board[column][row] === 0 ? zeros++ : null;

        if(three(board[column][row]))
          return true;
      }
    }

    // If the board is full
    // call onend
    if(!zeros && typeof exports.onend === 'function')
      return exports.onend(undefined), true;

    // Check each column
    for(let row = 0; row < 3; row++) {

      count = 0;
      current = null;

      for(let column = 0; column < 3; column++) {
        if(three(board[column][row]))
          return true;
      }
    }

    count = 0;
    current = null;

    // Check diagonally
    for(let column = 0, row = 0; column < 3; column++, row++) {
      if(three(board[column][row]))
        return true;
    }

    count = 0;
    current = null;

    for(let column = 2, row = 0; column >= 0; column--, row++) {
      if(three(board[column][row]))
        return true;
    }

    return false;

  }

  // Play as the current player
  // and mark the board at column, row
  // Returns true if success false if not
  function play(column, row) {

    if(board && board[column][row] === 0) {

      board[column][row] = player;
      player = player === 1 ? 2 : 1;

      if(!check() && typeof exports.onplayerchange === 'function')
        exports.onplayerchange(player);

      return true;
    }
    return false;
  };

  // Start a new game
  function start() {
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

    // Call onstart if it is a function
    if(typeof exports.onstart === 'function')
      exports.onstart(player);

  };

  let exports = {
    onstart: console.log.bind(this, 'onstart'),
    onend: console.log.bind(this, 'onend'),
    onplayerchange: console.log.bind(this, 'onplayerchange'),
    play,
    start
  };

  Object.defineProperty(exports, 'player', {
    get: function() {
      return player;
    }
  })

  return exports;

}());
