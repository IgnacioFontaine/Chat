import { SelfImage } from "../Components/selfImage";
import SingInView from "./singIn";
import { Box } from "@mui/system";

export default function Dev() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <SelfImage sx={{ width: "100%", maxWidth: "600px" }} />
      <SingInView sx={{ width: "100%", maxWidth: "600px" }} />
    </Box>
  );
}