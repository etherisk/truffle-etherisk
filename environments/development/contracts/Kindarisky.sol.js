"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Pudding) {
  // Inherit from Pudding. The dependency on Babel sucks, but it's
  // the easiest way to extend a Babel-based class. Note that the
  // resulting .js file does not have a dependency on Babel.

  var Kindarisky = (function (_Pudding) {
    _inherits(Kindarisky, _Pudding);

    function Kindarisky() {
      _classCallCheck(this, Kindarisky);

      _get(Object.getPrototypeOf(Kindarisky.prototype), "constructor", this).apply(this, arguments);
    }

    return Kindarisky;
  })(Pudding);

  ;

  // Set up specific data for this class.
  Kindarisky.abi = [{ "constant": false, "inputs": [{ "name": "gameId", "type": "uint256" }], "name": "join", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "countryId1", "type": "uint256" }, { "name": "countryId2", "type": "uint256" }], "name": "is_neighbour", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }], "name": "winner", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "countryId1", "type": "uint256" }, { "name": "countryId2", "type": "uint256" }, { "name": "nAttackers", "type": "uint256" }], "name": "attack", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "countryId", "type": "uint256" }], "name": "initialiseCountry", "outputs": [], "type": "function" }, { "constant": true, "inputs": [], "name": "getAvailableGames", "outputs": [{ "name": "result", "type": "int256[10]" }], "type": "function" }, { "constant": false, "inputs": [], "name": "KindaRisky", "outputs": [], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "playId", "type": "uint256" }], "name": "getPlay", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "numRowsMap", "type": "uint256" }], "name": "createGame", "outputs": [], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "countryId", "type": "uint256" }], "name": "getNumberOfArmies", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }], "name": "getNumberOfPlayers", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "playerId", "type": "uint256" }], "name": "getNumCountriesOwned", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "me", "type": "address" }], "name": "amIMemberOf", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "countryId1", "type": "uint256" }, { "name": "countryId2", "type": "uint256" }, { "name": "nMovers", "type": "uint256" }], "name": "move", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "player", "type": "address" }], "name": "addPlayerToGame", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "countryId", "type": "uint256" }], "name": "claimReinforcement", "outputs": [], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }, { "name": "countryId", "type": "uint256" }], "name": "getCountryOwner", "outputs": [{ "name": "", "type": "address" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }], "name": "getNbCountries", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [], "name": "getNumberGames", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }], "name": "getArmies", "outputs": [{ "name": "result", "type": "uint256[256]" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "gameId", "type": "uint256" }], "name": "startGame", "outputs": [], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }], "name": "getOwners", "outputs": [{ "name": "result", "type": "uint256[256]" }], "type": "function" }, { "constant": false, "inputs": [{ "name": "gameId", "type": "uint256" }], "name": "closeIfGameIsFinisehd", "outputs": [], "type": "function" }, { "constant": false, "inputs": [{ "name": "me", "type": "address" }], "name": "getMyInProgressGames", "outputs": [{ "name": "result", "type": "int256[10]" }], "type": "function" }, { "constant": true, "inputs": [{ "name": "gameId", "type": "uint256" }], "name": "getGameState", "outputs": [{ "name": "", "type": "uint256" }], "type": "function" }];
  Kindarisky.binary = "60606040526113ac806100126000396000f3606060405236156101275760e060020a6000350463049878f381146101295780630ba2f937146101855780631cbeae5e146101bd57806329b62c2c1461023b5780632a197316146102a157806340a9eeff146102d8578063418928ae1461035857806344fb8b1d1461039057806348e837b9146103d95780634d4990b51461040e57806362436d9d1461046457806369911f3c146104825780637b433df1146104cb5780638dafb2b3146105565780639d36ac19146105bc578063ad3474631461061d578063c2d167ee14610718578063cbae83341461079a578063d08f023a146107bd578063ddfaebae146107d3578063e5ed1d591461080d578063ee4525d514610877578063ef96db92146108b5578063f2b8b2a6146108c4578063ffde0c7414610934575b005b6107c16004355b60008181526001602052604081206007015460ff1681146109bc57604080517f67616d6520616c72656164792073746172746564000000000000000000000000815290516014918190039190910190a061047d565b6107c16004356024356044355b60008381526001602081905260408220810154908385031415610b9f57808306818506149150610b97565b6103bc6004355b600081815260016020526040812060078101548290819060ff166002141561136c575b6004830154811015611367576000818152600a840160209081526040808320546001870154600160a060020a0391909116808552600b8801909352922054909350600290910a14156113745781935061136c565b61012760043560243560443560643560008481526001602081905260408220600701548291829160ff1614610dc557604080517f67616d65206e6f742072756e6e696e6700000000000000000000000000000000815290519081900360100190a061086e565b6101276004356024355b600082815260016020908152604080832084845260090190915281205414156111cc576111d08282610722565b61095461014060405190810160405280600a905b60008152602001906001900390816102ec575050600080545b806000141580156103165750600a82105b156109895760008181526001602052604081206007015460ff16141561034f57808383600a811015610002576020020152600191909101905b60001901610305565b604080517f4372656174696e67204b696e64615269736b792100000000000000000000000081529051610127916014908290030190a0565b60043560009081526001602090815260408083206024358452600a01909152902054600160a060020a03165b60408051600160a060020a03929092168252519081900360200190f35b610127600435600080546001908101808355808352602091909152604090912060078101805460ff19169055610b7782610130565b6107c16004356024355b60008281526001602090815260408083208484526009019091528120548082141561130e57600160005060008581526020019081526020016000206000506002016000505491506104c4565b6107c16004356000818152600160205260409020600401545b919050565b6107c16004356024356000828152600160209081526040808320848452600a8101835281842054600160a060020a0316808552600b9190910190925290912054905b5092915050565b6107c16004356024355b6000805b6000848152600160205260409020600401548110156113565760406000818120838252600a016020522054600160a060020a038481169116148015610548575060026001600050600086815260200190815260200160002060005060070160009054906101000a900460ff1614155b1561135f57600191506104c4565b61012760043560243560443560643560008481526001602081905260408220600701548291829160ff1614610c0257604080517f67616d65206e6f742072756e6e696e6700000000000000000000000000000000815290519081900360100190a061086e565b6107c16004356024355b600082815260016020526040812060070154819060ff168114610b2d57604080517f67616d6520616c72656164792073746172746564000000000000000000000000815290516014918190039190910190a06104c4565b610127600435602435600082815260016020818152604080842085855260098101835290842060020154868552929091526003015490914283900391909104908111156107125780600160005060008681526020019081526020016000206000506009016000506000858152602001908152602001600020600050600001600082828250540192505081905550806001600050600086815260200190815260200160002060005060030160005054026001600050600086815260200190815260200160002060005060090160005060008581526020019081526020016000206000506002016000828282505401925050819055505b50505050565b6103bc6004356024355b60008281526001602090815260408083208484526009019091528120548180808311156113165760016000506000878152602001908152602001600020600050600901600050600086815260200190815260200160002060005060010160009054906101000a9004600160a060020a0316935061134d565b6107c16004355b600081815260016020819052604090912001546002900a61047d565b6000545b60408051918252519081900360200190f35b61096e60043561200060405190810160405280610100905b60008152602001906001900390816107eb5790505060006000611218846107a1565b6101276004356000818152600160205260408120600701548190819081908190819060ff168114610a0257604080517f67616d6520616c72656164792073746172746564000000000000000000000000815290516014918190039190910190a05b50505050505050565b61096e60043561200060405190810160405280610100905b600081526020019060019003908161088f579050506000600060006000611254866107a1565b61012760043561137c816101c4565b61095460043561014060405190810160405280600a905b60008152602001906001900390816108db575050600080545b806000141580156109055750600a82105b1561098e5760008181526001602081905260409091206007015460ff16148015610995575061099581856104d5565b6107c160043560008181526001602052604090206007015460ff1661047d565b60405180826101408083818460006004602df15093505050f35b6040518082612000808381846000600461030ff15093505050f35b505090565b5050919050565b156109b357808383600a811015610002576020020152600191909101905b600019016108f4565b604080517f6a6f696e696e672067616d65000000000000000000000000000000000000000081529051600c918190039190910190a06109fb82326105c6565b905061047d565b604080517f67616d65206973207374617274696e6721000000000000000000000000000000815290516011918190039190910190a0506000868152600160208190526040822060078101805460ff1916831790554260088201559081015460049190910154600290910a96509450848604935084860692505b8481101561086e576000878152600160209081526040808320848452600a01909152902054600160a060020a0316915082811015610afc578360010160016000506000898152602001908152602001600020600050600b01600050600084600160a060020a0316815260200190815260200160002060005081905550610b25565b6000878152600160209081526040808320600160a060020a0386168452600b0190915290208490555b600101610a7b565b505060008281526001602081815260408084206004810180548086018255808752600a9290920184529185208054600160a060020a031916871790559386905291905254906104c4565b506005600282015560018101839055603c6003820155505050565b600091505b509392505050565b83830360011415610bb857808306818506149150610b97565b600085815260016020819052604090912001548385031415610bdd5760019150610b97565b600085815260016020819052604090912001548484031415610b925760019150610b97565b60008781526001602052604090209250610c1c87876102ab565b610c2687866102ab565b505060008481526009820160205260408082208583529120600182015432600160a060020a03908116911614610c9057604080517f646f65736e2774206f776e20636f756e74727920310000000000000000000000815290516015918190039190910190a061086e565b600181015432600160a060020a03908116911614610ce257604080517f646f65736e2774206f776e20636f756e74727920320000000000000000000000815290516015918190039190910190a061086e565b610ced878787610192565b1515610d2d57604080517f636f756e7472696573206172656e2774206e65696768626f757273000000000081529051601b918190039190910190a061086e565b60008411610d6c57604080517f30206d6f76657273000000000000000000000000000000000000000000000000815290519081900360080190a061086e565b81548410610d7d5781546000190193505b81548490038255805484018155604080517f6d6f7665642061726d69657300000000000000000000000000000000000000008152905190819003600c0190a050505050505050565b60008781526001602052604090209250610ddf87876102ab565b610de987866102ab565b505060008481526009820160205260408082208583529120600182015432600160a060020a03908116911614610ed657604080517f646f65736e2774206f776e2061747461636b20636f756e7472790000000000008152905190819003601a0190a06040805132600160a060020a0316815290519081900360200190a08160010160009054906101000a9004600160a060020a0316600160a060020a03166001026040518082815260200191505060405180910390a0604080517f2d2d2d2d2d2d0000000000000000000000000000000000000000000000000000815290519081900360060190a061086e565b60018181015490830154600160a060020a0390811691161415610f2d57604080517f6f776e7320626f746820636f756e747269657300000000000000000000000000815290516013918190039190910190a061086e565b610f38878787610192565b1515610f7857604080517f636f756e7472696573206172656e2774206e65696768626f757273000000000081529051601b918190039190910190a061086e565b81548410610f895781546000190193505b60008411610fc857604080517f61726d79206861732073697a65203000000000000000000000000000000000008152905190819003600f0190a061086e565b8154849003825580548411156110e057604080517f436f756e74727920636f6e717565726564000000000000000000000000000000815290519081900360110190a060018281018054600160a060020a039081166000908152600b8701602052604080822080548601905593870154925490911681529190912054600290910a14156110975760405180807f416c6c20636f756e747269657320636f6e717565726564000000000000000000815260200150601701905060405180910390a060078301805460ff191660021790555b60018181018054600160a060020a039081166000908152600b8701602052604090208054600019019055918401548154600160a060020a03191692169190911790558054840381555b805484141561112357604080517f436f756e74727920626172656c7920646566656e646564000000000000000000815290516017918190039190910190a0600181555b805484101561117357604080517f436f756e74727920646566656e64656400000000000000000000000000000000815290519081900360100190a083816000016000828282505403925050819055505b604080517f41747461636b20636f6d706c6574656400000000000000000000000000000000815290519081900360100190a050505050505050565b60008381526001602090815260408083208584526009019091529020555b5050565b6000838152600160208181526040808420868552600981019092529092209081018054600160a060020a03191690931790925560080154600291909101556111ae8282610418565b9150600090505b818160ff16101561098e57611237848260ff16610418565b83826101008110156100025750506020820284015260010161121f565b9350600091505b60008681526001602052604090206004015460ff831610156112b2576040600081812060ff8516808352600a91909101602090815283832054600160a060020a03168352869052919020556001919091019061125b565b5060005b838160ff1610156112d1578260006112da888460ff16610722565b50505050919050565b600160a060020a031681526020019081526020016000206000505485826101008110156100025760200201526001016112b6565b8091506104c4565b5050600084815260016020908152604080832060048101548706808552600a9190910190925290912054600160a060020a03169250825b50505092915050565b600091506104c4565b6001016104d9565b600093505b505050919050565b6001016101e7565b600160a060020a03166000146113a9576000818152600160205260409020600701805460ff191660021790555b5056";

  if ("0x4d35fd700387312fa22fd989af30036866d960e8" != "") {
    Kindarisky.address = "0x4d35fd700387312fa22fd989af30036866d960e8";

    // Backward compatibility; Deprecated.
    Kindarisky.deployed_address = "0x4d35fd700387312fa22fd989af30036866d960e8";
  }

  Kindarisky.generated_with = "1.0.3";
  Kindarisky.contract_name = "Kindarisky";

  return Kindarisky;
};

// Nicety for Node.
factory.load = factory;

if (typeof module != "undefined") {
  module.exports = factory;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Kindarisky = factory;
}