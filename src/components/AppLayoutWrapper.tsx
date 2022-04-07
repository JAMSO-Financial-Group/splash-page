import "focus-visible/dist/focus-visible"
import { FC } from "react"
import { Box, ChakraProvider } from "@chakra-ui/react"
import theme from "../theme"
import { Navbar } from "./Navbar"
import useDarkMode from "../hooks/useDarkMode"
import Footer from "./Footer"

const App: FC = ({ children }) => {
  useDarkMode()
  return (
    <Box minHeight="100%">
      <Box as="main">
        <Navbar />
        {children}
        <Footer />
      </Box>
    </Box>
  )
}

export const AppLayoutWrapper: FC = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <App>{children}</App>
    </ChakraProvider>
  )
}