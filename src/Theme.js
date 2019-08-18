import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: green[700],
      alt1: green[200]
    },
    secondary: {
      main: '#f8bbd0'
    }
  }
});