import { createTheme } from '@mui/material/styles';
import { frFR } from '@mui/material/locale';
import { teal } from '@mui/material/colors';

const todolistTheme = createTheme({
    palette: {
      primary: {
        main: '#727932'
      },
      default: {
        main: '#727932'
      },
      text: {
        primary : 'rgba(114, 121, 50, 0.87)',
        secondary : 'rgba(114, 121, 50, 0.6',
        disabled : 'rgba(114, 121, 50, 0.38)',
      },
    },
    typography: {
      fontFamily: 'Montserrat'
    },
    // components: {
    //   MuiTextField : {
    //     styleOverrides : {
    //       root : {
    //         backgroundColor: '#004d40',
    //       }
    //     }
    //   }
    // }
  }, frFR);

export default todolistTheme;