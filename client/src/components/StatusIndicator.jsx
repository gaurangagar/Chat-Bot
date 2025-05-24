import React from 'react'

const StatusIndicator = ({ online }) => {
  return (
    <div
      className={`w-3 h-3 rounded-full ${
        online ? 'bg-green-500' : 'bg-red-500'
      }`}
      title={online ? 'Online' : 'Offline'}
    />
  )
}

export default StatusIndicator