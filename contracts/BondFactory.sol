//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// TODO Market place contract for sending one contract in a series to the owner 


contract BondFactory is ERC20, Ownable  {


    constructor(uint256 initialSupply) ERC20("BondFacory", "BND") {
        _mint(msg.sender, initialSupply);
    }

}