//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract Bond is ERC20, Ownable {
    using Strings for uint256;

    struct Props {
        string issuer;
        uint dateMaturity;
        uint dateCreated;
        uint256 coupone;
        uint256 couponePreiod;
        uint256 faceValue;
        uint256 bondPrice;
        uint256 bondYeld;
    }

    Props props;

    mapping(uint256 => uint256) public tokenIdToPrice;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        Props memory _props,
        uint256 initialSupply
    ) ERC20(_tokenName, _tokenSymbol) {        
        _mint(msg.sender, initialSupply * 10**uint(decimals())); //ERC20 tokens have 18 decimals 
        props = _props;
    }

    event BondMinted(address indexed _from, uint256 _tokenId);

    function getBondPrice(uint256 tokenId) public view returns (uint256) {
        return tokenIdToPrice[tokenId];
    }

    /**
     * Src:
     * https://gist.githubusercontent.com/sicongzhao/1254bac843322355235c2cd13677747a/raw/96357ae98275a190c67f77dc55fecaba7dd2689e/division_v3.sol
     *
     * @param decimalPlaces number of digits after the decimal point
     * @param numerator divident
     * @param denominator / devider
     * @return quotient 
     * @return remainder 
     * @return result toString result
     */
    function division(
        uint256 decimalPlaces,
        uint256 numerator,
        uint256 denominator
    )
        internal
        pure
        returns (uint256 quotient, uint256 remainder, string memory result)
    {
        uint256 factor = 10 ** decimalPlaces;
        quotient = numerator / denominator;
        bool rounding = 2 * ((numerator * factor) % denominator) >= denominator;
        remainder = ((numerator * factor) / denominator) % factor;
        if (rounding) {
            remainder += 1;
        }
        result = string(
            abi.encodePacked(
                quotient.toString(),
                ".",
                numToFixedLengthStr(decimalPlaces, remainder)
            )
        );
    }

    function numToFixedLengthStr(
        uint256 decimalPlaces,
        uint256 num
    ) internal pure returns (string memory result) {
        bytes memory byteString;
        for (uint256 i = 0; i < decimalPlaces; i++) {
            uint256 remainder = num % 10;
            byteString = abi.encodePacked(remainder.toString(), byteString);
            num = num / 10;
        }
        result = string(byteString);
    }

    function getProps() public view returns (Props memory) {
        return props;
    }
}
