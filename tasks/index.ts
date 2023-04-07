import { task, types } from "hardhat/config";
import { readAddressList } from "../scripts/helper";
import { StandardImpl__factory } from "../typechain-types";

task("getValue").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new StandardImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );
  const value = await myContract.value();
  console.log("value: ", value.toString());
});

task("getVersion").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new StandardImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );
  const version = await myContract.VERSION();
  console.log("version: ", version.toString());
});

task("setValue")
  .addParam("value", "The value to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myContract = new StandardImpl__factory(dev).attach(
      addressList[network.name].MyContract
    );
    const tx = await myContract.setValue(taskArgs.value);
    console.log("tx: ", await tx.wait());

    const currentValue = await myContract.value();
    console.log("currentValue: ", currentValue.toString());
  });

task("getHashvalue").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new StandardImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );
  const value = await myContract.hashValue();
  console.log("hashValue: ", hre.ethers.utils.parseBytes32String(value.toString()));
});

task("setHashvalue")
  .addParam("value", "The hashValue to set", undefined, types.string)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myContract = new StandardImpl__factory(dev).attach(
      addressList[network.name].MyContract
    );
    const newValue = hre.ethers.utils.formatBytes32String(taskArgs.value);
    const tx = await myContract.setHashvalue(newValue);
    console.log("tx: ", await tx.wait());

    const currentValue = await myContract.hashValue();
    console.log("currentValue: ", currentValue.toString());
  });

task("getNumbers").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new StandardImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );
  // const value = await myContract.numbers({});
  const value = await myContract.numbers(1);
  console.log("numbers Value: ", value);
});

task("getShortNumberA").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new StandardImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );
  const value = await myContract.shortNumberA();
  console.log("shortNumberA Value: ", value.toString());
});

task("setShortNumberA")
  .addParam("value", "The value to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myContract = new StandardImpl__factory(dev).attach(
      addressList[network.name].MyContract
    );
    const tx = await myContract.setShortNumberA(taskArgs.value);
    console.log("tx: ", await tx.wait());

    const currentValue = await myContract.shortNumberA();
    console.log("currentValue: ", currentValue.toString());
  });

task("getShortNumberB").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new StandardImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );
  const value = await myContract.shortNumberB();
  console.log("shortNumberB Value: ", value.toString());
});

task("setShortNumberB")
  .addParam("value", "The value to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myContract = new StandardImpl__factory(dev).attach(
      addressList[network.name].MyContract
    );
    const tx = await myContract.setShortNumberB(taskArgs.value);
    console.log("tx: ", await tx.wait());

    const currentValue = await myContract.shortNumberB();
    console.log("currentValue: ", currentValue.toString());
  });

task("getShortNumberC").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myContract = new StandardImpl__factory(dev).attach(
    addressList[network.name].MyContract
  );
  const value = await myContract.shortNumberC();
  console.log("shortNumberC Value: ", value.toString());
});

task("setShortNumberC")
  .addParam("value", "The value to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myContract = new StandardImpl__factory(dev).attach(
      addressList[network.name].MyContract
    );
    const tx = await myContract.setShortNumberC(taskArgs.value);
    console.log("tx: ", await tx.wait());

    const currentValue = await myContract.shortNumberC();
    console.log("currentValue: ", currentValue.toString());
  });