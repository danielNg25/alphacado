import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
const ethers = hre.ethers;

import { TokenFactory__factory, TokenFactory } from "../typechain-types";
import { Config } from "./config";
import BaobabContract from "../baobab-contracts.json";
// import SepoliaContract from "../sepolia-contracts.json";
const config = Config.Baobab;

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const TokenFactoryFactory: TokenFactory__factory =
        await ethers.getContractFactory("TokenFactory");

    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS");
    console.log(
        "==================================================================",
    );

    console.log("ACCOUNT: " + admin);

    const tokenFactory: TokenFactory = <TokenFactory>(
        TokenFactoryFactory.attach(BaobabContract.tokenFactory)
    );

    console.log("Deploying token 1 contract");
    await tokenFactory.createTargetChainToken(
        "Wrapped Klaytn",
        "WKLAY",
        config.usdc,
        500000000,
    );
    await sleep(5000);

    console.log("Deploying token 2 contract");
    await tokenFactory.createTargetChainToken(
        "Wrapped Ethereum",
        "WETH",
        config.usdc,
        50000,
    );
    await sleep(5000);

    console.log("Deploying token 3 contract");
    await tokenFactory.createTargetChainToken(
        "Wrapped Bitcoin",
        "WBTC",
        config.usdc,
        2700,
    );
    await sleep(5000);

    console.log("Deploying token 4 contract");
    await tokenFactory.createTargetChainToken(
        "Tether USD",
        "USDT",
        config.usdc,
        100000000,
    );
    await sleep(5000);

    console.log("Deploying token 5 contract");
    await tokenFactory.createTargetChainToken(
        "ETH-Klay",
        "ETH-Klay",
        config.usdc,
        50000,
    );
    await sleep(5000);

    console.log("Deploying token 6 contract");
    await tokenFactory.createTargetChainToken(
        "ETH-BTC",
        "ETH-BTC",
        config.usdc,
        2700,
    );
    await sleep(5000);

    console.log("Deploying token 7 contract");
    await tokenFactory.createTargetChainToken(
        "ETH-USDT",
        "ETH-USDT",
        config.usdc,
        2000000,
    );
    await sleep(5000);

    console.log("Deploying token 8 contract");
    await tokenFactory.createTargetChainToken(
        "ETH-USDC",
        "ETH-USDC",
        config.usdc,
        2000000,
    );
    await sleep(5000);

    const WrappedKlaytn = await tokenFactory.tokens(10);
    const WrappedEthereum = await tokenFactory.tokens(11);
    const WrappedBitcoin = await tokenFactory.tokens(12);
    const TetherUSD = await tokenFactory.tokens(13);
    const ETHKlay = await tokenFactory.tokens(14);
    const ETHBTC = await tokenFactory.tokens(15);
    const ETHUSDT = await tokenFactory.tokens(16);
    const ETHUSDC = await tokenFactory.tokens(17);

    const contractAddress = {
        WraooedKlaytn: WrappedKlaytn,
        WrappedEthereum: WrappedEthereum,
        WrappedBitcoin: WrappedBitcoin,
        TetherUSD: TetherUSD,
        ETHKlay: ETHKlay,
        ETHBTC: ETHBTC,
        ETHUSDT: ETHUSDT,
        ETHUSDC: ETHUSDC,
    };

    fs.writeFileSync("tokenContracts.json", JSON.stringify(contractAddress));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
