var riskContract;

function getContract() {
  //return Kindarisky.at('d9e3996d5f4aece4d5878a2e2c8d986653e5532e');
  return Kindarisky.deployed();
}

function getAvailableGames() {
  return riskContract.getAvailableGames.call();
}

function FetchGameList() {
  web3.eth.getAccounts(function(err, accs) {
    riskContract = getContract();
    getAvailableGames().then(function(games) {
      console.log("Available games:");
      console.log(games);
      games.forEach(function(game) {
        if (game != -1) {
          var name = "Game " + game;
          SendMessage('GameList', 'AddGame', name);
        }
      });
    });
  });
}

function CreateGame() {
  console.log("Create Game");
}
