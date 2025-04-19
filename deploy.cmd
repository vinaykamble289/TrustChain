@echo off
echo Deploying contract to Polygon Mumbai Testnet...
cd contracts
call npx hardhat run scripts/deploy.cjs --network mumbai
pause