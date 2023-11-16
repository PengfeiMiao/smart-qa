import React, {useState} from 'react';
import {Box, Button, Input, Text} from '@chakra-ui/react';
import './index.css'
import {setCookie} from "../store/CacheStore";
import {loginApi} from "../api/api";

const LoginPage = () => {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let body = await loginApi({password});
    if (body?.status) {
      setCookie('token', password);
      window.location.assign('/');
    }
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" ml={8}>Login Page</Text>
      <Input value={password} onChange={(e) => setPassword(e.target.value)}></Input>
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
}

export default LoginPage;