import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, XCircle, Search } from "lucide-react";

const VerifierDashboard = () => {
  const [hash, setHash] = useState("");
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!hash) {
      toast.error("Please enter a certificate hash.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/verify/${hash}`);
      if (response.data && response.data.length > 0) {
        setCertificateData(response.data);
        toast.success("Certificate found on blockchain.");
        setTimeout(() => navigate("/verified"), 1000);
      } else {
        toast.error("Certificate not found.");
        setTimeout(() => navigate("/unverified"), 1000);
      }
    } catch (error) {
      toast.error("Certificate not found.");
      setTimeout(() => navigate("/unverified"), 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Text */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-400 mb-2">
          Welcome to <span className="text-white">Verify</span>
        </h1>
        <p className="text-center text-lg text-blue-200 mb-10">
          Manage, verify, and validate academic certificates securely.
        </p>

        {/* Verification Form */}
        <div className="bg-[#1c1b2f] p-8 rounded-xl shadow-lg mb-10 transition-transform duration-300 transform hover:scale-105 hover:shadow-blue-700/40">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Verify Certificate Hash
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="text"
              placeholder="Enter Certificate Hash"
              className="w-full md:w-2/3 p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
            />
            <button
              onClick={handleVerify}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md"
            >
              <Search className="w-5 h-5" />
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>

          {/* Certificate Data (Optional Display) */}
          {certificateData && (
            <div className="mt-6 bg-blue-900/20 p-4 rounded-md border border-blue-400">
              <p><strong>Wallet:</strong> {certificateData[0]}</p>
              <p><strong>Hash:</strong> {hash}</p>
              <p>
                <strong>URL:</strong>{" "}
                <a
                  href={certificateData[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 underline"
                >
                  View Certificate
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Verified */}
          <div className="bg-[#1c1b2f] p-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500 border border-blue-600">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-700 p-3 rounded-lg">
                <CheckCircle className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Verified Certificates</h3>
                <p className="text-blue-300 text-sm mt-1">
                  Certificates validated successfully on the blockchain.
                </p>
              </div>
            </div>
            <Link to="/verified" className="block">
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
                View Verified
              </button>
            </Link>
          </div>

          {/* Unverified */}
          <div className="bg-[#1c1b2f] p-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500 border border-red-600">
            <div className="flex items-center space-x-4">
              <div className="bg-red-600 p-3 rounded-lg">
                <XCircle className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Unverified Certificates</h3>
                <p className="text-red-300 text-sm mt-1">
                  Certificates not found or suspected to be tampered.
                </p>
              </div>
            </div>
            <Link to="/unverified" className="block">
              <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors">
                View Unverified
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifierDashboard;