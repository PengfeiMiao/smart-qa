import './App.css';
import React from 'react';
import {ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation} from 'react-router-dom';
import QuestionPage from "./page/QuestionPage";
import ManagerPage from "./page/ManagerPage";
import GlobalProvider from "./store/GlobalProvider";

function App() {
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
    <GlobalProvider>
      <ChakraProvider>
        <Router>
          <Tabs defaultIndex={getActiveTabIndex()}>
            <TabList className={"tab-headers"}>
              <Link to={'/questions/view/1'}>
                <Tab className={"tab-header"}>题库管理</Tab>
              </Link>
              <Link to={'/managers'}>
                <Tab className={"tab-header"}>题库管理</Tab>
              </Link>
              <Tab className={"tab-header"}>我的收藏</Tab>
            </TabList>
            <Routes>
              <Route exact path='/' element={<Navigate to="/questions/view/1" />}/>
              <Route exact path="/questions/view/:page" element={<QuestionPage />} />
              <Route exact path='/managers' element={<ManagerPage />}/>
            </Routes>
          </Tabs>
        </Router>
      </ChakraProvider>
    </GlobalProvider>
  );
}

export default App;