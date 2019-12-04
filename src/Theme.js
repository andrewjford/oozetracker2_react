import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

export default createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: green[700],
      alt1: green[200]
    },
    secondary: {
      main: "#f8bbd0"
    }
  },
  breakpoints: {
    keys: ["xxs", "xs", "sm", "md", "lg", "xl"],
    values: {
      xxs: 0,
      xs: 350,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});
