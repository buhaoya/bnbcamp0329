import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { readAddressList, storeAddressList } from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  // const { deployer } = await getNamedAccounts();
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  const addressList = readAddressList();
  if(!addressList[network.name]){
    addressList[network.name] = {}
  }

  const storageStructure = await deploy("StorageStructure", {
    contract: "StorageStructure",
    from: deployerAddress,
    args: [],
    log: true,
  });
  console.log("StorageStructure deployed to:", storageStructure.address);

  addressList[network.name].StorageStructure = storageStructure.address;
  storeAddressList(addressList);
};

func.tags = ["StorageStructure"];
export default func;
