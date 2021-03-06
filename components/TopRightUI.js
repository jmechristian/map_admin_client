import React from 'react';
import FilterButton from './FilterButton';
import ResetButton from './ResetButton';
import ListViewButton from './ListViewButton';
import { Box, Flex } from '@chakra-ui/react';

const TopRightUI = ({ setView, closePopup, openFilters, openListView }) => {
  return (
    <Flex
      width={'100%'}
      alignItems={'center'}
      flexDirection={{ base: 'column', sm: 'row' }}
    >
      <Box marginRight={{ base: 'none', sm: '8px' }} onClick={openFilters}>
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
      <Box marginLeft={{ base: 'none', sm: '8px' }} onClick={openListView}>
        <ListViewButton />
      </Box>
    </Flex>
  );
};

export default TopRightUI;
