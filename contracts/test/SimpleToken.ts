import { expect } from "chai";
import { ethers as hardhatEthers } from "hardhat";
import { parseEther } from "ethers";
import { SimpleToken } from "../typechain-types";

describe("SimpleToken", function () {
  let token: SimpleToken;
  let owner: any;
  let addr1: any;
  console.log(process.env.PRIVATE_KEY)


  beforeEach(async function () {
    [owner, addr1] = await hardhatEthers.getSigners();

    const Token = await hardhatEthers.getContractFactory("SimpleToken");
    token = (await Token.deploy(parseEther("1000"))) as SimpleToken;
    await token.waitForDeployment();
  });

  it("Should assign the total supply to the owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    const totalSupply = await token.totalSupply();
    expect(ownerBalance).to.equal(totalSupply);
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, parseEther("100"));
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(parseEther("100"));
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const addr2 = (await hardhatEthers.getSigners())[2];
  
    await expect(
      token.connect(addr1).transfer(addr2.address, parseEther("1"))
    ).to.be.reverted;
  }); 
});
