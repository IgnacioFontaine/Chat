import { useState } from "react"

function Chat({ socket, username, room }) {
  
  const [currentMessage, setcurrentMessage] = useState("")
  
  return (
    <div>
      <section className="chat-header">
        <p>Chat en vivo</p>
      </section>
      <section className="chat-messages">

      </section>
      <section className="chat-footer">
        <input type="text" placeholder="Message..."
        onChange={event => setcurrentMessage(event.target.value)}></input>
        <button>&#9658;</button>
      </section>
    </div>
  )
}

export default Chat