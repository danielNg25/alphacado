import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-solhint";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-docgen";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-tracer";
import "hardhat-log-remover";

dotenv.config();

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            accounts: { count: 100 },
        },
        sepolia: {
            url: `https://ethereum-sepolia.blockpi.network/v1/rpc/public`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        mumbai: {
            url: `https://polygon-testnet.public.blastapi.io`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        bsctestnet: {
            url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        baobab: {
            url: `https://api.baobab.klaytn.net:8651`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        tomotestnet: {
            url: `https://rpc.testnet.tomochain.com`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
    },
    etherscan: {
        apiKey: {
            goerli: `${process.env.ETHERSCAN_KEY}`,
            sepolia: `${process.env.ETHERSCAN_KEY}`,
            bscTestnet: `${process.env.BSCSCAN_KEY}`,
            polygonMumbai: `${process.env.POLYGONSCAN_KEY}`,
            mainnet: `${process.env.ETHERSCAN_KEY}`,
            bsctestnet: `${process.env.BSCSCAN_KEY}`,
            polygonMainnet: `${process.env.POLYGONSCAN_KEY}`,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.5.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                        details: {
                            yul: true,
                        },
                    },
                },
            },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                        details: {
                            yul: true,
                        },
                    },
                },
            },
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                        details: {
                            yul: true,
                        },
                    },
                    viaIR: true,
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./tests",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    mocha: {
        timeout: 200000,
        reporter: "mocha-multi-reporters",
        reporterOptions: {
            configFile: "./mocha-report.json",
        },
    },
    docgen: {
        path: "./docs",
        clear: true,
        runOnCompile: false,
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },
    gasReporter: {
        currency: "ETH",
        gasPrice: 10,
        enabled: process.env.REPORT_GAS ? true : false,
        excludeContracts: [],
        src: "./contracts",
    },
    typechain: {
        outDir: "typechain-types",
        target: "ethers-v6",
    },
};

module.exports = config;
