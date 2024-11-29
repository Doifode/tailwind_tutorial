import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import fileDownload from 'js-file-download';

const QRPage = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    const qrCanvas = document.getElementById('qr-code');
    const qrDataURL = qrCanvas.toDataURL('image/png');
    const documentContent = `
      Tree Information:
      - Name: ${state.treeName}
      - Species: ${state.treeSpecies}
      - Location: ${state.location}
      - Age: ${state.age}
      
      QR Code:
      ![QR Code](${qrDataURL})
    `;
    fileDownload(documentContent, 'tree_info.txt');
    setLoading(false);
  };

  return (
    <div className="qr-container">
      <h1>QR Code for Tree Information</h1>
      <QRCodeCanvas
        id="qr-code"
        value={JSON.stringify(state, null, 2)}
        size={200}
      />
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Downloading...' : 'Download Info'}
      </button>
    </div>
  );
};

export default QRPage;
