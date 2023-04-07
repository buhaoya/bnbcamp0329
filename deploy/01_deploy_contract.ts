import { DeployFunction, ProxyOptions } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { readAddressList, storeAddressList } from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  // const { deployer } = await getNamedAccounts();
  const [deployer] = await hre.ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  // console.log("Deploying My Contract with account:", deployer);
  console.log("Deploying My Contract with accountAddress:", deployerAddress);

  const addressList = readAddressList();
  if(!addressList[network.name]){
    addressList[network.name] = {}
  }

  const proxyOptions: ProxyOptions = {
    proxyContract: "TransparentUpgradeableProxy",
    viaAdminContract: "ProxyAdmin",
    execute: {
      // 只在初始化时执行
      init: {
        // 执行initialize方法
        methodName: "initialize",
        // 参数
        args: [1],
      },
    },
  };

  const myContract = await deploy("StandardImpl", {
    contract: "StandardImpl",
    from: deployerAddress,
    proxy: proxyOptions,
    args: [],
    log: true,
  });

  console.log("Proxy deployed to:", myContract.address);
  console.log("Implementation deployed to:", myContract.implementation);

  addressList[network.name].MyContract = myContract.address;
  storeAddressList(addressList);
};

// npx hardhat deploy --network {network} --tags {Tag}
func.tags = ["MyContract"];
export default func;
