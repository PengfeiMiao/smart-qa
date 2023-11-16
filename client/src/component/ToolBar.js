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
    } else if (path.startsWith('/management')) {
      return 1;
    } else {
      return 2;
    }
  };

  return (
    <Tabs defaultIndex={getActiveTabIndex(location.pathname)}>
      <TabList className={"tab-headers"}>
        <Link to={`/question-bank/${currentPosition.datasetId}/view/${currentPosition.page}`}>
          <Tab className={"tab-header"}>Question Bank</Tab>
        </Link>
        <Link to={'/management'}>
          <Tab className={"tab-header"}>Management</Tab>
        </Link>
        {/*<Tab className={"tab-header"}>My Stars</Tab>*/}
      </TabList>
    </Tabs>
  );
};

export default ToolBar;