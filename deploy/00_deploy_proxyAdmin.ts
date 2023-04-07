import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { readAddressList, storeAddressList } from "../scripts/helper";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;

  const [deployer, backupDeployer, ethSender] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  // console.log("Deploying ProxyAdmin with account:", deployer);
  console.log("Deploying ProxyAdmin with accountAddress:", deployerAddress);

  while(network.name == "localhost"){
    // 转账的数量，单位为 wei
    const value = ethers.utils.parseEther("0.1");
    // 获取账户的余额，单位为 wei
    const deployerBalance = await ethers.provider.getBalance(deployerAddress);
    console.log(`Balance of deployerBalance ${deployerAddress}: ${deployerBalance.toString()} wei`);
    if(deployerBalance >= value){
      break;
    }
    const balance = await ethers.provider.getBalance(await ethSender.getAddress());
    console.log(`Balance of ethSender ${await ethSender.getAddress()}: ${balance.toString()} wei`);
    if(balance < value){
      console.log(`Balance of ethSender insufficient`);
      break;
    }
    // 发送交易
    const tx = await ethSender.sendTransaction({
      to: deployerAddress,
      value: value,
    });
    break
  }

  const addressList = readAddressList();
  if(!addressList[network.name]){
    addressList[network.name] = {}
  }

  const proxyAdmin = await deploy("ProxyAdmin", {
    contract: "ProxyAdmin",
    from: deployerAddress,
    args: [],
    log: true,
  });
  console.log("ProxyAdmin deployed to:", proxyAdmin.address);

  addressList[network.name].ProxyAdmin = proxyAdmin.address;
  storeAddressList(addressList);
};

func.tags = ["ProxyAdmin"];
export default func;
