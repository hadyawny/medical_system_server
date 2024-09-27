// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRecord {
    address public owner;

    struct Record {
        string doctorId;
        string appointmentDate;
        string doctorNotes;
        string diagnosis;
        string prescriptions;
        string followUpPlan;
    }

    // Array to store multiple records for a patient
    Record[] public records;

    constructor(address _owner) {
        owner = _owner;
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Function to add a new record
    function addRecord(
        string memory _doctorId,
        string memory _appointmentDate,
        string memory _doctorNotes,
        string memory _diagnosis,
        string memory _prescriptions,
        string memory _followUpPlan
    ) public onlyOwner {
        records.push(
            Record({
                doctorId: _doctorId,
                appointmentDate: _appointmentDate,
                doctorNotes: _doctorNotes,
                diagnosis: _diagnosis,
                prescriptions: _prescriptions,
                followUpPlan: _followUpPlan
            })
        );
    }

    // Function to get the total number of records
    function getRecordCount() public view returns (uint) {
        return records.length;
    }

    // Function to get a specific record by index
    function getRecord(
        uint _index
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(_index < records.length, "Invalid index");
        Record memory record = records[_index];
        return (
            record.doctorId,
            record.appointmentDate,
            record.doctorNotes,
            record.diagnosis,
            record.prescriptions,
            record.followUpPlan
        );
    }

    // Internal function to return all records as an array of structs (can be used internally)
    function getAllRecords() public view returns (Record[] memory) {
        return records;
    }
}
