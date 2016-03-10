var riskContract;
var account;
var button;
var background;
var games = {};
var gameIds = [];

function getContract() {
  return Kindarisky.at('0x3e6218DC007EF5986C24B9883Fa8B8F843546E51');
}

function getAvailableGames() {
  return getContract().getAvailableGames.call();
}

function LoadAccount() {
  web3.eth.getAccounts((err, accs) => {
    account = accs[0];
    if (!account) {
      throw "You must set an account to play";
    }
    web3.eth.defaultAccount = account;
  });
}

function removeOldGames(oldGames) {
  gameIds = gameIds.filter( el => {
    return oldGames.indexOf( el ) < 0;
  });

  oldGames.forEach(id => delete games[id]);
}

function updateGames(reactElement) {
  gameIds.forEach(id => {
    var currentGame = games[id];
    if(!currentGame){
      games[id] = {id:id};
      currentGame = games[id];
    }
    getContract().getNumberOfPlayers.call(id).then(numP => {
      var numPlayers = parseInt(numP.toString());
      getContract().amIMemberOf.call(id,account).then(isMember => {
        getContract().getGameState.call(id).then(state => {
          var gameState = parseInt(state.toString());
          currentGame.nbPlayers = numPlayers.toString();
          currentGame.isMember = isMember;
          currentGame.state=  gameState === 0 ? 'CREATED' : gameState === 1 ? 'IN_PROGRESS' : 'DONE'
          var gameObjects = gameIds.map(id => games[id]);
          reactElement.setState({
            data: gameObjects
          });
        });
      });
    });
    
  });
}

function FetchGameList(reactElement) {
  var gameObjects = [];
  // This is called when the Unity app has finished starting up.
  
  getAvailableGames().then(result => {
    var games = result.map(function(id){
      return id.toString();
    }).filter(function(id) {
      return id !== "0";
    });

    var oldGames = $(gameIds).not(games).get();
    var newGames = $(games).not(gameIds).get();

    removeOldGames(oldGames);
    gameIds = gameIds.concat(newGames);
    updateGames(reactElement);
  });
}

function TxCallback(err,response) {
  alert(err);
  alert(response);
}

function CreateGame() {
  $('#waiting').modal('show');
  getContract().createGame(4,4).then(function() {
    $('#waiting').modal('hide');
  });  
}

function errorHandling(err){
  console.error(err);
}

function UpdatePlayerCount() {
  getContract().getNumberOfPlayers.call(joinedGameId).then(function(numPlayers) {
    var status = numPlayers + " joined out of 4";
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
        
        nextCountryId = (nextCountryId + 1) % 16;
      }
      setTimeout(UpdateCountry, 1000);
    });
  });
}
