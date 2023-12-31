import './App.module.css';
import React from 'react';
import {Box, ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import ManagerPage from "./page/ManagerPage";
import QuesBankPage from "./page/QuesBankPage";
import LoginPage from "./page/LoginPage";
import GlobalProvider from "./store/GlobalProvider";
import NotePage from "./page/NotePage";

function App() {
  return (
    <GlobalProvider>
      <ChakraProvider>
        <Router>
          <Box pt={12} background={'#F9F9F9'}>
            <Routes>
              <Route exact path='/' element={<Navigate to="/question-bank/1/view/1"/>}/>
              <Route exact path="/question-bank/:dataset/view/:page" element={<QuesBankPage/>}/>
              <Route exact path='/management' element={<ManagerPage/>}/>
              <Route exact path='/note-bank/:dataset/view' element={<NotePage/>}/>
              <Route exact path='/login' element={<LoginPage/>}/>
            </Routes>
          </Box>
        </Router>
      </ChakraProvider>
    </GlobalProvider>
  );
}

export default App;