import { ethers } from 'ethers';

import fs from 'fs';
import { JsonRpcProvider } from 'ethers';
import TrustChainABI from './TrustChainABI.json' assert { type: 'json' };
import dotenv from 'dotenv';
dotenv.config();

const {
  PRIVATE_KEY,
  CONTRACT_ADDRESS,
  GDRIVE_FOLDER_ID,
  PORT = 5000
} = process.env;


const provider = new ethers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
// Your contract ABI and address
const contract = new ethers.Contract(CONTRACT_ADDRESS, TrustChainABI.abi, wallet);

// Log available methods
console.log("Contract Methods:", Object.keys(contract.interface.functions));

// Example of calling a contract method
try {
    const methods = contract.interface.functions;
    console.log(methods);
    if (methods['recordCertificate']) {
        // Call the method if it's available
        await contract.recordCertificate(studentPRN, certificateName, certHash);
    } else {
        console.error('recordCertificate method not found in ABI');
    }
} catch (error) {
    console.error('Error calling contract method:', error);
}
