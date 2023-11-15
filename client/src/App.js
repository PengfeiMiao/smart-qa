import './App.css';
import React, {useContext} from 'react';
import {Box, ChakraProvider, Tab, TabList, Tabs} from '@chakra-ui/react';
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';
import ManagerPage from "./page/ManagerPage";
import {GlobalContext} from "./store/GlobalProvider";
import QuesBankPage from "./page/QuesBankPage";

function App() {
  const {currentPosition} = useContext(GlobalContext);

  const getActiveTabIndex = () => {
    const path = window.location.pathname;
    if (path.startsWith('/question-bank')) {
      return 0;
    } else if (path.startsWith('/managers')) {
      return 1;
    } else {
      return 2;
    }
  };

  return (
    <ChakraProvider>
      <Router>
        <Tabs defaultIndex={getActiveTabIndex()}>
          <TabList className={"tab-headers"}>
            <Link to={`/question-bank/${currentPosition.datasetId}/view/${currentPosition.page}`}>
              <Tab className={"tab-header"}>Question Bank</Tab>
            </Link>
            <Link to={'/management'}>
              <Tab className={"tab-header"}>Management</Tab>
            </Link>
            {/*<Tab className={"tab-header"}>My Stars</Tab>*/}
          </TabList>
          <Box mt={12}>
            <Routes>
              <Route exact path='/' element={<Navigate to="/question-bank/1/view/1"/>}/>
              <Route exact path="/question-bank/:dataset/view/:page" element={<QuesBankPage/>}/>
              <Route exact path='/management' element={<ManagerPage/>}/>
            </Routes>
          </Box>
        </Tabs>
      </Router>
    </ChakraProvider>
  );
}

export default App;