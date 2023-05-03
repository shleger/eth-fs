const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const BigNumber = require("bignumber.js");

async function gasUsed(tx) {
  const receipt = await tx.wait();
  const gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
  return Number(gasUsed)

}

async function getEmmitedValue(eventName, tx) {
  const receipt = await tx.wait();
  for (const event of receipt.events) {
    // console.log(`Event ${event.event} with args ${event.args}`);
    if (event.event == eventName) return event.args[1];
  }
  throw new Error("Event: " + eventName + " not found!");
}

describe("Bond contract ", function () {
  async function deployFixture() {
    const Bond = await ethers.getContractFactory("Bond");
    const [contractOwner, nftIssuer, nftOwner, newOwner] = await ethers.getSigners();
    const tokenName = "Bond"
    const tokenSymbol = "BND"
    const bondProps = {
      "issuer": "GamesPTE",
      "dateMaturity": 1,
      "dateCreated": 2,
      "coupone": 3,
      "couponePreiod": 4,
      "faceValue": 5,
      "bondPrice": 6,
      "bondYeld": 7

    }

    const contract = await Bond.deploy(tokenName, tokenSymbol, bondProps, 1000);
    await contract.deployed();

    return { contract };
  }

  it("Should create bond with parameters", async () => {
    const { contract, contractOwner, nftIssuer, nftOwner } = await loadFixture(deployFixture);

    const name = await contract.name();
    expect("Bond").to.equal(name);

    const symbol = await contract.symbol();
    expect("BND").to.equal(symbol);

    const totalSupply = await contract.totalSupply();
    expect(1000).to.equal(totalSupply);

    const props = await contract.getProps()
    expect("GamesPTE").to.equal(props.issuer);
    expect(1).to.equal(props.dateMaturity);
    expect(2).to.equal(props.dateCreated);
    expect(3).to.equal(props.coupone);
    expect(4).to.equal(props.couponePreiod);
    expect(5).to.equal(props.faceValue);
    expect(6).to.equal(props.bondPrice);
    expect(7).to.equal(props.bondYeld);


  }).timeout(10000);


  it("Should distribute coupons between owners per couponPeriod ", async () => {
    const { contract } = await loadFixture(deployFixture);
    //TODO
  }).timeout(10000);

  it("Should sell bond in primary market ", async () => {
    //TODO
    const { contract } = await loadFixture(deployFixture);
  }).timeout(10000);

  it("Should sell bond with higher  price ", async () => {
    //TODO
    const { contract } = await loadFixture(deployFixture);
  }).timeout(10000);



});


