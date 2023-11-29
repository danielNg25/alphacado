import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
const ethers = hre.ethers;

import { VaultFactory, VaultFactory__factory } from "../typechain-types";

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const VaultFactory: VaultFactory__factory = await ethers.getContractFactory(
        "VaultFactory",
    );

    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS");
    console.log(
        "==================================================================",
    );
    console.log("ACCOUNT: " + admin);

    const vault = <VaultFactory>(
        VaultFactory.attach("0xF149Ee748C2553f2E8D450A27D7c647E28428781")
    );

    await vault.deployVault(
        "Klay Stake Vault",
        "0x9bBC56D7a806EA67A3D528C772550BdF99Ce4579",
        "0x473425f22e9B25d78dbE0234492b79172a2e6588",
        1000000,
        139692708,
        0,
        0,
        "0x6be175D77B1B3f353f65A2E0648E0dDdD3090726",
        0,
        "0x6be175D77B1B3f353f65A2E0648E0dDdD3090726",
    );

    const contractAddress = {
        vault: await vault.getAddress(),
    };

    fs.writeFileSync("contracts.json", JSON.stringify(contractAddress));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
