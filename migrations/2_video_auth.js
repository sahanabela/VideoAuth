const VideoAuth = artifacts.require("./VideoAuth.sol");

module.exports = function(deployer) {
  deployer.deploy(VideoAuth);
};
