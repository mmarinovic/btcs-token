const BtcsToken = require('Embark/contracts/BtcsToken');
let accounts;

config({
  contracts: {
    BtcsToken: {
      args: {
        _totalSupply: 1000
      }
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("BtcsToken", function () {
  this.timeout(0);

  it("should set constructor initial supplz", async function () {
    let result = await BtcsToken.methods.totalSupply().call();
    assert.strictEqual(parseInt(result, 10), 1000);
  });

  it("should set initial supply to owner", async function () {
    let balance = await BtcsToken.methods.balanceOf(accounts[0]).call();
    console.log(balance)
    assert.strictEqual(parseInt(balance, 10), 1000);
  });
});

