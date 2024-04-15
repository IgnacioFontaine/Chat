import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";


function Image(props) {
  const [imageSrc, setImageSrc] = useState("")

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(props.blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    }
    
  }, [props.blob]);

  return (
    <img style={{width:150, height:"auto"}} src={imageSrc} alt={"File"}  ></img>
  )
}

export const Message = ({ message, username }) => {
  const isMe = message.author === username;
  // Verificar si el mensaje es de tipo "file"
  const isFileMessage = message.type === "file";
  const id_message = crypto.randomUUID()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMe ? "flex-end" :"flex-start",
        mb: 2,
      }}
      key={id_message}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMe ? "row-reverse" :"row" ,
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: isMe ? "secondary.main" : "primary.main"  }} alt={message.author}>
          {isMe ? "Me" : message.author[0].toUpperCase()}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isMe ? 0 : 1,
            mr: isMe ? 1 : 0,
            backgroundColor: isMe ? "secondary.light" : "primary.light" ,
            borderRadius: isMe ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
          }}
        >
          {isFileMessage ? (
            <Image blob={message.message} />
          ) : (
            <Typography variant="body1" >{message.message}</Typography>
          )}
          
          <Typography variant="caption"
            sx={{ display: "block",
        textAlign: "flex-start"}} >{message.time}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};