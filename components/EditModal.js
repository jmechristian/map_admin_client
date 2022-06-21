import React from 'react';
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

const EditModal = ({ isOpen, onClose, place }) => {
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
                value={place.attributes.name ? place.attributes.name : ''}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project Description</FormLabel>
              <Input
                placeholder='Project Description'
                borderColor={'gray.300'}
                value={
                  place.attributes.description
                    ? place.attributes.description
                    : ''
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bg={'brand.900'} color='white' mr={3}>
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
