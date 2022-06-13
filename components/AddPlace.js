import { useEffect, useState } from 'react';
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
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const AddPlace = ({ open, closeDrawer, place }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (place) {
      setLng(place.center[0]);
      setLat(place.center[1]);
      setAddress(place.place_name);
    }
  }, [place]);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = {
      lng: lng,
      lat: lat,
      name: name,
      address: address,
      description: description,
    };

    console.log(formData);
  };

  return (
    <>
      <Drawer isOpen={open} onClose={() => closeDrawer(false)} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add New Project</DrawerHeader>
          <DrawerBody>
            <Box height={'100%'}>
              <Flex direction='column'>
                <FormControl>
                  <Flex pb={'2'}>
                    <Box>
                      <FormLabel htmlFor='lng'>Longitude</FormLabel>
                      <Input
                        id='lng'
                        type='lng'
                        disabled={true}
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
                        value={place ? place.center[1] : ''}
                      />
                      <FormHelperText>Required</FormHelperText>
                    </Box>
                  </Flex>
                  <Box py={'2'}>
                    <FormLabel htmlFor='name'>Project Name</FormLabel>
                    <Input
                      id='name'
                      type='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FormHelperText>Required</FormHelperText>
                  </Box>
                  <Box py={'2'}>
                    <FormLabel htmlFor='dept'>Department</FormLabel>
                    <Select placeholder='Select Department' id='dept'>
                      <option value='option1'>Architecture</option>
                      <option value='option2'>Commercial Interiors</option>
                      <option value='option3'>AkRes</option>
                      <option value='option3'>Branding &amp; Marketing</option>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </Box>
                  <Box py={'2'}>
                    <FormLabel htmlFor='address'>Address</FormLabel>
                    <Input
                      id='address'
                      type='address'
                      value={place ? place.place_name : ''}
                      disabled={true}
                    />
                  </Box>
                  <Box py={'2'}>
                    <FormLabel htmlFor='name'>
                      Project Description (Optional)
                    </FormLabel>
                    <Textarea
                      placeholder='Add optional project description'
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Box>
                </FormControl>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme='teal'
                  my={'4'}
                  size={'lg'}
                  onClick={submitHandler}
                >
                  Add to Map
                </Button>
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddPlace;
