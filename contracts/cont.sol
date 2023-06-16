//This code has the access for only owner
// this code get only csv file
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract cont{
  struct DNA {
        string name;
        string ipfsHash;
    }

    // Define a struct to represent similar DNA files
    struct SimilarDNA {
        string name1;
        string name2;
        string ipfsHash1;
        string ipfsHash2;
        uint256 similarityPercentage;
    }

    // Declare a variable to store the contract owner's address
    address public owner;

    // Constructor to set the contract owner as the deployer of the contract
    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict certain functions to be called only by the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }

    // Declare mappings to store DNA records and similar DNA files
    mapping(address => DNA[]) private dnaRegistry;
    mapping(address => mapping(bytes32 => SimilarDNA[])) private similarFiles;

    // Declare events to emit when DNA files are uploaded, updated, or removed, and when family matches are found
    event DNAUploaded(
        address indexed uploader,
        string name,
        string ipfsHash
    );

    event DNAUpdated(
        address indexed updater,
        string name,
        string ipfsHash
    );

    event DNARemoved(
        address indexed remover,
        string name
    );

    event FamilyMatch(
        address indexed user,
        uint256 similarityScore,
        string name1,
        string name2,
        string ipfsHash1,
        string ipfsHash2
    );

    // Function to upload a single DNA file, accessible only by the contract owner
    function uploadSingleDNA(string memory _name, string memory _ipfsHash) public onlyOwner {
    // Check that the DNA name and IPFS hash are not empty
       require(bytes(_name).length > 0, "DNA cannot be empty.");
       require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty.");

    // Check if the DNA file has already been uploaded
       for (uint256 i = 0; i < dnaRegistry[msg.sender].length; i++) {
           require(
            keccak256(abi.encodePacked(_name, _ipfsHash)) !=
                keccak256(abi.encodePacked(dnaRegistry[msg.sender][i].name, dnaRegistry[msg.sender][i].ipfsHash)),
            "DNA file has already been uploaded."
        );
    }

    // Add the DNA record to the sender's registry
    dnaRegistry[msg.sender].push(DNA({ name: _name, ipfsHash: _ipfsHash }));

    // Check for family matches with other DNA files in the registry
    for (uint256 i = 0; i < dnaRegistry[msg.sender].length; i++) {
        // Calculate the similarity score between the newly uploaded DNA file and the existing files
        uint256 similarityScore = calculateSimilarityScore(_ipfsHash, dnaRegistry[msg.sender][i].ipfsHash);

        // If the similarity score is above or equal to 90%, add it to the similarFiles mapping
        if (similarityScore >= 90) {
            bytes32 hash = keccak256(abi.encodePacked(_ipfsHash, dnaRegistry[msg.sender][i].ipfsHash));
            similarFiles[msg.sender][hash].push(
                SimilarDNA({
                    name1: _name,
                    name2: dnaRegistry[msg.sender][i].name,
                    ipfsHash1: _ipfsHash,
                    ipfsHash2: dnaRegistry[msg.sender][i].ipfsHash,
                    similarityPercentage: similarityScore
                })
            );

            // Emit an event for the family match
            emit FamilyMatch(
                msg.sender,
                similarityScore,
                _name,
                dnaRegistry[msg.sender][i].name,
                _ipfsHash,
                dnaRegistry[msg.sender][i].ipfsHash
            );
        }
    }

    // Emit an event for the uploaded DNA file
    emit DNAUploaded(msg.sender, _name, _ipfsHash);
}


    // Function to retrieve the IPFS hash of a DNA file by its name
    function retrieveDNA(string memory _name) public view returns (string memory) {
        for (uint256 i = 0; i < dnaRegistry[msg.sender].length; i++) {
            if (keccak256(abi.encodePacked(dnaRegistry[msg.sender][i].name)) == keccak256(abi.encodePacked(_name))) {
                return dnaRegistry[msg.sender][i].ipfsHash;
            }
        }

        revert("DNA file not found.");
    }

    // Function to update the IPFS hash of a DNA file by its name
    function updateDNA(string memory _name, string memory _ipfsHash) public {
        require(bytes(_name).length > 0, "DNA name cannot be empty.");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty.");

        for (uint256 i = 0; i < dnaRegistry[msg.sender].length; i++) {
            if (keccak256(abi.encodePacked(dnaRegistry[msg.sender][i].name)) == keccak256(abi.encodePacked(_name))) {
                dnaRegistry[msg.sender][i].ipfsHash = _ipfsHash;
                emit DNAUpdated(msg.sender, _name, _ipfsHash);
                return;
            }
        }
        revert("DNA file not found.");
    }

    // Function to remove a DNA file by its name
    function removeDNA(string memory _name) public {
        require(bytes(_name).length > 0, "DNA name cannot be empty.");

        for (uint256 i = 0; i < dnaRegistry[msg.sender].length; i++) {
            if (keccak256(abi.encodePacked(dnaRegistry[msg.sender][i].name)) == keccak256(abi.encodePacked(_name))) {
                delete dnaRegistry[msg.sender][i];
                emit DNARemoved(msg.sender, _name);
                return;
            }
        }
        revert("DNA file not found.");
    }

     function calculateSimilarityScore(string memory _ipfsHash1, string memory _ipfsHash2) private pure returns (uint256) {
        bytes memory sequence1 = bytes(_ipfsHash1);
        bytes memory sequence2 = bytes(_ipfsHash2);

        uint256 m = sequence1.length;
        uint256 n = sequence2.length;

        uint256[][] memory scoreMatrix = new uint256[][](m + 1);

        for (uint256 i = 0; i < m + 1; i++) {
            scoreMatrix[i] = new uint256[](n + 1);
            scoreMatrix[i][0] = i;
        }

        for (uint256 j = 0; j < n + 1; j++) {
            scoreMatrix[0][j] = j;
        }

        for (uint256 i = 1; i <= m; i++) {
            for (uint256 j = 1; j <= n; j++) {
                if (sequence1[i - 1] == sequence2[j - 1]) {
                    scoreMatrix[i][j] = scoreMatrix[i - 1][j - 1];
                } else {
                    uint256 substitution = scoreMatrix[i - 1][j - 1] + 1;
                    uint256 deletion = scoreMatrix[i - 1][j] + 1;
                    uint256 insertion = scoreMatrix[i][j - 1] + 1;
                    scoreMatrix[i][j] = min(substitution, deletion, insertion);
                }
            }
        }

        uint256 similarityScore = (1 - (scoreMatrix[m][n] / max(m, n))) * 100;

        return similarityScore;
    }

    function getSimilarFiles(string memory _ipfsHash) public view returns (SimilarDNA[] memory) {
        bytes32 hash = keccak256(abi.encodePacked(_ipfsHash));
        return similarFiles[msg.sender][hash];
    }

    function min(uint256 a, uint256 b, uint256 c) private pure returns (uint256) {
        return a < b ? (a < c ? a : c) : (b < c ? b : c);
    }

    function max(uint256 a, uint256 b) private pure returns (uint256) {
        return a > b ? a : b;
    }
}