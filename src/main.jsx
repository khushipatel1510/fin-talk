import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SocketContextProvider } from "./context/SocketContext.jsx";

// Define your custom logo and background image URLs
const logoUrl = "https://imagizer.imageshack.com/img922/9194/dRYBUS.jpg";
const backgroundImageUrl = "https://i.pinimg.com/originals/e0/67/f8/e067f85e867c15608110c48259536632.gif";

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: `url(${backgroundImageUrl})`, // Set background image
      backgroundSize: "cover", // Adjust background size as needed
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false, // Disable system color mode
};

const theme = extendTheme({
  config,
  styles,
  // Override the component where your logo is used
  components: {
    // Customize the component where your logo is used
    YourLogoComponent: {
      baseStyle: {
        background: `url(${logoUrl})`, // Set custom logo background
        backgroundSize: "cover", // Adjust logo background size as needed
        width: "40px", // Adjust logo width as needed
        height: "40px", // Adjust logo height as needed
        borderRadius: "50%", // Make the logo circular
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
