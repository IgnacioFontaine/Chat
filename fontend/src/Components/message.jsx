import { Avatar, Box, Paper, Typography } from "@mui/material";


export const Message = ({ message, username }) => {
  const isMe = message.author === username;
  // Verificar si el mensaje es de tipo "file"
  const isFileMessage = message.type === "file";
  const id_message = crypto.randomUUID()

  //Renderizar el tiempo
  const timestamp = new Date(message.time);
  const day = timestamp.getDate();
  const month = timestamp.getMonth() + 1;
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const formattedTime = `${day}/${month} ${hours}:${minutes}`;

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
        <Avatar sx={{ bgcolor: isMe ? "#3E2A61" : "primary.main"  }} alt={message.author}>
          {isMe ? "Me" : message.author[0].toUpperCase()}
        </Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isMe ? 0 : 1,
            mr: isMe ? 1 : 0,
            backgroundColor: isMe ? "#3E2A61" : "primary.light" ,
            borderRadius: isMe ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
          }}
        >
          {isFileMessage ? (
            <img src={message.message} alt="Imagen adjunta" />
          ) : (
            <Typography variant="body1" color={"whitesmoke"} >{message.message}</Typography>
          )}
          
          <Typography
            variant="caption"
            color={"whitesmoke"}
            sx={{ display: "block",
            textAlign: "flex-start"}} >{formattedTime}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};