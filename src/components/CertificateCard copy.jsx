
// FILE: src/components/CertificateCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { truncateAddress, formatDate } from '../utils/helpers';

function CertificateCard({ certificate }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{certificate.studentName}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${certificate.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {certificate.isValid ? 'Valid' : 'Invalid'}
        </span>
      </div>
      
      <div className="mb-4 text-gray-600">
        <p><span className="font-medium">Course:</span> {certificate.courseDetails}</p>
        <p><span className="font-medium">Issued on:</span> {formatDate(certificate.issueDate)}</p>
        <p><span className="font-medium">Issuer:</span> {truncateAddress(certificate.issuer)}</p>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md mb-4 overflow-x-auto">
        
<p className="font-mono text-xs break-all">
          <span className="text-gray-500">Certificate Hash:</span> {certificate.certificateHash}
        </p>
      </div>
      
      <Link 
        to={`/verify?hash=${certificate.certificateHash}`} 
        className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center"
      >
        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Verify Certificate
      </Link>
    </div>
  );
}

export default CertificateCard;