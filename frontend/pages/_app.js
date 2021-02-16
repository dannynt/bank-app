import "../assets/styles/globals.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { AuthProvider } from "../context/auth";
import MainContainer from "../components/MainContainer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#053661",
      light: "#0a6ac3",
    },
    secondary: {
      main: "#ffcc00",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

function App({ Component, pageProps, router }) {
  const privatePages = ["/account", "/transactions", "/admin"];
  const adminPages = ["/admin"];
  const { pathname } = router;

  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <MainContainer isPrivatePage={privatePages.includes(pathname)} isAdminPage={adminPages.includes(pathname)}>
          <Component {...pageProps} />
        </MainContainer>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
