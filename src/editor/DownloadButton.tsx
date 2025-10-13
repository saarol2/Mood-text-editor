import React from 'react'

interface DownloadButtonProps {
  onDownload: () => void
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onDownload }) => (
  <button
    onClick={onDownload}
    style={{ background: '#353a4a', color: '#e6eaf3', border: 'none', borderRadius: 5, padding: '3px 12px', fontSize: '0.98em', cursor: 'pointer' }}
  >
    Download
  </button>
)

export default DownloadButton
