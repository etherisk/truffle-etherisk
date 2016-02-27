



function getContract() {
  return KindaRisky.deployed();
}

function getAvailableGames() {
  return getContract().getAvailableGames.call();
}

window.onload = function() {

  web3 = new Web3(new Web3.providers.HttpProvider("http://peer-1.ether.camp:8082/"));

  getAvailableGames().then(function(games) {
    console.log(games);
    games.forEach(function(game) {
      if (game != -1) {
        var name = "Game " + game;
        SendMessage('GameList', 'AddGame', name);
      }
    });
  });
}
