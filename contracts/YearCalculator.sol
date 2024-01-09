// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

library Year{
    function convertToBlockYear(uint256 _year) internal view returns(uint256 blockYear){
        uint256 secondInYear = 365 * 24 * 60 * 60;
        blockYear = block.timestamp + (_year * secondInYear);
    }
}