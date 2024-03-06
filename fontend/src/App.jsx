import { useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      
    }
  }
  return (
    <>
      <h1>Soy el chat</h1>
    </>
  )
}

export default App
