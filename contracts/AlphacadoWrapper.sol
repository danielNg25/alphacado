// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Alphacado.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AlphacadoWrapper {
    Alphacado public alphacado;
    IERC20 public USDC;

    constructor(address _alphacado, address _USDC) {
        alphacado = Alphacado(_alphacado);
        USDC = IERC20(_USDC);
    }

    function sendCrossChainRequest(
        address sender,
        uint16 targetChain,
        uint16 targetChainActionId,
        address receipient,
        uint256 amountUSDC,
        bytes calldata payload
    ) public payable {
        USDC.transferFrom(sender, address(alphacado), amountUSDC);

        alphacado.sendCrossChainRequest{value: msg.value}(
            sender,
            targetChain,
            targetChainActionId,
            receipient,
            amountUSDC,
            payload
        );
    }
}
