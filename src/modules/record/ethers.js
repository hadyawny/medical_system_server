import { ethers } from 'ethers';

// Connect to the Ethereum network using Infura
const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/d63e7449cad24519a71d580ede6024fb');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

provider.getNetwork().then(network => {
    console.log("Connected to network:", network);
}).catch(error => {
    console.error("Error connecting to network:", error);
});


// Define the contract ABI and address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "patientId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "appointmentDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "doctorNotes",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "diagnosis",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prescriptions",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "followUpPlan",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorId",
				"type": "string"
			}
		],
		"name": "addRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "patientId",
				"type": "string"
			}
		],
		"name": "getRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "appointmentDate",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "doctorNotes",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "diagnosis",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "prescriptions",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "followUpPlan",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "doctorId",
						"type": "string"
					}
				],
				"internalType": "struct MedicalRecords.Record[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = '0xc42a6ab49e075ed724f27a925865dfd4fad1344d';

// Create a contract instance
const medicalRecordsContract = new ethers.Contract(contractAddress, contractABI, wallet);

export default medicalRecordsContract;
