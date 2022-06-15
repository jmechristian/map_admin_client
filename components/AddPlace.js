import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPin } from '../data/pinSlice';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Select,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const AddPlace = ({ open, closeDrawer, place, setView, updatePins }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (place) {
      setLng(place.center[0]);
      setLat(place.center[1]);
      setAddress(place.place_name);
    }
  }, [place]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      data: {
        lng: lng,
        lat: lat,
        name: name,
        address: address,
        description: description,
        department: department,
      },
    };

    if (department === '') {
      setError('Please choose a department');
    } else if (name === '') {
      setError('Please add a project name');
    } else {
      setIsLoading(true);
      const res = await axios
        .post('http://localhost:1337/api/projects', data, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${user.user.jwt}`,
          },
        })
        .then((res) => {
          if (res.status == '200') {
            closeDrawer(false);
            setView();
            dispatch(setPin(null));
            updatePins();
          }
        })
        .catch((err) => console.log(err));
    }

    setIsLoading(false);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    setError(null);
  };

  const selectHandler = (e) => {
    if (e.target.value === 'architecture') {
      setDepartment(1);
      setError(null);
    }

    if (e.target.value === 'commercial') {
      setDepartment(2);
      setError(null);
    }

    if (e.target.value === 'residential') {
      setDepartment(3);
      setError(null);
    }

    if (e.target.value === 'akres') {
      setDepartment(4);
      setError(null);
    }

    if (e.target.value === 'branding') {
      setDepartment(5);
      setError(null);
    }
  };

  return (
    <>
      <Drawer isOpen={open} onClose={() => closeDrawer(false)} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={'3xl'} mb={'2'}>
            Add New Project
          </DrawerHeader>
          <DrawerBody>
            <Box height={'100%'}>
              <Flex direction='column'>
                <FormControl>
                  <Flex pb={'3'}>
                    <Box>
                      <FormLabel htmlFor='lng'>Longitude</FormLabel>
                      <Input
                        id='lng'
                        type='lng'
                        disabled={true}
                        borderColor={'gray.300'}
                        value={place ? place.center[0] : ''}
                      />
                      <FormHelperText>Required</FormHelperText>
                    </Box>
                    <Spacer />
                    <Box>
                      <FormLabel htmlFor='lat'>Latitude</FormLabel>
                      <Input
                        id='lat'
                        type='lat'
                        disabled={true}
                        borderColor={'gray.300'}
                        value={place ? place.center[1] : ''}
                      />
                      <FormHelperText>Required</FormHelperText>
                    </Box>
                  </Flex>
                  <Box py={'3'}>
                    <FormLabel htmlFor='name'>Project Name</FormLabel>
                    <Input
                      id='name'
                      type='name'
                      value={name}
                      borderColor={'gray.300'}
                      onChange={nameHandler}
                    />
                    <FormHelperText>Required</FormHelperText>
                  </Box>
                  <Box py={'3'}>
                    <FormLabel htmlFor='dept'>Department</FormLabel>
                    <Select
                      placeholder='Select Department'
                      id='dept'
                      onChange={selectHandler}
                      borderColor={'gray.300'}
                    >
                      <option value='architecture'>Architecture</option>
                      <option value='commercial'>Commercial Interiors</option>
                      <option value='residential'>Residential Interiors</option>
                      <option value='akres'>AkRes</option>
                      <option value='branding'>Branding &amp; Marketing</option>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </Box>
                  <Box py={'3'}>
                    <FormLabel htmlFor='address'>Address</FormLabel>
                    <Input
                      id='address'
                      type='address'
                      borderColor={'gray.300'}
                      value={place ? place.place_name : ''}
                      disabled={true}
                    />
                    <FormHelperText>Required</FormHelperText>
                  </Box>
                  <Box py={'3'}>
                    <FormLabel htmlFor='name'>
                      Project Description (Optional)
                    </FormLabel>
                    <Textarea
                      placeholder='Add optional project description'
                      onChange={(e) => setDescription(e.target.value)}
                      borderColor={'gray.300'}
                    />
                  </Box>
                </FormControl>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme='pink'
                  my={'4'}
                  size={'lg'}
                  onClick={submitHandler}
                  isLoading={isLoading}
                  loadingText='Submitting...'
                >
                  Add to Map
                </Button>
                <Box>
                  <Text color='red.500' fontStyle='italic'>
                    {error ? error : ''}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddPlace;
