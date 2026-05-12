import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#484f7a' },
    secondary: { main: '#cf0389' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text: { primary: '#313030', secondary: '#797676' },
    divider: '#cac9c9',
  },
  typography: {
    fontFamily: '"Roboto", "Inter", sans-serif',
    h4: { fontSize: '2rem', fontWeight: 400, lineHeight: '2.5rem', letterSpacing: 0 },
    h5: { fontSize: '1.75rem', fontWeight: 400, lineHeight: '2.25rem', letterSpacing: 0 },
    h6: { fontSize: '1.5rem', fontWeight: 400, lineHeight: '2rem', letterSpacing: 0 },
    subtitle1: { fontSize: '1rem', fontWeight: 500, lineHeight: '1.5rem', letterSpacing: '0.15px' },
    body1: { fontSize: '1rem', fontWeight: 400, lineHeight: '1.5rem', letterSpacing: '0.5px' },
    body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: '1.25rem', letterSpacing: '0.25px' },
    caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: '1rem', letterSpacing: '0.4px' },
    button: { fontSize: '0.875rem', fontWeight: 500, lineHeight: '1.25rem', letterSpacing: '0.1px', textTransform: 'none' },
  },
  spacing: 8,
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 100, textTransform: 'none', fontWeight: 500 },
        contained: { backgroundColor: '#cf0389', color: '#ffffff', '&:hover': { backgroundColor: '#b00278' } },
        outlined: {
          borderColor: '#484f7a',
          color: '#484f7a',
          '&:hover': { backgroundColor: 'rgba(72,79,122,0.04)' },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: { root: { color: '#484646', '&.Mui-checked': { color: '#484f7a' } } },
    },
    MuiRadio: {
      styleOverrides: { root: { color: '#484646', '&.Mui-checked': { color: '#484f7a' } } },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: '#ffffff',
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#484f7a' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#484f7a' },
        },
        notchedOutline: { borderColor: '#626060' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: '#535353', '&.Mui-focused': { color: '#484f7a' } },
      },
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: 28 } },
    },
    MuiTooltip: {
      styleOverrides: { tooltip: { backgroundColor: '#313030', fontSize: '0.75rem' } },
    },
  },
});

export default theme;
