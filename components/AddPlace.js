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
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Select,
  Text,
  Textarea,
  useDisclosure,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const AddPlace = ({
  open,
  closeDrawer,
  place,
  setView,
  updatePins,
  loadToast,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState([]);
  const [structure, setStructureType] = useState();
  const [subcategory, setSubcategory] = useState([]);
  const [collaborators, setCollaborators] = useState();
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
        subcategories: subcategory,
        project_types: checkboxValue,
        building_type: structure,
        createdAt: Date.now(),
        createBy: user.user.user.username,
        link: link,
        size: size,
        collaborators: collaborators,
      },
    };

    console.log(data);

    if (department === '') {
      setError('Please choose a department');
    } else if (name === '') {
      setError('Please add a project name');
    } else {
      setIsLoading(true);
      const res = await axios
        .post(
          'https://adg-projects-hs6ir.ondigitalocean.app/api/projects',
          data,
          {
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${user.user.jwt}`,
            },
          }
        )
        .then((res) => {
          if (res.status == '200') {
            closeDrawer(false);
            setName('');
            setSize('');
            setSubcategory([]);
            setView();
            dispatch(setPin(null));
            updatePins();
            loadToast();
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

  const projectTypes = [
    'New Construction',
    'Renovation',
    'Historic Renovation',
    'Addition',
  ];

  return (
    <>
      <Drawer isOpen={open} onClose={() => closeDrawer(false)} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={'3xl'}>Add New Project</DrawerHeader>
          <DrawerBody>
            <Box height={'100%'}>
              <Flex direction='column'>
                <FormControl>
                  <Box pb={2}>
                    <FormLabel htmlFor='name'>Project Name*</FormLabel>
                    <Input
                      id='name'
                      type='name'
                      value={name}
                      borderColor={'gray.300'}
                      onChange={nameHandler}
                      focusBorderColor='brand.900'
                    />
                  </Box>
                  <Flex py={2} justifyContent='space-between'>
                    <Box>
                      <FormLabel htmlFor='dept'>Department*</FormLabel>
                      <Select
                        placeholder='Select Department'
                        id='dept'
                        color='gray.500'
                        onChange={selectHandler}
                        borderColor={'gray.300'}
                        focusBorderColor='brand.900'
                      >
                        <option value='architecture'>Architecture</option>
                        <option value='commercial'>Commercial Interiors</option>
                        <option value='residential'>
                          Residential Interiors
                        </option>
                        <option value='akres'>AkRes</option>
                        <option value='branding'>
                          Branding &amp; Marketing
                        </option>
                      </Select>
                    </Box>
                    <Box>
                      <FormLabel htmlFor='name'>Size</FormLabel>
                      <Input
                        id='size'
                        placeholder='Project Size'
                        type='text'
                        borderColor={'gray.300'}
                        value={size ? size : ''}
                        onChange={(e) => setSize(e.target.value)}
                        focusBorderColor='brand.900'
                      />
                    </Box>
                  </Flex>
                  <Flex py={2} justifyContent='space-between'>
                    <Box>
                      <FormLabel htmlFor='sub'>Subcategory</FormLabel>
                      <Select
                        placeholder='Select Subcategory'
                        id='sub'
                        color='gray.500'
                        onChange={(e) =>
                          setSubcategory([...subcategory, e.target.value])
                        }
                        borderColor={'gray.300'}
                        focusBorderColor='brand.900'
                      >
                        <option value='1'>Multi-Family</option>
                        <option value='2'>Single-Family</option>
                        <option value='3'>Rowhomes</option>
                        <option value='4'>Commercial</option>
                        <option value='6'>Corporate</option>
                        <option value='7'>Apartments</option>
                        <option value='8'>Condominiums & Townhomes</option>
                        <option value='9'>Non-Profit</option>
                      </Select>
                    </Box>
                    <Box>
                      <FormLabel htmlFor='dept'>Structure Type</FormLabel>
                      <Select
                        placeholder='Select Structure Type'
                        id='structure'
                        onChange={(e) => setStructureType(e.target.value)}
                        color='gray.500'
                        borderColor={'gray.300'}
                        focusBorderColor='brand.900'
                      >
                        <option value='1'>Condo</option>
                        <option value='2'>Apartment</option>
                        <option value='3'>Hotel</option>
                        <option value='4'>Restaurant</option>
                        <option value='5'>Rowhome</option>
                        <option value='6'>House</option>
                      </Select>
                    </Box>
                  </Flex>
                  <Box py={3}>
                    <FormLabel htmlFor='project_types'> Project Type</FormLabel>
                    <CheckboxGroup
                      colorScheme='blackAlpha'
                      id='project_types'
                      onChange={(value) => setCheckboxValue(value)}
                    >
                      <Flex direction='row' wrap={'wrap'}>
                        {projectTypes.map((cat, index) => {
                          return (
                            <Checkbox
                              key={index}
                              value={(index + 1).toString()}
                              borderColor={'gray.300'}
                              width={'fit-content'}
                              marginRight={'20px'}
                            >
                              {cat}
                            </Checkbox>
                          );
                        })}
                      </Flex>
                    </CheckboxGroup>
                  </Box>
                  <Box py={2}>
                    <FormLabel htmlFor='name'>Project Description</FormLabel>
                    <Textarea
                      placeholder='Add optional project description'
                      onChange={(e) => setDescription(e.target.value)}
                      borderColor={'gray.300'}
                      focusBorderColor='brand.900'
                    />
                  </Box>
                  <Box py={2}>
                    <FormLabel htmlFor='name'>Collaborators</FormLabel>
                    <Textarea
                      placeholder='Add optional project collaborators'
                      onChange={(e) => setCollaborators(e.target.value)}
                      borderColor={'gray.300'}
                      focusBorderColor='brand.900'
                      noOfLines={'2'}
                    />
                  </Box>
                  <Box py={2}>
                    <FormLabel htmlFor='name'>Project Link</FormLabel>
                    <Input
                      id='link'
                      placeholder='Link, if project is live.'
                      type='url'
                      borderColor={'gray.300'}
                      value={link ? link : ''}
                      onChange={(e) => setLink(e.target.value)}
                      focusBorderColor='brand.900'
                    />
                  </Box>
                </FormControl>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  color={'white'}
                  bg={'brand.900'}
                  my={'6'}
                  size={'lg'}
                  onClick={submitHandler}
                  isLoading={isLoading}
                  loadingText='Submitting...'
                  _hover={{ bgColor: 'brand.900' }}
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
