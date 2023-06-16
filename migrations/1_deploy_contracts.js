
//const { artifacts } = require("truffle");
const  cont = artifacts.require("./cont.sol");

module.exports = function(deployer) {
  
  deployer.deploy( cont );

};