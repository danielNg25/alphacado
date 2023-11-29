import * as hre from "hardhat";
import * as fs from "fs";
import { Signer, parseEther } from "ethers";
const ethers = hre.ethers;

import { ERC20Mock__factory, ERC20Mock } from "../typechain-types";

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const ERC20Mock: ERC20Mock__factory = await ethers.getContractFactory(
        "ERC20Mock",
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

    // const erc20: ERC20Mock = await ERC20Mock.deploy("USDC", "USDC");
    // await erc20.waitForDeployment();
    const erc20: ERC20Mock = <ERC20Mock>(
        ERC20Mock.attach("0x473425f22e9B25d78dbE0234492b79172a2e6588")
    );

    const erc20Address = await erc20.getAddress();

    console.log("erc20 deployed at: ", erc20Address);

    await erc20.mint(
        "0xF149Ee748C2553f2E8D450A27D7c647E28428781",
        parseEther("100000000000000000"),
    );

    const contractAddress = {
        erc20: erc20Address,
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
