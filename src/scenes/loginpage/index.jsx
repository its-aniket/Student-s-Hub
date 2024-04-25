import { Box ,Typography,useTheme ,useMediaQuery} from "@mui/material";
import React from "react";
import Form from "./From"
const Loginpage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%">
        <Typography 
        fontWeight="bold" 
        fontSize="32px" 
        color="#7af595" 
        align="center">
          Student's Hub
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" textAlign="center" sx={{mb:"1.5rem"}}>
          Welcome to Student's Hub, the platform made for student's from the students
        </Typography>
        <Form />
        
      </Box>
    </Box>
  );
};

export default Loginpage;
