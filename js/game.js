var tictactoe = (function() {

  let player = 1;
  let board;

  // Returns true if the game is over
  function check() {

    let count;
    let current;
    let zeros = 0;

    function three(n) {

      if(n && current != n) {
        current = n;
        count = 0;
      }
      else if(n) {
        count++;
      }

      if(count === 2 && current === n && typeof exports.onend === 'function')
        return exports.onend(current), true;

      return false;
    }

    for(let column = 0; column < 3; column++) {

      count = 0;
      current = null;

      for(let row = 0; row < 3; row++) {

        board[column][row] === 0 ? zeros++ : null;

        if(three(board[column][row]))
          return true;
      }
    }

    if(!zeros && typeof exports.onend === 'function')
      return exports.onend(undefined), true;

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

  function start() {
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

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
