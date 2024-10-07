import { ethers } from 'ethers';
import { catchError } from "../../middleware/catchError.js";
import medicalRecordsContract from "./ethers.js";
import dotenv from 'dotenv';

dotenv.config();

const addRecord = catchError(async (req, res, next) => {
    req.body.doctorId = String(req.user._id);

    const { patientId, doctorId, appointmentDate, doctorNotes, diagnosis, prescriptions, followUpPlan } = req.body;
  // Add a new medical record
 await medicalRecordsContract.addRecord(
    patientId,
    appointmentDate,
    doctorNotes,
    diagnosis,
    prescriptions,
    followUpPlan,
    doctorId
);

console.log("Record added successfully."); 
    res.json({
        message: "Record added successfully",
    });
});


const getRecords = catchError(async (req, res, next) => {
    const userId = req.params.id.toString();

    const records = await medicalRecordsContract.getRecords(userId);

    // Convert BigInt values to strings
    const formattedRecords = records.map(record => ({
        appointmentDate: record.appointmentDate.toString(),
        doctorNotes: record.doctorNotes,
        diagnosis: record.diagnosis,
        prescriptions: record.prescriptions,
        followUpPlan: record.followUpPlan,
        doctorId: record.doctorId
    }));

    res.json({
        message: "Records fetched successfully",
        records: formattedRecords
    });
});

export default getRecords;


export { getRecords, addRecord};
