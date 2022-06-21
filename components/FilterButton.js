import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const FilterButton = () => {
  return (
    <Flex
      alignItems={'center'}
      bg='white'
      px='8px'
      py='8px'
      borderRadius={'4px'}
      boxShadow='md'
      marginBottom={{ base: '6px', sm: '0px' }}
      color='blackAlpha.800'
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
            d='M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z'
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
          Filters
        </Text>
      </Box>
    </Flex>
  );
};

export default FilterButton;
