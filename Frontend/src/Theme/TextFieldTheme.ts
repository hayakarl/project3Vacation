import { red } from "@mui/material/colors";
import { MuiTextFieldType } from "./MuiTypes";

export const MuiTextField: MuiTextFieldType = {
    styleOverrides: {
        root:{
            width: "100%",
            margin: "15px 0",
            opacity: 0.5,
            backgroundColor: "red",

        }
    }
};
