contract Kindarisky {

    struct Country {
        uint id;
        uint nbNeighbors;
        mapping(uint => Country) neighbors;
        uint numArmy;
        address owner;
        uint bonus;
        uint lastReinforcementTime;
    }

    enum GameState {CREATED, IN_PROGRESS, DONE}

    struct Game {
        uint gameID;
        address owner;
        uint numRowsMap;
        uint defaultNumArmy;
        uint reinforcementRate;
        uint nbPlayers;
        uint minPlayers;
        uint maxPlayers;
        GameState state;
        uint startTime;
        mapping(uint => Country) countries;
        mapping(uint => address) players;
        mapping(address => uint) countries_owned;
    }

    uint nbGames;

    mapping(uint => Game) games;

    function KindaRisky() {
        log0("Creating KindaRisky!");
    }

    function getAvailableGames() public returns(int[10] result) {
        uint found = 0;
        uint i;
        for(i = 0; i < 10; i++) {
            result[i] = -1;
        }
        for(i = nbGames ; i != 0 && found < 10; i--) {
            if(games[i].state == GameState.CREATED) {
                result[found] = int256(i);
                found++;
            }
        }
    }

    function getNumberGames() constant returns(uint) { return nbGames; }

    function getGameState(uint gameId) constant returns(uint) { return uint(games[gameId].state); }

    function join(uint gameId) public returns (uint){
        if (games[gameId].state != GameState.CREATED) {
            log0("game already started");
            return;
        }
        log0("joining game");
        return addPlayerToGame(gameId,tx.origin);
    }

    function startGame(uint gameId) {
        if (games[gameId].state != GameState.CREATED) {
            log0("game already started");
            return;
        }
        log0("game is starting!");
        games[gameId].state = GameState.IN_PROGRESS;
        games[gameId].startTime = now;

        uint nbCountries = games[gameId].numRowsMap ** 2;
        uint nArmies = nbCountries / games[gameId].nbPlayers;


    }

    function addPlayerToGame(uint gameId, address player) returns (uint) {
        if (games[gameId].state != GameState.CREATED) {
            log0("game already started");
            return;
        }
        uint newplayer=games[gameId].nbPlayers;
        games[gameId].nbPlayers++;
        games[gameId].players[newplayer]=player;
        return games[gameId].nbPlayers;
    }

    function createGame(uint numRowsMap) public {
        uint gameId = nbGames;
        nbGames++;
        Game newGame = games[gameId];
        newGame.state = GameState.CREATED;
        join(gameId);

        newGame.defaultNumArmy = 5;
        newGame.numRowsMap = numRowsMap;
        newGame.reinforcementRate = 1 minutes;
    }

    function getNumberOfPlayers(uint gameId) returns (uint) {
        return games[gameId].nbPlayers;
    }

    function getPlay(uint gameId, uint playId) returns (address) {
        return games[gameId].players[playId];
    }

    function is_neighbour(uint gameId, uint countryId1, uint countryId2) returns (bool) {
        if (countryId1 - countryId2 == 1) {return true;}
        if (countryId2 - countryId1 == 1) {return true;}
        if (countryId1 - countryId2 == games[gameId].numRowsMap) {return true;}
        if (countryId2 - countryId1 == games[gameId].numRowsMap) {return true;}
        return false;
    }

    function move(uint gameId, uint countryId1, uint countryId2, uint nMovers) {
        if (games[gameId].state != GameState.IN_PROGRESS) {
            log0("game not running");
            return;
        }
        Game currentGame = games[gameId];

        initialiseCountry(gameId, countryId1);
        initialiseCountry(gameId, countryId2);

        Country from = currentGame.countries[countryId1];
        Country to = currentGame.countries[countryId2];

        if (tx.origin != from.owner)  {
            log0("doesn't own country 1");  // the caller doesn't own both countries
            return;
        }
        if (tx.origin != to.owner) {
            log0("doesn't own country 2");
            return;
        }

        if (!is_neighbour(gameId, countryId1, countryId2)) {
            log0("countries aren't neighbours");
            return;
        }                   // countries aren't neighbours
        if (nMovers <= 0) {
            log0("0 movers");
            return;
        }
        if (nMovers >= from.numArmy) {nMovers = from.numArmy - 1;}

        from.numArmy -= nMovers;
        to.numArmy += nMovers;
        log0("moved armies");
    }

    function attack(uint gameId, uint countryId1, uint countryId2, uint nAttackers) {
        if (games[gameId].state != GameState.IN_PROGRESS) {
            log0("game not running");
            return;
        }
        Game currentGame = games[gameId];

        initialiseCountry(gameId, countryId1);
        initialiseCountry(gameId, countryId2);

        Country from = currentGame.countries[countryId1];
        Country to = currentGame.countries[countryId2];

        if (tx.origin != from.owner) {
            log0("doesn't own attack country");
            return;
        }

        if (from.owner == to.owner){
            log0("owns both countries");
            return;
        }

        if (!is_neighbour(gameId, countryId1, countryId2)) {
            log0("countries aren't neighbours");
            return;
        }
        if (nAttackers >= from.numArmy) {
            nAttackers = from.numArmy - 1;
        }
        if (nAttackers <= 0) {
            log0("army has size 0");
            return;
        }

        from.numArmy -= nAttackers;
        if(nAttackers > to.numArmy) {
            log0('Country conquered');
            to.owner = from.owner;
            to.numArmy = nAttackers - to.numArmy;
        }

        if(nAttackers == to.numArmy) {
            log0('Country barely defended');
            to.numArmy = 1;
        }

        if(nAttackers < to.numArmy) {
            log0('Country defended');
            to.numArmy -= nAttackers;
        }
        log0('Attack completed');
    }

    function initialiseCountry(uint gameId, uint countryId) {
        games[gameId].countries[countryId].numArmy = getNumberOfArmies(gameId, countryId);
        games[gameId].countries[countryId].owner = getCountryOwner(gameId, countryId);
        games[gameId].countries[countryId].lastReinforcementTime = games[gameId].startTime;
    }

    function getNumberOfArmies(uint gameId, uint countryId) returns (uint){
        uint nArmy = games[gameId].countries[countryId].numArmy;
        if ( nArmy == 0){ return games[gameId].defaultNumArmy; }
        else            { return nArmy;}
    }

    function getCountryOwner(uint gameId, uint countryId) returns (address){
        uint nArmy = games[gameId].countries[countryId].numArmy;
        if ( nArmy > 0)
        {
            return games[gameId].countries[countryId].owner;
        }
        else
        {
            uint playerId = countryId % games[gameId].nbPlayers;
            log0(bytes32(playerId));
            address player = games[gameId].players[playerId];
            log0(bytes32(player));
            return player;
        }
    }

    // function takeCountryCheat(uint gameId, uint countryId){
    //     games[gameId].countries[countryId].owner = tx.origin;
    // }

    function claimReinforcement(uint gameId, uint countryId) {
        uint lastTime = games[gameId].countries[countryId].lastReinforcementTime;
        uint nbArmies = (now - lastTime) / games[gameId].reinforcementRate;
        if(nbArmies > 0) {
            games[gameId].countries[countryId].numArmy += nbArmies;
            games[gameId].countries[countryId].lastReinforcementTime += games[gameId].reinforcementRate * nbArmies ;
        }
    }
}
