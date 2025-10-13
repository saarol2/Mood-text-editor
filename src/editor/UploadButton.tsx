import React from 'react'

interface UploadButtonProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => (
  <>
    <input
      type="file"
      accept=".txt,text/plain"
      style={{ display: 'none' }}
      id="file-upload"
      onChange={onUpload}
    />
    <label htmlFor="file-upload" style={{ cursor: 'pointer', background: '#353a4a', color: '#e6eaf3', borderRadius: 5, padding: '3px 12px', fontSize: '0.98em' }}>
      Upload
    </label>
  </>
)

export default UploadButton
