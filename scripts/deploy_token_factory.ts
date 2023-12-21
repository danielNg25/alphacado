import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
const ethers = hre.ethers;

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const exchangeable = await ethers.getContractFactory("ExchangeableToken");
    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS");
    console.log(
        "==================================================================",
    );
    console.log("ACCOUNT: " + admin);

    console.log("Deploying token factory contract");

    const exchangeableContract = await exchangeable.deploy({
        gasLimit: 100000000,
    });
    const contractAddress = {
        tokenFactory: await exchangeableContract.getAddress(),
    };

    fs.writeFileSync(
        "exchangeablecontracts.json",
        JSON.stringify(contractAddress),
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
