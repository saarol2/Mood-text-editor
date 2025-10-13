import React from 'react'
import UploadButton from './UploadButton'
import DownloadButton from './DownloadButton'

interface HeaderActionsProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDownload: () => void
  manualMood: string
  setManualMood: (m: string) => void
}

const moodOptions = [
  { value: 'auto', label: 'Auto (typing-based)' },
  { value: 'calm', label: 'Calm' },
  { value: 'focused', label: 'Focused' },
  { value: 'frustrated', label: 'Frustrated' },
  { value: 'uncertain', label: 'Uncertain' },
  { value: 'stressed', label: 'Stressed' },
]

const HeaderActions: React.FC<HeaderActionsProps> = ({ onUpload, onDownload, manualMood, setManualMood }) => (
  <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#23263a', borderRadius: 6, padding: '4px 12px' }}>
      <label htmlFor="mood-select" style={{ fontWeight: 500 }}>Test mood:</label>
      <select
        id="mood-select"
        value={manualMood}
        onChange={e => setManualMood(e.target.value)}
        style={{ fontSize: '1rem', padding: '2px 8px', borderRadius: 4, background: '#353a4a', color: '#e6eaf3', border: 'none' }}
      >
        {moodOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <span style={{ marginLeft: 10, fontSize: '0.95em', color: '#aaa' }}>
        {manualMood === 'auto' ? 'Automatic mood detection' : 'Manual override'}
      </span>
    </div>
    <UploadButton onUpload={onUpload} />
    <DownloadButton onDownload={onDownload} />
  </div>
)

export default HeaderActions
