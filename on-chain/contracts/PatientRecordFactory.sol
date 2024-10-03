// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PatientRecord.sol";

contract PatientRecordFactory {
    mapping(string => address) public patientRecords;

    event PatientRecordCreated(string indexed patientId, address recordAddress);

    function createPatientRecord(string memory patientId) public {
        PatientRecord newRecord;
        require(
            patientRecords[patientId] == address(0),
            "Patient already has an Address"
        );
        newRecord = new PatientRecord(msg.sender);
        patientRecords[patientId] = address(newRecord);

        emit PatientRecordCreated(patientId, address(newRecord));
    }

    function getPatientRecordAddress(
        string memory patientId
    ) public view returns (address) {
        if (patientRecords[patientId] != address(0))
            return patientRecords[patientId];
        else return address(0x0);
    }
}
