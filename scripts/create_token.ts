import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
const ethers = hre.ethers;

import { TokenFactory__factory, TokenFactory } from "../typechain-types";
import { Config } from "./config";
import TomoContract from "../tomo-contracts.json";
// import SepoliaContract from "../sepolia-contracts.json";
const config = Config.Tomo;

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
        TokenFactoryFactory.attach(TomoContract.tokenFactory)
    );

    console.log("Deploying token 1 contract");
    await tokenFactory.createTargetChainToken(
        "Viction",
        "VIC",
        config.usdc,
        125000000,
        { gasLimit: 100000000 },
    );
    await sleep(5000);

    console.log("Deploying token 2 contract");
    await tokenFactory.createTargetChainToken(
        "Coin98",
        "C98",
        config.usdc,
        475000000,
        { gasLimit: 100000000 },
    );
    await sleep(5000);

    console.log("Deploying token 3 contract");
    await tokenFactory.createTargetChainToken(
        "Wrapped Ether",
        "WETH",
        config.usdc,
        50000,
        { gasLimit: 100000000 },
    );
    await sleep(5000);

    console.log("Deploying token 4 contract");
    await tokenFactory.createTargetChainToken(
        "Wrapped Bitcoin",
        "WBTC",
        config.usdc,
        2500,
        { gasLimit: 100000000 },
    );
    await sleep(5000);

    console.log("Deploying token 5 contract");
    await tokenFactory.createTargetChainToken(
        "Tether USD",
        "USDT",
        config.usdc,
        100000000,
        { gasLimit: 100000000 },
    );

    const vic = await tokenFactory.tokens(0);
    const c98 = await tokenFactory.tokens(1);
    const wETH = await tokenFactory.tokens(2);
    const wBTC = await tokenFactory.tokens(3);
    const USDT = await tokenFactory.tokens(4);

    const contractAddress = {
        vic,
        c98,
        wETH,
        wBTC,
        USDT,
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
