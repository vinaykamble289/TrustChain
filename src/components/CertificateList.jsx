// FILE: src/components/CertificateList.jsx
import React from 'react';
import CertificateCard from './CertificateCard';
import LoadingSpinner from './LoadingSpinner';

function CertificateList({ certificates, loading }) {
  if (loading) {
    return (
      <div className="py-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (!certificates || certificates.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start by uploading a new certificate.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {certificates.map((cert) => (
        <CertificateCard key={cert.certificateHash} certificate={cert} />
      ))}
    </div>
  );
}

export default CertificateList;

