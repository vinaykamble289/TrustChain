
// src/components/CertificateCard.jsx
import React from 'react';
// import '../styles/CertificateCard.css';

function CertificateCard({ certificate }) {
  return (
    <div className="certificate-card">
      <div className="certificate-header">
        <div className="certificate-type-badge">{certificate.type}</div>
        <h3 className="certificate-name">{certificate.name}</h3>
      </div>
      
      <div className="certificate-body">
        <div className="certificate-detail">
          <span className="detail-label">Issued By:</span>
          <span className="detail-value">{certificate.issuer}</span>
        </div>
        
        <div className="certificate-detail">
          <span className="detail-label">Issued Date:</span>
          <span className="detail-value">{certificate.issuedDate}</span>
        </div>
        
        {certificate.expiryDate && (
          <div className="certificate-detail">
            <span className="detail-label">Expiry Date:</span>
            <span className="detail-value">{certificate.expiryDate}</span>
          </div>
        )}
        
        {certificate.grade && (
          <div className="certificate-detail">
            <span className="detail-label">Grade:</span>
            <span className="detail-value">{certificate.grade}</span>
          </div>
        )}
      </div>
      
      <div className="certificate-footer">
        <p className="certificate-additional">
          {certificate.additionalDetails}
        </p>
        <div className="certificate-actions">
          <button className="view-btn">View Details</button>
          <button className="share-btn">Share</button>
        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
