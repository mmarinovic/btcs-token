pragma solidity ^0.4.23;

import "mmarinovic-ethereumisc/contracts/Ownable.sol";
import "mmarinovic-ethereumisc/contracts/Erc20.sol";

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) external; }

contract BtcsToken is Ownable, Erc20 {

    string public name;
    string public symbol;
    uint public decimals;

    event Burn(address indexed from, uint value);

    constructor(uint _totalSupply) public {
        name = "BTCS";
        symbol = "BTCS";
        decimals = 0;
        totalSupply = _totalSupply;

        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint value) public returns (bool success){
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(address from, address to, uint value) public returns (bool success){
        require(value <= allowance[from][msg.sender]);

        allowance[from][msg.sender] -= value;
        _transfer(from, to, value);

        return true;
    }

    function approve(address spender, uint value) public returns (bool succes) {
        allowance[msg.sender][spender] = value;
        return true;
    }

    function approveAndCall(address spender, uint value, bytes extraData) public returns (bool success){
        tokenRecipient _spender = tokenRecipient(spender);
        if(approve(spender, value)){
            _spender.receiveApproval(msg.sender, value, this, extraData);
            return true;
        }
    }

    function burnFrom(address from, uint value) public returns (bool success){

        require(balanceOf[from] >= value);
        if(msg.sender != owner){
            require(allowance[from][msg.sender] >= value);
        }

        balanceOf[from] -= value;
        allowance[msg.sender][from] -= value;
        totalSupply -= value;

        emit Burn(from, value);

        return true;
    }

    function mint(address to, uint value) public onlyOwner{
        require(balanceOf[to] + value > balanceOf[to]);

        balanceOf[to] += value;
        totalSupply += value;

        emit Transfer(owner, to, value);
    }

    function() public payable {}

    function _transfer(address from, address to, uint value) internal{
        require(to != 0x0);
        require(balanceOf[from] >= value);
        require(balanceOf[to] + value >= balanceOf[to]);

        uint previousBalance = balanceOf[from] + balanceOf[to];

        balanceOf[from] -= value;
        balanceOf[to] += value;

        emit Transfer(from, to, value);

        assert(balanceOf[from] + balanceOf[to] == previousBalance);
    }
}