import { ethers } from "ethers";

const gen = (
    targetChainUniV2Router: string,
    targetChainTokenB: string,
    minimumLiquidityReceiveTargetChain: bigint,
) => {
    const payload = ethers.AbiCoder.defaultAbiCoder().encode(
        ["address", "address", "uint256", "bytes"],
        [
            targetChainUniV2Router,
            targetChainTokenB,
            minimumLiquidityReceiveTargetChain,
            "0x",
        ],
    );

    console.log(payload);
};

gen(
    ethers.ZeroAddress, // target chain univ2 router
    "0x5f4Ccc4c4503Bd79AE210019b65dC5E2264fD6D2", // target chain tokenB
    ethers.parseEther("0"), // minimum liquidity receive target chain
);
