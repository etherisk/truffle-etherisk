var riskContract;
var account;
var joinedGameId;

function getContract() {
  //return Kindarisky.at('d9e3996d5f4aece4d5878a2e2c8d986653e5532e');
  return Kindarisky.deployed();
}

function getAvailableGames() {
  return getContract().getAvailableGames.call();
}

function FetchGameList() {
  SendMessage('GameListPanel', 'ClearGames', name);
  // This is called when the Unity app has finished starting up.
  web3.eth.getAccounts(function(err, accs) {
    account = accs[0];
    getAvailableGames().then(function(games) {
      console.log("Available games:");
      console.log(games);
      games.forEach(function(gameId) {
        if (gameId != -1) {
          getContract().getNumberOfPlayers.call(gameId).then(function(numPlayers) {
            var name = gameId + " with " + numPlayers + " players";
            console.log(name);
            SendMessage('GameListPanel', 'AddGame', name);
          });
        }
      });
    });
  });
}

function CreateGame() {
  console.log("Create Game");
  getContract().createGame(3, 0, {from: account});
  FetchGameList();
}

function JoinGame(name) {
  joinedGameId = parseInt(name);
  console.log("Joining game " + joinedGameId);
  getContract().join(joinedGameId, 0, {from:account});

  UpdatePlayerCount();
}

function UpdatePlayerCount() {
  getContract().getNumberOfPlayers.call(joinedGameId).then(function(numPlayers) {
    var status = numPlayers + " joined out of 4";
    SendMessage('GameListPanel', 'SetStatus', status);

    if (numPlayers == 1) {
      SendMessage('GameListPanel', 'StartGame', joinedGameId)
    } else {
      setTimeout(UpdatePlayerCount, 3000);
    }
  });
}
