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

    struct SimilarDNA {
        string name1;
        string name2;
        string ipfsHash1;
        string ipfsHash2;
        uint256 similarityPercentage;
    }

    address public owner;
    mapping(address => DNA[]) private dnaRegistry;
    mapping(address => mapping(bytes32 => SimilarDNA[])) private similarFiles;

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
        string ipfsHash
    );

    event FamilyMatch(
        address indexed user,
        uint256 similarityScore,
        string name1,
        string name2,
        string ipfsHash1,
        string ipfsHash2
    );

    constructor() {
        owner = msg.sender;
    }

    // The DNARegistry contract allows users to upload and manage DNA files associated with their addresses.
    // It also provides a similarity analysis between DNA files for potential family matches.

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }

    // Uploads a single DNA file with the specified name and IPFS hash for the contract owner.
    function uploadSingleDNA(string memory _name, string memory _ipfsHash) public onlyOwner {
        require(bytes(_name).length > 0, "DNA name cannot be empty.");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty.");

        // Check if the DNA file has already been uploaded by comparing the name and IPFS hash.
        for (uint256 i = 0; i < dnaRegistry[msg.sender].length; i++) {
            require(
                keccak256(abi.encodePacked(_name, _ipfsHash)) !=
                    keccak256(abi.encodePacked(dnaRegistry[msg.sender][i].name, dnaRegistry[msg.sender][i].ipfsHash)),
                "DNA file has already been uploaded."
            );
        }

        // Add the DNA file to the dnaRegistry mapping.
        dnaRegistry[msg.sender].push(DNA({ name: _name, ipfsHash: _ipfsHash }));

        // Perform similarity analysis to check for potential family matches.
        checkFamilyMatches(_name, _ipfsHash);

        emit DNAUploaded(msg.sender, _name, _ipfsHash);
    }

    // Performs similarity analysis between the uploaded DNA file and the existing DNA files of the owner.
    function checkFamilyMatches(string memory _name, string memory _ipfsHash) private {
        for (uint256 i = 0; i < dnaRegistry[msg.sender].length; i++) {
            // Calculate the similarity score between the uploaded DNA file and each existing DNA file.
            uint256 similarityScore = calculateSimilarityScore(_ipfsHash, dnaRegistry[msg.sender][i].ipfsHash);

            // If the similarity score is above the threshold (90%), record a family match.
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
    }

    // Retrieves the IPFS hash of a DNA file based on its name for the caller.
    function retrieveDNA(string memory _name) public view returns (string memory) {
        for (uint256 i = 0; i < dnaRegistry[msg.sender].length; i++) {
            if (keccak256(abi.encodePacked(dnaRegistry[msg.sender][i].name)) == keccak256(abi.encodePacked(_name))) {
                return dnaRegistry[msg.sender][i].ipfsHash;
            }
        }
        revert("DNA file not found.");
    }

    // Removes a DNA file from the dnaRegistry based on its IPFS hash for the caller.
    function removeDNA(string memory _ipfsHash) public {
        require(bytes(_ipfsHash).length > 0, "DNA ipfsHash cannot be empty.");

        for (uint256 i = 0; i < dnaRegistry[msg.sender].length; i++) {
            if (keccak256(abi.encodePacked(dnaRegistry[msg.sender][i].ipfsHash)) == keccak256(abi.encodePacked(_ipfsHash))) {
                delete dnaRegistry[msg.sender][i];
                emit DNARemoved(msg.sender, _ipfsHash);
                return;
            }
        }
        revert("DNA file not found.");
    }

    // Updates the IPFS hash of a DNA file based on its name for the caller.
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

    // Retrieves similar DNA files based on the given IPFS hash.
    function getSimilarFiles(string memory _ipfsHash) public view returns (SimilarDNA[] memory) {
        bytes32 hash = keccak256(abi.encodePacked(_ipfsHash));
        return similarFiles[msg.sender][hash];
    }

    // Calculates the similarity score between two DNA sequences using the Levenshtein distance algorithm.
    function calculateSimilarityScore(string memory _ipfsHash1, string memory _ipfsHash2) private pure returns (uint256) {
        bytes memory sequence1 = bytes(_ipfsHash1);
        bytes memory sequence2 = bytes(_ipfsHash2);

        uint256 m = sequence1.length;
        uint256 n = sequence2.length;

        uint256[][] memory scoreMatrix = new uint256[][](m + 1);

        // Initialize the score matrix.
        for (uint256 i = 0; i < m + 1; i++) {
            scoreMatrix[i] = new uint256[](n + 1);
            scoreMatrix[i][0] = i;
        }

        for (uint256 j = 0; j < n + 1; j++) {
            scoreMatrix[0][j] = j;
        }

        // Compute the Levenshtein distance and populate the score matrix.
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

        // Calculate the similarity score based on the Levenshtein distance.
        uint256 similarityScore = (1 - (scoreMatrix[m][n] / max(m, n))) * 100;

        return similarityScore;
    }

    // Returns the minimum of three numbers.
    function min(uint256 a, uint256 b, uint256 c) private pure returns (uint256) {
        if (a <= b && a <= c) {
            return a;
        }
        if (b <= a && b <= c) {
            return b;
        }
        return c;
    }

    // Returns the maximum of two numbers.
    function max(uint256 a, uint256 b) private pure returns (uint256) {
        return a > b ? a : b;
    }
}