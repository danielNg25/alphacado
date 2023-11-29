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
        "sKLAY",
        "SKLAY",
        config.usdc,
        500000000,
    );
    await sleep(5000);

    console.log("Deploying token 2 contract");
    await tokenFactory.createTargetChainToken(
        "stKLAY",
        "Stake.ly",
        config.usdc,
        500000000,
    );
    await sleep(5000);

    const sKLAY = await tokenFactory.tokens(18);
    const stKLAY = await tokenFactory.tokens(19);

    const contractAddress = {
        sKLAY: sKLAY,
        stKLAY: stKLAY,
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
