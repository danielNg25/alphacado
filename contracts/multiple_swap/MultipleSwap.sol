// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../mock/ExchangeToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error InvalidInput();

contract MultipleSwap {
    ExchangeableToken immutable exchange;

    constructor(address _exchange) {
        exchange = ExchangeableToken(_exchange);
    }

    function swap(
        address[] memory inTokens,
        address outToken,
        uint256[] memory amounts
    ) external {
        if (inTokens.length != amounts.length) {
            revert InvalidInput();
        }

        for (uint256 i = 0; i < inTokens.length; i++) {
            IERC20(inTokens[i]).transferFrom(
                msg.sender,
                address(this),
                amounts[i]
            );
            exchange.exchangeToken(inTokens[i], outToken, amounts[i]);
        }
    }
}
