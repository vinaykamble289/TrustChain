import React from "react";
import { XCircle } from "lucide-react";

const Unverified = () => {
  const unverifiedCertificates = [
    {
      id: "1",
      attemptedHash: "0xabc...789",
      checkedOn: "2025-04-18",
    },
    // Add more objects here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 pt-24">
      <h1 className="text-4xl font-bold text-red-400 text-center mb-2">
        Unverified Certificates
      </h1>
      <p className="text-center text-red-200 mb-10">
        These certificates could not be verified or were flagged as invalid.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {unverifiedCertificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#1c1b2f] border border-red-500 p-6 rounded-xl shadow hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4">
              <XCircle className="text-red-400 mr-3 w-6 h-6" />
              <h3 className="text-xl font-semibold">Verification Failed</h3>
            </div>
            <p><strong>Attempted Hash:</strong> {cert.attemptedHash}</p>
            <p><strong>Checked On:</strong> {cert.checkedOn}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Unverified;