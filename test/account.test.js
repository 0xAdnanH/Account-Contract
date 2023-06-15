const { expect } = require("chai");
const { ethers } = require("hardhat");
const provider = ethers.provider;
let accountContract;
let ERC20Contract;
let ERC721Contract;
let owner;
let addr1;
let addr2;
let tokenID = 1;
let amount = ethers.parseEther("1");

before(async () => {
  [addr1, addr2, owner] = await ethers.getSigners();
  const contractFac = await ethers.getContractFactory("Account");
  const contractFac1 = await ethers.getContractFactory("mytkn");
  const contractFac2 = await ethers.getContractFactory("myTKN");
  accountContract = await contractFac.connect(owner).deploy();
  ERC20Contract = await contractFac1.deploy("token", "tkn");
  ERC721Contract = await contractFac2.deploy("NonFT", "NFT");
});

describe("Setting Constructor", () => {
  it("should set constructor correctly", async () => {
    expect(await ERC20Contract.name()).to.equal("token");
    expect(await ERC20Contract.symbol()).to.equal("tkn");
    expect(await ERC721Contract.name()).to.equal("NonFT");
    expect(await ERC721Contract.symbol()).to.equal("NFT");
  });
});
describe("Minting ERC20 token to account Contract", () => {
  it("should mint", async () => {
    const amountToMint = ethers.parseEther("1");
    await ERC20Contract.connect(owner).mint(accountContract, amountToMint);

    expect(await ERC20Contract.balanceOf(accountContract)).to.equal(
      amountToMint
    );
  });
});
describe("Minting NFT token to account Contract", () => {
  it("should mint", async () => {
    await ERC721Contract.connect(owner).mint(accountContract, tokenID);

    expect(await ERC721Contract.balanceOf(accountContract)).to.equal(tokenID);
  });
});
describe("Testing account contract", () => {
  const data = "0x11";
  const value = 1;

  describe("Low level call", () => {
    it("should low level call successfully", async () => {
      expect(
        await accountContract
          .connect(owner)
          .callandSend(addr1.address, value, data, {
            value: value,
          })
      ).to.emit(accountContract, "CallSucceeded");
    });
    it("should revert if call failed", async () => {
      await expect(
        accountContract.connect(owner).callandSend(ERC20Contract, value, data, {
          value: value,
        })
      ).to.be.revertedWith("Call failed");
    });
    it("should revert if called by non-owner", async () => {
      await expect(
        accountContract.connect(addr1).callandSend(addr1.address, value, data, {
          value: value,
        })
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});

describe("Send ERC20 token", () => {
  it("should send token successfully", async () => {
    await expect(
      accountContract
        .connect(owner)
        .sendERC20(ERC20Contract, addr2.address, amount)
    ).to.emit(accountContract, "CallSucceeded");
  });
  it("should revert if called by non-owner", async () => {
    await expect(
      accountContract
        .connect(addr1)
        .sendERC20(ERC20Contract, addr2.address, amount)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
describe("Send ERC721 token", () => {
  it("should send token successfully", async () => {
    await expect(
      accountContract
        .connect(owner)
        .sendERC721(ERC721Contract, accountContract, addr2.address, tokenID)
    ).to.emit(accountContract, "CallSucceeded");
  });
  it("should revert if called by non-owner", async () => {
    await expect(
      accountContract
        .connect(addr1)
        .sendERC721(ERC721Contract, accountContract, addr2.address, tokenID)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
  it("should pass when calling safeTransferFrom", async () => {
    await expect(
      ERC721Contract.connect(addr2).safeTransferFrom(
        addr2.address,
        accountContract,
        tokenID
      )
    ).to.not.reverted;
  });
});
describe("Testing Signature", () => {
  it("should return 0x1626ba7e the signature of the function", async () => {
    const HashMessage = ethers.hashMessage("Hello World");

    const signature = await owner.signMessage("Hello World");
    const result = await accountContract.isValidSignature(
      HashMessage,
      signature
    );
    expect(result).to.be.equal("0x1626ba7e");
  });
  it("should return 0xffffffff when signing with non owner address", async () => {
    const HashMessage = ethers.hashMessage("Hello World");

    const signature = await addr1.signMessage("Hello World");
    const result = await accountContract.isValidSignature(
      HashMessage,
      signature
    );
    expect(result).to.be.equal("0xffffffff");
  });
});
describe("Testing interface", () => {
  it("should be true", async () => {
    expect(await accountContract.supportsInterface("0x1626ba7e")).to.be.true;
  });
});
