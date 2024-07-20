import { createTheme } from "@mui/material";
import { MuiTextField } from "./TextFieldTheme";
import { MuiButton } from "./ButtonTheme";

export const theme = createTheme({
  //Theme colors:
  palette: {
    primary: {
      main: '#FFF2CC',
    },
    secondary: {
      main: '#FF0000',
    },
  },
  //Theme fonts:
  typography: {
    allVariants: {
      fontFamily: 'Lucida Handwriting',
      textTransform: 'none',
    },
  },
  //Theme components:
  components: {
    MuiTextField,
    MuiButton
  }
});