import { useEffect, useState } from "react"

function Chat({ socket, username, room }) {
  
  const [currentMessage, setcurrentMessage] = useState("")

  const sendMessage = async () => {
    if (username && currentMessage) {
      const info = {
        message: currentMessage,
        room,
        author: username,
        time: new Date(Date.now()).getHours() +":"+ new Date(Date.now()).getMinutes(),
      }

      await socket.emit("send_message", info)
    }
  }

  useEffect(() => {
    socket.on("recieve_message", () => {
      
    })
  },[socket])
  
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
        <button onClick={sendMessage}>&#9658;</button>
      </section>
    </div>
  )
}

export default Chat