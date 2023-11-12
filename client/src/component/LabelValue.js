import {Box, Text} from "@chakra-ui/react";
import React from "react";

const LabelValue = ({label, value, labelStyle}) => {
  return <Box display="flex">
    <Text fontWeight="bold" style={labelStyle}>{label}</Text><Text>{value}</Text>
  </Box>;
}

export default LabelValue;