import './App.css';
import React, {useContext} from 'react';
import {Box, ChakraProvider, Tab, TabList, Tabs} from '@chakra-ui/react';
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';
import QuestionPage from "./page/QuestionPage";
import ManagerPage from "./page/ManagerPage";
import {GlobalContext} from "./store/GlobalProvider";

function App() {
  const {currentPosition} = useContext(GlobalContext);

  const getActiveTabIndex = () => {
    const path = window.location.pathname;
    if (path.startsWith('/questions/view')) {
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
            <Link to={`/questions/view/${currentPosition.page}`}>
              <Tab className={"tab-header"}>Question Bank</Tab>
            </Link>
            <Link to={'/managers'}>
              <Tab className={"tab-header"}>Management</Tab>
            </Link>
            {/*<Tab className={"tab-header"}>My Stars</Tab>*/}
          </TabList>
          <Box mt={12}>
            <Routes>
              <Route exact path='/' element={<Navigate to="/questions/view/1"/>}/>
              <Route exact path="/questions/view/:page" element={<QuestionPage/>}/>
              <Route exact path='/managers' element={<ManagerPage/>}/>
            </Routes>
          </Box>
        </Tabs>
      </Router>
    </ChakraProvider>
  );
}

export default App;