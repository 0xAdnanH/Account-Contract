# Account Contract

The Account Contract project presents a smart contract designed to represent blockchain accounts for various entities, including individuals, DAOs, and companies. It facilitates identity representation and supports essential interactions.

The Account Contract implements the following functionalities:

- **ERC165 Interface Detection:** Adhering to the ERC165 standard, the contract enables interface detection, allowing others to determine the implemented interfaces of the contract.

- **ERC173 Ownership Management:** Following the ERC173 standard, the contract includes ownership management mechanisms, enabling control over ownership transfer and access.

- **ERC20 Utility Function for Token Transfer:** The contract incorporates a utility function for sending ERC20 tokens, facilitating seamless token transfers instead of using the generic function.

- **ERC721 Utility Function for NFT Transfer:** Additionally, the contract provides a utility function for sending ERC721 Non-Fungible Tokens (NFTs) instead of using the generic function.

- **ERC1271 Message Verification:** The contract implements ERC1271, allowing signed messages to be verified based on the owner's signature.

- **onERC721Received Function:** This function is included to support the safe transfers of ERC721, ensuring ability to receive all kind of ERC721 tokens.

- **Generic Executor Function:** The contract features a versatile executor function that interacts with various addresses on the blockchain.

This account was later transformed into an initializable version to serve as an EIP-1167 Minimal Proxy, as outlined in my [Minimal Proxy repository](https://github.com/0xAdnanH/Minimal-Proxy).

## Goals of the Project

The project aims to:

- **Showcase Smart Contract Account Utilization:** Highlight the versatility of smart contract accounts by implementing diverse functions and standards within the contract.

## Technicalities of the Project

- **Usage of OpenZeppelin:** The project leverages the OpenZeppelin library to import pre-audited and well-tested code. This practice enhances security and efficiency by avoiding the introduction of unnecessary vulnerabilities and saving development time.

- **Tested with ethers.js:** Comprehensive unit tests are written using `ethers.js` to ensure the proper functionality of the implemented features.

- **Documentation Using Natspec:** The project's functions and overall functionality are thoroughly documented using Natspec, offering insights into each function's purpose and usage.

- **Use of Solidity `.selector`:** The project employs Solidity's `.selector` to extract the function selector from a function defined in an interface, facilitating standardized function calls.

**Note:** The Account Contract project serves as an educational exploration of smart contract accounts, emphasizing their functionality and standards implementation.


## Installation

### Cloning the Repository

You can clone the repository and install its dependencies to start using the provided smart contracts.

```bash
$ git clone https://github.com/0xAdnanH/Account-Contract.git
$ cd ./Account-Contract
$ npm install
```

### Instructions

#### Compile

To Compile the contract run:

```bash
$ npx hardhat compile
```

#### Tests

To run the unit tests:

```bash
$ npx hardhat test
```
