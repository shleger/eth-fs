async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const tokenName = "Bond"
    const tokenSymbol = "BNB"
      
    const Bond = await ethers.getContractFactory("Bond");
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
  
    console.log("Token address:", contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
