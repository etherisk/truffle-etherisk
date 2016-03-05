var riskContract;
var account;
var joinedGameId;

/*
  j Startup()
  e getMyInProgressGames()
  j FetchGameList()
  u ClearGames()
  e getAvailableGames()
    e getNumberOfPlayers()
    u AddGame()...
    e amIMemberOf()
  j CreateGame() OR JoinGame() (OR amIMemberOf() is true)
  u SetJoinedGame()
  (when we have enough players OR see state is IN_PROGRESS)
  j StartGame()
  e startGame()
*/

function getContract() {
  //return Kindarisky.at('d9e3996d5f4aece4d5878a2e2c8d986653e5532e');
  return Kindarisky.at('0xB4C4CAfe4f5514825602868cD62dB069bb40Bc5f');
}

function getAvailableGames() {
  return getContract().getAvailableGames.call();
}

function Startup() {
  web3.eth.getAccounts((err, accs) => {
    account = accs[0];
    if (!account) {
      throw "You must set an account to play";
    }
    var contract = getContract();
    contract.getMyInProgressGames.call(account).then(games => {
      console.log(games);
      for (var i = 0; i < games.length; ++i) {
        if (games[i] != 0) {
          SetJoinedGame(games[i]);
          return;
        }
      }
      FetchGameList();
    });
  });
}

function FetchGameList(reactElement) {
  var games = [];
  // This is called when the Unity app has finished starting up.
  getAvailableGames().then(games => {
    games.forEach(gameId => {
      if (gameId != 0) {
        getContract().getNumberOfPlayers.call(gameId).then(numPlayers => {
          var game = {
            id : gameId,
            nbPlayers : numPlayers
          }
          games.push(game);
          reactElement.setState({
            data: games
          });
        });
      }
    });
  });
}

function CreateGame() {
  getContract().createGame(4, 0, {from: account});
  FetchGameList();
}

function JoinGame(name) {
  SetJoinedGame(parseInt(name));
  getContract().join(joinedGameId, 0, {from:account});
  UpdatePlayerCount();
}

function SetJoinedGame(gameId) {
  joinedGameId = gameId;
}

function StartGame() {
  getContract().startGame(joinedGameId, 0, {from:account});
}

function UpdatePlayerCount() {
  getContract().getNumberOfPlayers.call(joinedGameId).then(function(numPlayers) {
    var status = numPlayers + " joined out of 4";

    setTimeout(UpdatePlayerCount, 3000);
  });
}

// WORLD

var nextCountryId = 0;

function args() {
  return Array.prototype.join.call(arguments, "/");
}

function WorldStart() {
  setTimeout(UpdateCountry, 1000);
}

function UpdateCountry() {
  getContract().getArmies.call(joinedGameId, nextCountryId).then(function(armies) {
    getContract().getOwners.call(joinedGameId, nextCountryId).then(function(owners) {
      for (var i = 0; i < 16; ++i) {
        var encoded = args(nextCountryId, "Armies: " + armies[i], owners[i]);
        // console.log(encoded);
        SendMessage("WorldMap", 'SetCountry', encoded);
        nextCountryId = (nextCountryId + 1) % 16;
      }
      setTimeout(UpdateCountry, 1000);
    });
  });
}



Startup();
