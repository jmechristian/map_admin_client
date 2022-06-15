import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../data/userSlice';
import { useCookies } from 'react-cookie';

import axios from 'axios';
import {
  Box,
  Button,
  Center,
  Image,
  Flex,
  FormControl,
  Input,
  Text,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(['adg-auth']);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    setLoading(true);
    const res = await axios
      .post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password,
      })
      .then((res) => {
        if (res.status == '200') {
          dispatch(setUser(res.data));
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
    setUsername('');
    setPassword('');
  }, [username, password, dispatch]);

  useEffect(() => {
    if (user.user && !cookies['adg-auth']) {
      setCookie(
        setCookie('adg-auth', user.user, { path: '/', maxAge: 1209600 })
      );
    }
  });

  return (
    <Box
      width='100%'
      height='100vh'
      style={{
        backgroundImage: `url(
          'https://adg-projects.nyc3.cdn.digitaloceanspaces.com/assets/login-back-gray.png'
        )`,
      }}
    >
      <Center height='100%'>
        <Box
          bg='white'
          borderRadius={'md'}
          boxShadow='lg'
          width={['80%', '50%', '50%', '40%', '25%']}
        >
          <Flex direction={'column'} padding={'10%'}>
            <Center width={'100%'} mb='8'>
              <Image
                src='https://adg-projects.nyc3.cdn.digitaloceanspaces.com/assets/ADG_RGB.svg'
                alt='ADG Logo'
                width='100%'
                objectFit={'contain'}
              />
            </Center>
            <Box>
              <FormControl width={'100%'}>
                <Flex direction='column'>
                  <Box my='3'>
                    <Input
                      type={'text'}
                      size={['md', 'md', 'lg', 'lg', 'lg']}
                      id='username'
                      placeholder='Enter Username'
                      borderColor={'gray.300'}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Box>
                  <Box mb='3'>
                    <Input
                      type={'password'}
                      size={['md', 'md', 'lg', 'lg', 'lg']}
                      id='password'
                      placeholder='Enter Password'
                      borderColor={'gray.300'}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Box>
                </Flex>
                <Button
                  colorScheme='pink'
                  mt={'3'}
                  mb={'6'}
                  size={'lg'}
                  rightIcon={<ArrowForwardIcon />}
                  width='100%'
                  onClick={submitHandler}
                >
                  Submit
                </Button>
              </FormControl>
            </Box>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
};

export default Signin;
