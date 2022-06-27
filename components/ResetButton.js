import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const ResetButton = () => {
  return (
    <Flex
      alignItems={'center'}
      bg='white'
      px='8px'
      py='6px'
      borderRadius={'4px'}
      boxShadow='md'
      marginBottom={{ base: '6px', sm: '0px' }}
      color='blackAlpha.800'
    >
      <Box width={'16px'} boxSizing='border-box'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z' />
        </svg>
      </Box>
      <Box>
        <Text
          display={{ base: 'none', sm: 'inline-block' }}
          marginLeft={'6px'}
          fontSize='medium'
        >
          Reset
        </Text>
      </Box>
    </Flex>
  );
};

export default ResetButton;
