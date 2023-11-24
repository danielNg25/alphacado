// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ERC20} from "./MockERC20.sol";
import "./IMintable.sol";

contract ExchangeableSourceChainERC20 is ERC20 {
    IMintable public exchangeToken;
    uint256 public constant RATE_DECIMALS = 10 ** 8;
    uint256 public rate;

    constructor(
        string memory name,
        string memory symbol,
        address _exchangeToken,
        uint256 _rate
    ) ERC20(name, symbol, 18) {
        exchangeToken = IMintable(_exchangeToken);
        rate = _rate;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burnAndMint(address to, uint256 exchangeTokenAmount) external {
        uint256 amount = (exchangeTokenAmount * rate) / RATE_DECIMALS;
        require(
            balanceOf[address(this)] >= amount,
            "ExchangeableSourceChainERC20: insufficient balance"
        );
        exchangeToken.mint(to, amount);
    }
}
