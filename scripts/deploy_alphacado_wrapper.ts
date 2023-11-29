import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
const ethers = hre.ethers;
import SepoliaCOntract from "../sepolia-contracts.json";

import { AlphacadoWrapper__factory } from "../typechain-types";
import { Config } from "./config";

const config = Config.Sepolia;

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const AlphacadoWrapper: AlphacadoWrapper__factory =
        await ethers.getContractFactory("AlphacadoWrapper");

    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS");
    console.log(
        "==================================================================",
    );

    console.log("ACCOUNT: " + admin);

    const wrapper = await AlphacadoWrapper.deploy(
        SepoliaCOntract.alphacado,
        config.usdc,
    );

    await wrapper.waitForDeployment();

    const contractAddress = {
        wrapper: await wrapper.getAddress(),
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
