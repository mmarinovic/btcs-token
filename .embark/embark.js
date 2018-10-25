
import Web3 from '/Users/markomarinovic/.nvm/versions/node/v8.12.0/lib/node_modules/embark/node_modules/web3/src/index.js';

import web3 from 'Embark/web3';

import IpfsApi from 'ipfs-api';

import EmbarkJS from 'embarkjs';
export default EmbarkJS;
global.EmbarkJS = EmbarkJS

var whenEnvIsLoaded = function(cb) {
  if (typeof document !== 'undefined' && document !== null && !/comp|inter|loaded/.test(document.readyState)) {
      document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
}

var whenEnvIsLoaded = function(cb) {
  if (typeof document !== 'undefined' && document !== null && !/comp|inter|loaded/.test(document.readyState)) {
      document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
}

var whenEnvIsLoaded = function(cb) {
  if (typeof document !== 'undefined' && document !== null && !/comp|inter|loaded/.test(document.readyState)) {
      document.addEventListener('DOMContentLoaded', cb);
  } else {
    cb();
  }
}
