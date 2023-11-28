import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
import { ExchangeableToken } from "../typechain-types";
const ethers = hre.ethers;

const ETHKLAY = "0x65481e2F0cc8E127D9266beF1438864940513da9";
const ETHBTC = "0x674A13CFc3e2F6B8981C7842489EC6F6cFd5898D";
const ETHUSDT = "0x9fd7037B6bD6F16a89D33bE16127E067c1c7a292";
const ETHUSDC = "0x642eDAC6E437F5D6037b7456966dA9d60edC9743";

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const tokenFactory = await ethers.getContractFactory("ExchangeableToken");
    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS");
    console.log(
        "==================================================================",
    );
    console.log("ACCOUNT: " + admin);

    console.log("Set rate");

    const tokenFactoryContract = <ExchangeableToken>(
        tokenFactory.attach("0x55b84AA20159Ebe618259166dEd708ae31d7A6c3")
    );

    console.log("set rate 1");
    await tokenFactoryContract.setRate(ETHKLAY, ETHBTC, 2000);

    console.log("set rate 2");
    await tokenFactoryContract.setRate(ETHKLAY, ETHUSDT, 20000000);

    console.log("set rate 3");
    await tokenFactoryContract.setRate(ETHKLAY, ETHUSDC, 20000000);

    console.log("set rate 4");
    await tokenFactoryContract.setRate(ETHBTC, ETHUSDT, 2700);

    console.log("set rate 5");
    await tokenFactoryContract.setRate(ETHBTC, ETHUSDC, 2700);

    console.log("set rate 6");
    await tokenFactoryContract.setRate(ETHUSDT, ETHUSDC, 100000000);

    const contractAddress = {
        tokenFactory: await tokenFactoryContract.getAddress(),
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
