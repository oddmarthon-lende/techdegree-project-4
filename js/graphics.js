;(function($, game) {

  const $board = $('#board');

  const $start  = $(`
    <div class="screen screen-start" id="start">
      <header>
        <h1>Tic Tac Toe</h1>
        <a href="#" class="button">Start game</a>
        </header>
    </div>
  `);
  const $finish = $(`
    <div class="screen screen-win" style="display: none;" id="finish">
      <header>
        <h1>Tic Tac Toe</h1>
        <p class="message"></p>
        <a href="#" class="button">New game</a>
      </header>
    </div>
  `);
  const $boxes  = $('.boxes');

  let playerImage = 'o';

  function activate(player) {

    $('.players').removeClass('active');
    $(`#player${player}`).addClass('active');

    playerImage = player === 1 ? 'o' : 'x';

  }

  $board.after($start);
  $board.after($finish);

  $start.find('a.button').on('click', () => game.start());
  $finish.find('a.button').on('click', () => game.start());

  game.onstart = (player) => {

    const $li = $boxes.find('li');

    $li.removeClass(`box-filled-1`);
    $li.removeClass(`box-filled-2`);

    $start.hide();
    $finish.hide();

    activate(player);

  };

  game.onplayerchange = (player) => activate(player);
  game.onend = (winner) => {

    $finish.toggleClass('screen-win-one', winner === 1);
    $finish.toggleClass('screen-win-two', winner === 2);
    $finish.toggleClass('screen-win-tie', !winner);
    $finish.find('p.message').text(winner === undefined ? 'It\'s a draw' : 'Winner');

    $finish.show();

  };

  $boxes.on('click', 'li', function() {

    const boxes = Array.from($boxes.find('li'));
    const index = boxes.indexOf(this);
    const player = game.player;

    if(game.play(index % 3, Math.floor(index / 3))) {
      $(this).addClass(`box-filled-${player}`);
    }

  });

  $boxes.on('mouseover', 'li', function() {
    const $self = $(this);
    if($self.css('background-image') === 'none')
      $self.css('background-image', `url("img/${playerImage}.svg")`);
  });

  $boxes.on('mouseout', 'li', function() {
    $(this).css('background-image', '');
  });


}($, tictactoe));
