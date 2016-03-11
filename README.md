# truffle-etherisk

Installation instructions

First install nodejs
-> curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
-> sudo apt-get install -y nodejs

Then install the packages
-> npm install -g truffle
-> npm install -g ethereumjs-testrpc

Clone
-> git clone https://github.com/etherisk/truffle-etherisk.git
-> git checkout no-unity

Run testrpc:
-> testrpc

New terminal:
-> truffle deploy (redo this after each code change)
-> truffle serve

You need to install mist browser
As long as the released version is only the wallet, you need to install the branch version
See Development version installation for more details
project at: https://github.com/ethereum/mist

When mist is installed
-> You need to switch to testnet
-> You can do that by going to Development -> Network -> Testnet

Then create an account
-> Go to https://zerogox.com/ethereum/wei_faucet to get ETH

To open the application:
-> open the page http://localhost:8080
-> press on the "plus" button to add the current page to the registered dApp