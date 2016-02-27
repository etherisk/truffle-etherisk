import "std.sol";

contract KindaRisky is named("KindaRisky") {
    
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
    
    function getNumberGames() constant returns(uint) { return nbGames; }
    
    function getGameState(uint gameId) constant returns(uint) { return uint(games[gameId].state); }
    
    function join(uint gameId) public returns (uint){
        log0("joining game");
        return addPlayerToGame(gameId,msg.sender);
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
    
    function createGame() public {
        uint gameId = nbGames;
        nbGames++;
        Game newGame = games[gameId];
        
        newGame.nbCountries = 4;
        
        for (uint i; i<newGame.nbCountries; i++){
            newGame.countries[i].id = i;
            newGame.countries[i].numArmy = 4 + i;
            newGame.countries[i].bonus = 5;
            newGame.countries[i].lastGrowth =0;
        }
 
        // create links between countries;
        linkNeighbors(gameId,0,1);
        linkNeighbors(gameId,2,3);
        linkNeighbors(gameId,1,3);
        linkNeighbors(gameId,3,0);
    }
    
    function getNumberOfPlayers(uint gameId) returns (uint) {
        return games[gameId].nbPlayers;
    }
    
    function getPlay(uint gameId, uint playId) returns (address) {
        return games[gameId].players[playId];
    }
    
    /*
    Abstract of game turns:
    - move armies and resolve battles
    - generate new armies on countries
    */
    
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
    
    function linkNeighbors(uint gameId, uint id1, uint id2) {
        games[gameId].countries[id1].neighbors[id2] = games[gameId].countries[id2];
        games[gameId].countries[id2].neighbors[id1] = games[gameId].countries[id1];
        games[gameId].countries[id1].nbNeighbors++;
        games[gameId].countries[id2].nbNeighbors++;
    }
    
    function joinWaitingRoom(uint roomNumber) public {
        
    }
    
    function is_neighbour(uint gameId, uint countryId1, uint countryId2) returns (bool) {
        //  mapping(uint => Country) neighbors;
        for (uint i=0; i<games[gameId].countries[countryId1].nbNeighbors; i++) {
            if (games[gameId].countries[countryId1].neighbors[i].id == countryId2)
            { return true; }
        }
        return false;
    }
    
    function move(uint gameId, uint countryId1, uint countryId2, uint nArmy) {
        Game currentGame = games[gameId];
        Country from = currentGame.countries[countryId1];
        Country to = currentGame.countries[countryId2];
        
        if (msg.sender != from.owner)  {
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
            return; }                                                                  // army has size 0
        if (nArmy >= from.numArmy) {nArmy = from.numArmy - 1;}                                                                  // not enough armys available in country 1
        
        from.numArmy -= nArmy;
        to.numArmy += nArmy;
        log0("moved armies");
    }
    
    function attack(uint gameId, uint countryId1, uint countryId2, uint nAttackers) {
        Game currentGame = games[gameId];
        Country from = currentGame.countries[countryId1];
        Country to = currentGame.countries[countryId2];
        
        if (msg.sender != from.owner) {
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
        
    /*
    
    */
    function takeCountryCheat(uint gameId, uint countryId){
        games[gameId].countries[countryId].owner = msg.sender;
    }    
    
     uint register=239847293742347;
    
    function setSeed(uint seed){
        register=seed;
    }
    
     function getRandomNumber() public returns (uint) { 
         uint shiftOut=0;
         for (uint i=0; i<32; i++) {
             register = ((((register /2**31) 
                   ^ (register /2**6)   
                   ^ (register /2**4)   
                   ^ (register /2**2)   
                   ^ (register /2**1)   
                   ^ register)         
                   & 0x0000001)  *2**31)               
                   | (register /2**1);  
             shiftOut=shiftOut|(register&0x1);
             shiftOut*=2;
         }
         return shiftOut;
     }
     
     function getRandomBit() public returns (bool) { 
             register = ((((register /2**31) 
                   ^ (register /2**6)   
                   ^ (register /2**4)   
                   ^ (register /2**2)   
                   ^ (register /2**1)   
                   ^ register)         
                   & 0x0000001)  *2**31)               
                   | (register /2**1);  
             
         return (register&0x1)==1;
     }

    // function getRandomNumber(uint n) returns (uint) { // so far we are going to use blk_nonce as a random seed xored with the caller address
    //     uint register;                                // 
    //     uint shiftOut;
    //     for (uint i=0; i<32; i++) {
    //     register = ((((register >> 31) 
    //           ^ (register >> 6)   
    //           ^ (register >> 4)   
    //           ^ (register >> 2)   
    //           ^ (register >> 1)   
    //           ^ register)         
    //           & 0x0000001)        
    //           <<31)               
    //           | (register >> 1);  
    //      }
    //     //shiftOut|= (register&0x1)
    //     //shiftOut  1;
    //     //return 0;
    //     return shiftOut;
    // }
    
}