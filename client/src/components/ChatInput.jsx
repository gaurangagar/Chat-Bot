import React from 'react'

const ChatInput = ({message,setMessage,sendMessage, onTyping}) => {
  return (
    <div className='mt-2.5 flex'>
        <input
          placeholder="Type your message"
          className="w-[95%] flex-grow resize-none border rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
            onTyping()
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 text-sm rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
  )
}

export default ChatInput