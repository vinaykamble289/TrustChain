import React from "react";
import { CheckCircle, Verified as VerifiedIcon } from "lucide-react";

const Verified = () => {
  const verifiedCertificates = [
    {
      id: "1",
      studentWallet: "0x123...abc",
      fileUrl: "https://drive.google.com/xyz",
      issuedOn: "2025-04-18",
    },
    // Add more objects here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 pt-24">
      <h1 className="text-4xl font-bold text-blue-400 text-center mb-2">
        Verified Certificates
      </h1>
      <p className="text-center text-blue-200 mb-10">
        These certificates were successfully verified on the blockchain.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {verifiedCertificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#1c1b2f] border border-blue-500 p-6 rounded-xl shadow hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4">
              <CheckCircle className="text-green-400 mr-3 w-6 h-6" />
              <h3 className="text-xl font-semibold">Certificate Verified</h3>
            </div>
            <p><strong>Student Wallet:</strong> {cert.studentWallet}</p>
            <p><strong>Issued On:</strong> {cert.issuedOn}</p>
            <a
              href={cert.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="block mt-4 text-blue-400 underline"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Verified;