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
      color='blackAlpha.800'
    >
      <Box width={'16px'} boxSizing='border-box'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z'
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
          Reset
        </Text>
      </Box>
    </Flex>
  );
};

export default ResetButton;
