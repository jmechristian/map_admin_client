import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilteredPins,
  setDepartment,
  setSubcategories,
  getFilteredPins,
  clearAllFilters,
} from '../data/filterSlice';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Select,
  FormLabel,
  Button,
  CheckboxGroup,
  Checkbox,
  Stack,
} from '@chakra-ui/react';

const FilterDrawer = ({ openFilter, closeFilter, allPins }) => {
  useEffect(() => {
    dispatch(setFilteredPins(allPins));
  });

  const dispatch = useDispatch();

  const department = useSelector((state) => state.filter.department);
  const subcategories = useSelector((state) => state.filter.subcategories);
  const { selectedSubcategories } = useSelector((state) => state.filter);

  const getCount = (value) => {
    const count = allPins.filter(
      (proj) => proj.attributes.department.data.attributes.name === value
    ).length;
    return count;
  };

  // const getSubCount = (value) => {
  //   const items = allPins.filter(
  //    (proj => )

  //   return count;
  // };

  return (
    <Drawer
      isOpen={openFilter}
      placement='left'
      onClose={closeFilter}
      size={'xs'}
      autoFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filter Projects</DrawerHeader>

        <DrawerBody>
          <Box pb={'3'}>
            <FormLabel htmlFor='dept'>Department</FormLabel>
            <Select
              placeholder='Select Department'
              id='dept'
              onChange={(e) => dispatch(setDepartment(e.target.value))}
              borderColor={'gray.300'}
              value={department ? department : ''}
            >
              <option value='Architecture'>Architecture</option>
              <option value='Commercial Interiors'>Commercial Interiors</option>
              <option value='Residential Interiors'>
                Residential Interiors
              </option>
              <option value='Akseizer Residential'>Akseizer Residential</option>
              <option value='Branding and Marketing'>
                Branding &amp; Marketing
              </option>
            </Select>
          </Box>
          {/* {department != '' ? (
            <Stack spacing={2} direction={'column'}>
              <Box py={'2'}>
                <FormLabel htmlFor='subcategory'>Subcategory</FormLabel>
                <CheckboxGroup
                  colorScheme='blackAlpha'
                  id='subcategory'
                  defaultValue={subcategories}
                  value={
                    selectedSubcategories
                      ? selectedSubcategories
                      : subcategories
                  }
                  onChange={(value) => dispatch(setSubcategories(value))}
                >
                  <Stack spacing={1} direction={'column'}>
                    {subcategories.map((cat, index) => {
                      return (
                        <Checkbox
                          key={index}
                          value={cat}
                          borderColor={'gray.300'}
                        >
                          {cat} &#40;{getSubCount(`${cat}`)}&#41;
                        </Checkbox>
                      );
                    })}
                  </Stack>
                </CheckboxGroup>
              </Box>
            </Stack>
          ) : (
            ''
          )} */}
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant='outline'
            mr={3}
            onClick={() => dispatch(clearAllFilters())}
          >
            Clear Filters
          </Button>
          <Button
            bgColor={'brand.900'}
            color={'white'}
            _hover={{ bgColor: 'brand.900' }}
            onClick={() => {
              dispatch(getFilteredPins());
              closeFilter();
            }}
          >
            Set Filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
