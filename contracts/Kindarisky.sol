contract Kindarisky {

    struct Country {
        uint id;
        uint nbNeighbors;
        mapping(uint => Country) neighbors;
        uint numArmy;
        address owner;
        uint bonus;
        uint lastGrowth;
    }

    enum GameState {CREATED, IN_PROGRESS, DONE}

    struct Game {
        uint gameID;
        address owner;
        uint numRowsMap;
        uint nbCountries;
        uint nbPlayers;
        uint minPlayers;
        uint maxPlayers;
        GameState state;
        mapping(uint => Country) countries;
        mapping(uint => address) players;
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
        log0("joining game");
        return addPlayerToGame(gameId,tx.origin);
    }

    function startGame(uint gameId) {
        log0("game is starting!");
        assignPlayersToCountries(gameId);
    }

    function addPlayerToGame(uint gameId, address player) returns (uint) {
        uint newplayer=games[gameId].nbPlayers;
        games[gameId].nbPlayers++;
        games[gameId].players[newplayer]=player;
        return games[gameId].nbPlayers;
    }

    function createGame(uint numRowsMap) public {
        uint gameId = nbGames;
        nbGames++;
        Game newGame = games[gameId];

        newGame.numRowsMap = numRowsMap;
        newGame.nbCountries = numRowsMap ** 2;

        for (uint i; i<newGame.nbCountries; i++){
            newGame.countries[i].id = i;
            newGame.countries[i].numArmy = 4 + i;
            newGame.countries[i].bonus = 5;
            newGame.countries[i].lastGrowth =0;
        }
    }

    function getNumberOfPlayers(uint gameId) returns (uint) {
        return games[gameId].nbPlayers;
    }

    function getPlay(uint gameId, uint playId) returns (address) {
        return games[gameId].players[playId];
    }


    function assignPlayersToCountries(uint gameId) public { // pass gameID and players
        // for each player who was joined, assign player to country in a round-robin manner
        uint j=0;
        Game current = games[gameId];
        for (uint i=0; i<current.nbCountries; i++){
            if (j>=current.nbPlayers) {
                j=0;
            }
            current.countries[i].owner = current.players[j];
            j++;
        }
    }

    function joinWaitingRoom(uint roomNumber) public {

    }

    function is_neighbour(uint gameId, uint countryId1, uint countryId2) returns (bool) {
        if (countryId1 - countryId2 == 1) {return true;}
        if (countryId2 - countryId1 == 1) {return true;}
        if (countryId1 - countryId2 == games[gameId].numRowsMap) {return true;}
        if (countryId2 - countryId1 == games[gameId].numRowsMap) {return true;}
        return false;
    }

    function move(uint gameId, uint countryId1, uint countryId2, uint nArmy) {
        Game currentGame = games[gameId];
        Country from = currentGame.countries[countryId1];
        Country to = currentGame.countries[countryId2];

        if (tx.origin != from.owner)  {
            log0("doesn't own country 1");  // the caller doesn't own both countries
            return;
        }
        if (from.owner != to.owner) {
            log0("different owners");
            return;
        }

        if (!is_neighbour(gameId, countryId1, countryId2)) {
            log0("countries aren't neighbours");
            return;
        }                   // countries aren't neighbours
        if (nArmy <= 0) {
            log0("army has size 0");
            return;
        }                                                                  // army has size 0
        if (nArmy >= from.numArmy) {nArmy = from.numArmy - 1;}                                                                  // not enough armys available in country 1

        from.numArmy -= nArmy;
        to.numArmy += nArmy;
        //log0("moved armies");
    }

    function attack(uint gameId, uint countryId1, uint countryId2, uint nAttackers) {
        Game currentGame = games[gameId];
        Country from = currentGame.countries[countryId1];
        Country to = currentGame.countries[countryId2];

        if (tx.origin != from.owner) {
            log0("doesn't own attack country");
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

    function getNumberOfArmies(uint gameId, uint countryId) returns (uint){
        return games[gameId].countries[countryId].numArmy;
    }

    function getCountryOwner(uint gameId, uint countryId) returns (address){
        return games[gameId].countries[countryId].owner;
    }

    function takeCountryCheat(uint gameId, uint countryId){
        games[gameId].countries[countryId].owner = tx.origin;
    }
}
