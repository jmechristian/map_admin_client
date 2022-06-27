import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const ListViewButton = () => {
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
      css={{ cursor: 'pointer' }}
    >
      <Box width={'16px'}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
            clipRule='evenodd'
          />
        </svg>
      </Box>
      <Box>
        <Text
          display={{ base: 'none', sm: 'inline-block' }}
          marginLeft={'6px'}
          fontSize='medium'
        >
          List View
        </Text>
      </Box>
    </Flex>
  );
};

export default ListViewButton;
