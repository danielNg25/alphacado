// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "../../interfaces/IAlphacado.sol";
import "../../libraries/UniswapV2Library.sol";
import "../../adapters/AdapterBase.sol";
import "../../mock/MockERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract OpenSeaAdapter is AdapterBase {
    constructor(address _alphacado) AdapterBase(_alphacado) {}

    function fromNFT(
        IERC721 token,
        uint256 tokenId,
        uint256 minimumSendAmount,
        uint16 targetChain,
        uint16 targetChainActionId,
        address receipient,
        bytes calldata payload
    ) external payable {
        address USDC = alphacado.USDC();

        token.transferFrom(msg.sender, address(this), tokenId);

        ERC20Mock(USDC).mint(address(alphacado), minimumSendAmount);
        uint256 receivedAmount = minimumSendAmount;
        require(
            receivedAmount >= minimumSendAmount,
            "OpenSeaAdapter: receivedAmount < minimumSendAmount"
        );

        alphacado.sendCrossChainRequest{value: msg.value}(
            msg.sender,
            targetChain,
            targetChainActionId,
            receipient,
            receivedAmount,
            payload
        );
    }

    function executeReceived(
        uint16 sourceChainId,
        uint256 sourceChainRequestId,
        address token,
        uint256 amount,
        address receipient,
        // payload shouble abi encode of (targetChainRouter, targetChainTokenB, targetChainMinimumReceiveLiquidity)
        bytes memory payload
    ) external override {
        revert("OpenSeaAdapter: not implemented");
    }
}
