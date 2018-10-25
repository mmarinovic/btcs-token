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
  accounts = web3_accounts;
});

contract("BtcsToken", function () {
  this.timeout(0);

  it("should set constructor initial supplz", async function () {
    let result = await BtcsToken.methods.totalSupply().call();
    assert.strictEqual(parseInt(result, 10), 1000);
  });

  it("should set initial supply to owner", async function () {
    let balance = await BtcsToken.methods.balanceOf(accounts[0]).call();
    assert.strictEqual(parseInt(balance, 10), 1000);
  });

  it("should mint tokens to address", async function(){
    let balanceToMint = 500;
    let balanceBeforeMint = await BtcsToken.methods.balanceOf(accounts[1]).call();
    await BtcsToken.methods.mint(accounts[1], balanceToMint).send();
    let balanceAfterMint = await BtcsToken.methods.balanceOf(accounts[1]).call();
    assert.strictEqual(parseInt(balanceAfterMint, 10), parseInt(balanceBeforeMint, 10) + balanceToMint);
  });

  it("should burn tokens from address", async function(){
    let balanceToBurn = 500;
    let balanceBeforeBurn = await BtcsToken.methods.balanceOf(accounts[1]).call();
    await BtcsToken.methods.burnFrom(accounts[1], balanceToBurn).send();
    let balanceAfterBurn = await BtcsToken.methods.balanceOf(accounts[1]).call();
    assert.strictEqual(parseInt(balanceAfterBurn, 10), parseInt(balanceBeforeBurn, 10) - balanceToBurn);
  });
});