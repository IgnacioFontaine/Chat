import { Box } from "@mui/material"
// import sound from "../assets/chat.mp3"
import { getDownloadURL } from "firebase/storage";

const handlePlay = async (message) => {
  const url_download = await getDownloadURL(message.message)
  return url_download
}

function AudioRepro() {
  const message = {
    id: 'de31f679-380a-4413-8041-6cfc09030058',
    room: 10,
    type: 'audio',
    author: 'testing',
    message:
      "https://firebasestorage.googleapis.com/v0/b/notwhatsapp-b1189.appspot.com/o/audio%2Fcad68cc5-1573-42a0-9ce6-68628bf28b7d?alt=media&token=045b5b84-3923-4263-88a3-6f1b73fbafe6",
    time: '2024-04-22T20:59:52'
  };
  const url = handlePlay(message)
  
  return (
    <Box>
      <audio controls >
        <source src={url} type="audio/mpeg" />
      </audio>
    </Box>
  );
}

export default AudioRepro;