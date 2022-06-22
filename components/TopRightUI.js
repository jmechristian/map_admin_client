import React from 'react';
import FilterButton from './FilterButton';
import ResetButton from './ResetButton';
import { Box, Flex } from '@chakra-ui/react';

const TopRightUI = ({ setView, closePopup }) => {
  return (
    <Flex
      width={'100%'}
      alignItems={'center'}
      flexDirection={{ base: 'column', sm: 'row' }}
    >
      <Box marginRight={{ base: 'none', sm: '8px' }}>
        <FilterButton />
      </Box>
      <Box
        onClick={() => {
          setView();
          closePopup();
        }}
        cursor='pointer'
      >
        <ResetButton />
      </Box>
    </Flex>
  );
};

export default TopRightUI;
