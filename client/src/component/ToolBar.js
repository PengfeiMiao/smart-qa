import {Tab, TabList, Tabs} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";
import React, {useContext} from "react";
import {GlobalContext} from "../store/GlobalProvider";

const ToolBar = () => {
  const {currentPosition} = useContext(GlobalContext);
  const location = useLocation();

  const getActiveTabIndex = (path) => {
    if (path.startsWith('/question-bank')) {
      return 0;
    } else if (path.startsWith('/note-bank')) {
      return 1;
    } else if (path.startsWith('/management')) {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <Tabs defaultIndex={getActiveTabIndex(location.pathname)}>
      <TabList position={'fixed'} w={'100%'} top={0} left={0} background={'white'} zIndex={1000}>
        <Link to={`/question-bank/${currentPosition.datasetId}/view/${currentPosition.page}`}>
          <Tab fontWeight={'bold'}>Question Bank</Tab>
        </Link>
        <Link to={`/note-bank/${currentPosition.datasetId}/view`}>
          <Tab fontWeight={'bold'}>Note Bank</Tab>
        </Link>
        <Link to={'/management'}>
          <Tab fontWeight={'bold'}>Management</Tab>
        </Link>
      </TabList>
    </Tabs>
  );
};

export default ToolBar;