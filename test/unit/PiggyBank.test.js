const { assert, expect } = require("chai")
const {deployments, ethers, getNamedAccounts} = require("hardhat")

describe("PiggyBank", async() => {

    let piggyBank, deployer, piggyBankAddress
    const sendValue = ethers.parseEther("1")

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        piggyBankAddress = (await deployments.get("PiggyBank")).address
        piggyBank = await ethers.getContractAt("PiggyBank", piggyBankAddress)
    })

    describe("constructor", async () =>{
        it("initialize contract owner correctly", async () => {
            const Owner = await piggyBank.getOwner();
            assert.equal(Owner, deployer)
        })
    })

    describe("Timer", async() =>{
        it("sets the timer", async() =>{
            const set_timer = await piggyBank.setTimer(1)
            const timer = (await piggyBank.getTimer()).toString()
            
            const blockTime = (await ethers.provider.getBlock('latest')).timestamp;
            const yearTime = 1*365*24*60*60
            const testTime = (blockTime + yearTime).toString()

            assert.equal(timer, testTime)
        })
    })
    describe("Deposit", async () =>{
        it("Fails if ETH is less than or equal to 0", async () =>{
            await expect(piggyBank.deposit()).to.be.reverted;
        })

        it("Updates the amount deposited data structure", async() =>{
            await piggyBank.deposit({value:sendValue})
            const response = await piggyBank.getBalance()
            assert.equal(response.toString(), sendValue.toString())
        })

        it("Adds depositer to array of depositers", async () =>{
            await piggyBank.deposit({value: sendValue})
            const depositer = await piggyBank.getDepositer(0)
            assert.equal(depositer, deployer)
        })
    })

    describe("Withdraw", async () =>{
        beforeEach(async ()=> {
            await piggyBank.deposit({value:sendValue})
        })

        it("withdraw ETH by depositer", async ()=>{
            const startingPiggyBankBalance = await piggyBank.getBalance()
            const startingDepositerBalance = await ethers.provider.getBalance(deployer)

            const transaction = await piggyBank.withdraw()
            const receipt = await transaction.wait(1)

            const {gasUsed, gasPrice} = receipt
            const gasCost = gasUsed * gasPrice

            const endPiggyBankBalance = await piggyBank.getBalance()
            const endDepositerBalance = await ethers.provider.getBalance(deployer)

            assert.equal((startingPiggyBankBalance + startingDepositerBalance).toString(), (gasCost + endDepositerBalance).toString())
        })
    })
})