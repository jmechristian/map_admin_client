import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
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
  const [projectName, setProjectName] = useState(
    place.attributes.name ? place.attributes.name : ''
  );
  const [projectDesc, setProjectDesc] = useState(
    place.attributes.description ? place.attributes.description : ''
  );

  const user = useSelector((state) => state.user);

  const { id } = place;

  const editSubmitHandler = async (e) => {
    e.preventDefault();

    const data = {
      data: {
        name: projectName,
        description: projectDesc,
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
          <ModalBody pb={6}>
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
              <Input
                placeholder='Project Description'
                borderColor={'gray.300'}
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
              />
            </FormControl>
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
