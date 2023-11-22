import {Box, Text} from "@chakra-ui/react";
import React from "react";

const LabelValue = ({label, value, labelStyle, valueStyle}) => {
  return <Box display="flex">
    <Text fontWeight="bold" style={labelStyle} translate={'no'}>{label}</Text><Text style={valueStyle}>{value}</Text>
  </Box>;
}

export default LabelValue;