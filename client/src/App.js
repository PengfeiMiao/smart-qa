import './App.css';
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import QuestionPage from "./page/QuestionPage";

function App() {
  return (
    <ChakraProvider>
      <QuestionPage />
    </ChakraProvider>
  )
}

export default App;
