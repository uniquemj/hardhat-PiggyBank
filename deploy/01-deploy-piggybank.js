const { network } = require("hardhat")
const { verify } = require("../utils/verify")
module.exports = async ({getNamedAccounts, deployments}) =>{
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const piggyBank = await deploy("PiggyBank",{
        contract: "PiggyBank",
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if((chainId != 31337) && process.env.ETHERSCAN_API_KEY){
        await verify(piggyBank.address, [])
    }
    log("--------------------------------------------")
}

module.exports.tags = ["all","piggybank"]