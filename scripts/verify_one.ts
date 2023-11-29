import * as hre from "hardhat";

async function main() {
    try {
        await hre.run("verify:verify", {
            address: "0x45D058A60f1f6B7510E9B7611F52f2A2eF42e098",
            constructorArguments: [
                "0x6291Cf69a372Fbb68a2dF0C619d1DE52F38bBa8f",
                "0x8843010C138A3eBF5080C6c6374BeA29A2de9e4C",
            ],
            hre,
        });
    } catch (err) {
        console.log("err >>", err);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
