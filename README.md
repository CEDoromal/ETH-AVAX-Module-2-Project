# ETH + AVAX Module 2 Project

Metacrafters ETH + AVAX Module 2 Project

## Description

This project serves the purpose of fulfilling a requirement for ETH + AVAX PROOF: Intermediate EVM Course of Metacrafters

This project demonstrates Smart Contract Frontend Integration with Vite + React as frontend and Hardhat node running locally to deploy and access the contract.

## Getting Started

### Executing the program

1. Open https://gitpod.io/#https://github.com/CEDoromal/ETH-AVAX-Module-2-Project and create a Gitpod workspace.
2. Wait for npm to install the modules. (If the installation did not start automatically, enter `npm install` on the terminal)
3. Create 2 terminal instances. They will be used later on.
4. On the 1st terminal instance, enter `npx hardhat node` on the terminal to start your Hardhat node. Make sure to open the port to public.
5. Click **Ports** on the lower-right corner of the window to open the port.
6. Use the address associated with port 8545 as the RPC URL to add a new network to your MetaMask wallet. (For more details on how to add the Hardhat network to MetaMask, kindly check: https://support.chainstack.com/hc/en-us/articles/4408642503449-Using-MetaMask-with-a-Hardhat-node)
7. Go back to the terminal and use at least one of the generated account's private key to import the account to your MetaMask wallet.
8. On the 2nd terminal instance, enter `npx hardhat run --network localhost scripts/deploy.js` to deploy the smart contract.
9. Copy the address where the BasicMath contract is deployed and paste it as the value of `basicMathAddress` in **/src/App.jsx** on **Line 25**.
10. Enter `npm run dev` on the terminal to start the frontend server. Make sure to open the port to public.
11. Ctrl + Left Click the link where the frontend is said to be hosted.
12. Connect your wallet to interact with the app functions

## Author

CEDoromal (cesdoromal@mymail.mapua.edu.ph)

## License

This project is licensed under the MIT License - see the LICENSE file for details
