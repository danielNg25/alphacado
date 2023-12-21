import * as hre from "hardhat";
import * as fs from "fs";
import { Signer } from "ethers";
const ethers = hre.ethers;
import { Config } from "./config";

import {
    Alphacado__factory,
    Alphacado,
    UniswapAdapterV2TokenAdapterMock__factory,
    MockKlayBankPool__factory,
    KlayBankAdapter__factory,
    MockKlayStationPool__factory,
    KlayStationAdapter__factory,
    VaultFactory__factory,
    TokenFactory__factory,
    VaultAdapter__factory,
    AlphacadoChainRegistry__factory,
} from "../typechain-types";

const config = Config.Sepolia;

async function main() {
    //Loading accounts
    const accounts: Signer[] = await ethers.getSigners();
    const admin = await accounts[0].getAddress();
    //Loading contracts' factory

    const Alphacado: Alphacado__factory = await ethers.getContractFactory(
        "Alphacado",
    );

    const AlphacadoChainRegistry: AlphacadoChainRegistry__factory =
        await ethers.getContractFactory("AlphacadoChainRegistry");

    const VaultFactory: VaultFactory__factory = await ethers.getContractFactory(
        "VaultFactory",
    );

    const TokenFactoryFactory: TokenFactory__factory =
        await ethers.getContractFactory("TokenFactory");

    const VaultAdapter: VaultAdapter__factory = await ethers.getContractFactory(
        "VaultAdapter",
    );

    const UniswapAdapter: UniswapAdapterV2TokenAdapterMock__factory =
        await ethers.getContractFactory("UniswapAdapterV2TokenAdapterMock");

    // Deploy contracts
    console.log(
        "==================================================================",
    );
    console.log("DEPLOY CONTRACTS");
    console.log(
        "==================================================================",
    );
    console.log("ACCOUNT: " + admin);
    console.log("Deploying Mock contract");

    const vaultFactory = await VaultFactory.deploy({
        gasLimit: 100000000,
    });
    await vaultFactory.waitForDeployment();

    await sleep(5000);

    console.log("Deploying TokenFactory contract");
    const tokenFactory = await TokenFactoryFactory.deploy({
        gasLimit: 100000000,
    });
    await tokenFactory.waitForDeployment();
    await sleep(5000);

    console.log("Deploying Alphacado contract");

    const registry = await AlphacadoChainRegistry.deploy({
        gasLimit: 100000000,
    });

    await registry.waitForDeployment();
    await sleep(5000);
    const alphacado: Alphacado = await Alphacado.deploy(
        await registry.getAddress(),
        config.usdc,
        config.chainId,
        config.wormholeRelayer,
        config.tokenBridge,
        config.wormHole,
        {
            gasLimit: 100000000,
        },
    );

    await alphacado.waitForDeployment();
    await sleep(5000);
    const alphacadoAddress = await alphacado.getAddress();

    console.log("alphacado deployed at: ", alphacadoAddress);

    console.log("Deploying Adapter contract");

    console.log("Deploying Univ2 Adapter contract");
    const univ2Adapter = await UniswapAdapter.deploy(alphacadoAddress, {
        gasLimit: 100000000,
    });
    await univ2Adapter.waitForDeployment();
    await sleep(5000);
    await registry.setAdapter(1, await univ2Adapter.getAddress(), {
        gasLimit: 100000000,
    });
    await sleep(5000);
    await registry.setAdapter(2, await univ2Adapter.getAddress(), {
        gasLimit: 100000000,
    });
    await sleep(5000);
    console.log("Deploying Vault Adapter contract");
    const vaultAdapter = await VaultAdapter.deploy(alphacadoAddress, {
        gasLimit: 100000000,
    });
    await vaultAdapter.waitForDeployment();
    await sleep(5000);
    await registry.setAdapter(5, await vaultAdapter.getAddress(), {
        gasLimit: 100000000,
    });
    await sleep(5000);
    const contractAddress = {
        vaultFactory: await vaultFactory.getAddress(),
        tokenFactory: await tokenFactory.getAddress(),
        alphacado: alphacadoAddress,
        registry: await registry.getAddress(),
        univ2Adapter: await univ2Adapter.getAddress(),
        vaultAdapter: await vaultAdapter.getAddress(),
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

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
