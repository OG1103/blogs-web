import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../app/Theme/theme";
import { AuthProvider } from "@/app/Providers/AuthContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
