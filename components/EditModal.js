import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Flex,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';

const EditModal = ({
  isOpen,
  onClose,
  place,
  setView,
  updatePins,
  closeModal,
  closePopup,
  loadEditToast,
}) => {
  const user = useSelector((state) => state.user);
  const { selectedPin } = useSelector((state) => state.pin);
  const { id } = selectedPin;

  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projLink, setProjLink] = useState('');
  const [structure, setStructureType] = useState();
  const [collaborators, setCollaborators] = useState();
  const [size, setSize] = useState('');

  const projectTypes = [
    'New Construction',
    'Renovation',
    'Historic Renovation',
    'Addition',
  ];

  useEffect(() => {
    setProjectName(selectedPin.attributes.name);
    setProjectDesc(selectedPin.attributes.description);
    setProjLink(selectedPin.attributes.link);
    setStructureType(selectedPin.attributes.building_type.data.id);
    setCollaborators(selectedPin.attributes.collaborators);
    setSize(selectedPin.attributes.size);
  }, [selectedPin]);

  const editSubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      data: {
        name: projectName,
        description: projectDesc,
        link: projLink,
        building_type: structure,
        size: size,
        collaborators: collaborators,
      },
    };

    const res = await axios
      .put(
        `https://adg-projects-hs6ir.ondigitalocean.app/api/projects/${id}`,
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
          setView();
          updatePins();
          closePopup();
          closeModal();
          loadEditToast();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Selected Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <FormControl>
              <FormLabel>Project name</FormLabel>
              <Input
                placeholder='Project Name'
                borderColor={'gray.300'}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project Description</FormLabel>
              <Textarea
                placeholder='Project Description'
                borderColor={'gray.300'}
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
              />
            </FormControl>
            <Box my={2}>
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
            <Box pt={2}>
              <FormLabel htmlFor='name'>Collaborators</FormLabel>
              <Textarea
                placeholder='Add optional project collaborators'
                onChange={(e) => setCollaborators(e.target.value)}
                borderColor={'gray.300'}
                focusBorderColor='brand.900'
                noOfLines={'2'}
                value={collaborators}
              />
            </Box>
            <Flex direction={'row'} mt='4' gap={6}>
              <Box width={'50%'}>
                <FormLabel htmlFor='dept'>Structure Type</FormLabel>
                <Select
                  placeholder='Select Structure Type'
                  id='structure'
                  onChange={(e) => setStructureType(e.target.value)}
                  value={structure}
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
              <Box width={'50%'}>
                <FormControl>
                  <FormLabel>Project Link</FormLabel>
                  <Input
                    placeholder='Project Link'
                    borderColor={'gray.300'}
                    value={projLink}
                    onChange={(e) => setProjLink(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={'brand.900'}
              color='white'
              mr={3}
              onClick={editSubmitHandler}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
