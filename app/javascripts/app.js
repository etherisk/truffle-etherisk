var games = {};
var gameIds = [];

function getContract() {
  return Kindarisky.at('0xa1654665B36a742F4f55074f8C60c2545C5A4007');
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
      getContract().amIMemberOf.call(id,web3.eth.defaultAccount).then(isMember => {
        getContract().getGameState.call(id).then(state => {
          var gameState = parseInt(state.toString());
          currentGame.nbPlayers = numPlayers.toString();
          currentGame.isMember = isMember;
          currentGame.state = gameState === 0 ? 'CREATED' : gameState === 1 ? 'IN_PROGRESS' : 'DONE'
          getContract().getMyPlayerId(id,web3.eth.defaultAccount).then(playerId => {
            currentGame.myPlayerId = parseInt(playerId);
          });
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
    var games = result.map(id => {
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