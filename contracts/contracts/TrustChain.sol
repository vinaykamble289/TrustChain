// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TrustChain {
    struct Certificate {
        string studentName;
        string certificateHash;
        uint256 timestamp;
    }

    mapping(string => Certificate) public certificates;

    event CertificateRecorded(string studentId, string studentName, string certificateHash);

    function recordCertificate(string memory studentId, string memory studentName, string memory certificateHash) public {
        certificates[studentId] = Certificate(studentName, certificateHash, block.timestamp);
        emit CertificateRecorded(studentId, studentName, certificateHash);
    }

    function getCertificate(string memory studentId) public view returns (Certificate memory) {
        return certificates[studentId];
    }
}