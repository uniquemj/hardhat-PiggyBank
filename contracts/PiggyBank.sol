//SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import {Year} from "./YearCalculator.sol";

error PiggyBank_NotOwner();
error PiggyBank_InvalidAmount(uint256 amount);

contract PiggyBank{
    using Year for uint256;

    address[] private s_depositers;
    address private immutable i_owner;
    mapping(address => uint256) private s_addressToAmountDeposited;
    mapping(address => uint256) private s_addressToTimer;

    event DepositAmount(address indexed user, uint256 fund);
    event WithDrawAmount(address indexed user, uint256 fund); 

    modifier onlyOwner(){
        if(msg.sender != i_owner){
            revert PiggyBank_NotOwner();
        }
        _;
    }

    constructor(){
        i_owner = msg.sender;
    }

    function setTimer(uint256 _year) external{
        s_addressToTimer[msg.sender] = _year.convertToBlockYear();
    }

    function deposit() public payable{
        if(msg.value <= 0){
            revert PiggyBank_InvalidAmount(msg.value);
        }
        
        s_depositers.push(msg.sender);
        s_addressToAmountDeposited[msg.sender] += msg.value;
        
        emit DepositAmount(msg.sender, msg.value);
    }

    function withdraw() external {
        require(block.timestamp >= s_addressToTimer[msg.sender], "should be more than or equal to the set time");

        uint256 fund = s_addressToAmountDeposited[msg.sender];
        s_addressToAmountDeposited[msg.sender] = 0;
        s_addressToTimer[msg.sender] = 0;

        (bool callSuccess,) = payable(msg.sender).call{value: fund}("");
        require(callSuccess, "Call Failed");

        emit WithDrawAmount(msg.sender, fund);
    }

    function getBalance() external view returns (uint256){
        return s_addressToAmountDeposited[msg.sender];
    }

    function getTimer() external view returns (uint256){
        return s_addressToTimer[msg.sender];
    }

    function getOwner() external view returns (address){
        return i_owner;
    }

    function getDepositer(uint256 _index) external view returns (address) {
        return s_depositers[_index];
    }
    
    receive() external payable{
        deposit();
    }

    fallback() external payable{
        deposit();
    }
}