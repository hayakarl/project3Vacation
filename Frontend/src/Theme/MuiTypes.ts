import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from "@mui/material"

//TextField theme type:
export type MuiTextFieldType = {
    defaultProps?: ComponentsProps["MuiTextField"];
    styleOverrides?: ComponentsOverrides<Theme>["MuiTextField"];
    variants?: ComponentsVariants<Theme>["MuiTextField"];
};


//Button theme type:
export type MuiButtonType = {
    defaultProps?: ComponentsProps["MuiButton"];
    styleOverrides?: ComponentsOverrides<Theme>["MuiButton"];
    variants?: ComponentsVariants<Theme>["MuiButton"];
};