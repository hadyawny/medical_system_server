import { catchError } from "../../middleware/catchError.js";
import { ethers, JsonRpcProvider } from 'ethers'
import onChainConstants from '../../../on-chain/constants.js';
import fs from 'fs';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));



const patientRecordFactoryABI = loadJSON('./../../../on-chain/artifacts/contracts/PatientRecordFactory.sol/PatientRecordFactory.json')
const patientRecordABI = loadJSON('./../../../on-chain/artifacts/contracts/PatientRecord.sol/PatientRecord.json')




const provider = new JsonRpcProvider(process.env.ALCHEMY_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const factoryContractAddress = onChainConstants.deployedContractAddress;

const factoryContract = new ethers.Contract(factoryContractAddress, patientRecordFactoryABI.abi, wallet);




async function getPatientRecordAddress(patientId) {
    // Get the patient's record contract address
    const recordAddress = await factoryContract.getPatientRecordAddress(patientId);


    console.log(`Patient record contract address for Patient ID ${patientId}:`, recordAddress); // Temp: clg for testing

    return recordAddress;
}

async function addRecordToPatient(patientId, recordData) {
    const { doctorId, appointmentDate, doctorNotes, diagnosis, prescriptions, followUpPlan } = recordData;
    // Get the patient record contract address from the factory
    let recordAddress = await getPatientRecordAddress(patientId);


    if (recordAddress === ethers.ZeroAddress) {
        recordAddress = await factoryContract.createPatientRecord(patientId);
        await recordAddress.wait();
    }

    console.log(`Adding a new record to patient contract at address: ${recordAddress}...`); // Temp: clg for testing

    // Initialize the patient record contract
    const patientRecordContract = new ethers.Contract(recordAddress, patientRecordABI, wallet);

    // Add a new medical record
    const tx = await patientRecordContract.addRecord(
        doctorId,
        appointmentDate,
        doctorNotes,
        diagnosis,
        prescriptions,
        followUpPlan
    );
    await tx.wait();

    console.log("Record added successfully."); // Temp: clg for testing
}


const addRecord = catchError(async (req, res, next) => {

    /**
      * TODO
      * Validate that this doctor has the right to add a record for this specific patient
      */

    req.body.doctorId = req.user._id;

    const { patientId, doctorId, appointmentDate, doctorNotes, diagnosis, prescriptions, followUpPlan } = req.body;

    await addRecordToPatient(patientId, {
        doctorId,
        appointmentDate,
        doctorNotes,
        diagnosis,
        prescriptions,
        followUpPlan
    })


    res.json({
        message: "Record added successfully",
    });
});


const getRecords = catchError(async (req, res, next) => {

    const userId = req.user._id.toString();
    console.log(userId)
    const recordAddress = getPatientRecordAddress(userId);

    const patientRecordContract = new ethers.Contract(recordAddress, patientRecordABI, wallet);

    const records = await patientRecordContract.getAllRecords();

    res.json({
        message: "Records fetched successfully",
        records
    });
});


export { addRecord, getRecords };
