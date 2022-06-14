import React from 'react';
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

const signin = () => {
  return (
    <Box width='100%' height='100vh' bg='blue.500'>
      <Center height='100%'>
        <Box
          bg='white'
          borderRadius={'md'}
          boxShadow='lg'
          width={['80%', '50%', '50%', '40%', '25%']}
        >
          <Flex direction={'column'} padding={['40px', '52px']}>
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
                      size={'lg'}
                      id='username'
                      placeholder='Enter Username'
                      borderColor={'gray.300'}
                    />
                  </Box>
                  <Box mb='3'>
                    <Input
                      type={'password'}
                      size={'lg'}
                      id='password'
                      placeholder='Enter Password'
                      borderColor={'gray.300'}
                    />
                  </Box>
                </Flex>
                <Button
                  colorScheme='blackAlpha'
                  mt={'3'}
                  mb={'8'}
                  size={'lg'}
                  rightIcon={<ArrowForwardIcon />}
                  width='100%'
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

export default signin;
