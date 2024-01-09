# PiggyBank Project with Hardhat

This project demonstrates a simple Piggy Bank smart contract implemented using Solidity and Hardhat for Ethereum development.

## Overview

The Piggy Bank smart contract allows users to deposit and withdraw funds from their personal piggy bank. Each user has a separate piggy bank identified by their Ethereum address. The smart contract is developed using Solidity and tested using the Hardhat framework.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Hardhat

```bash
# Install Hardhat globally
npm install -g hardhat
```

## Project Structure

The project structure is organized as follows:

- contracts/: Contains the Solidity smart contract code.
- deploy/: Includes deployment and testing scripts.
- test/: Contains test files for the smart contract.
- hardhat.config.js: Configuration file for Hardhat.

## Getting Started

- Clone the repository:

```bash
git clone https://github.com/your-username/piggybank-project.git
cd piggybank-project
```

- Install dependencies:

```bash
npm install
```

## Usage

- Compile Smart Contracts:

```bash
npx hardhat compile
```
- Run Tests:

```bash
npx hardhat test
```

- Deploy Smart Contract

```bash
npx hardhat deploy --network localhost
```