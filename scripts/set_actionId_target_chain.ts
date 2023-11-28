import * as hre from "hardhat";
import { Signer } from "ethers";
const ethers = hre.ethers;
import { Config } from "./config";

import BaobabContract from "../baobab-contracts.json";
import SepoliaContract from "../sepolia-contracts.json";

import {
    AlphacadoChainRegistry__factory,
    AlphacadoChainRegistry,
} from "../typechain-types";

const SourceChain = SepoliaContract;
const TargetChain = BaobabContract;

const config = Config.Baobab;

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const AlphacadoChainRegistry: AlphacadoChainRegistry__factory =
        await ethers.getContractFactory("AlphacadoChainRegistry");

    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS");
    console.log(
        "==================================================================",
    );
    console.log("ACCOUNT: " + admin);
    console.log("Setting up registry...");
    const registry = <AlphacadoChainRegistry>(
        AlphacadoChainRegistry.attach(SourceChain.registry)
    );
    await registry.setAlphacadoAddress(config.chainId, TargetChain.alphacado);
    await registry.setTargetChainActionId(config.chainId, 1, true);
    await registry.setTargetChainActionId(config.chainId, 2, true);
    await registry.setTargetChainActionId(config.chainId, 3, true);
    await registry.setTargetChainActionId(config.chainId, 4, true);
    await registry.setTargetChainActionId(config.chainId, 5, true);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
