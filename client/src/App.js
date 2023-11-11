import './App.css';
import React from 'react';
import {ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {BrowserRouter as Router, Route, Routes, Link, Navigate} from 'react-router-dom';
import QuestionPage from "./page/QuestionPage";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Tabs>
          <TabList className={"tab-headers"}>
            <Tab className={"tab-header"}>题库浏览
              {/*<Link to={'/questions/1'}>题库浏览</Link>*/}
            </Tab>
            <Tab className={"tab-header"}>题库管理</Tab>
            <Tab className={"tab-header"}>我的收藏</Tab>
          </TabList>

          <TabPanels>
            <TabPanel paddingX={0}>
              <Routes>
                <Route exact path='/' element={<Navigate to="/questions/view/1" />}/>
                <Route exact path="/questions/view/:page" element={<QuestionPage />} />
              </Routes>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Router>
    </ChakraProvider>
  );
}

export default App;