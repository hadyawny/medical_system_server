const main = async () => {
  const PatientRecordFactory = await hre.ethers.getContractFactory("PatientRecordFactory");
  const PatientRecordFactoryContract = await PatientRecordFactory.deploy();

  await PatientRecordFactoryContract.waitForDeployment();

  console.log("PatientRecordFactory address: ", await PatientRecordFactoryContract.getAddress());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();