import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Components/chat'

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit('join_room', room)
    }
  }
  return (
    <>
      <div className='chat'>
        <h3>Unirme al chat</h3>
        <input type='text' placeholder='Walt....' onChange={event => setUsername(event.target.value)}></input>
        <input type='text' placeholder='ID Sala:' onChange={event => setRoom(event.target.value)}></input>
        <button onClick={joinRoom}>Join</button>
        <Chat socket={socket} username={username} room={room} />
      </div>
    </>
  )
}

export default App
