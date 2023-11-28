// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./ExchangeableTargetChainERC20.sol";

contract ExchangeableToken {
    mapping(address => mapping(address => uint256)) rates;
    uint256 public constant RATE_DECIMALS = 10 ** 8;

    constructor() {}

    function exchangeToken(address from, address to, uint256 amount) external {
        uint256 rate = rates[from][to];
        ExchangeableTargetChainERC20(from).transferFrom(
            msg.sender,
            address(this),
            amount
        );

        uint256 exchangeAmount = (amount * rate) / RATE_DECIMALS;
        ExchangeableTargetChainERC20(to).mintNormally(
            msg.sender,
            exchangeAmount
        );
    }

    function setRate(address from, address to, uint256 rate) external {
        rates[from][to] = rate;

        rates[to][from] = (RATE_DECIMALS * RATE_DECIMALS) / rate;
    }
}
