import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
} from '@chakra-ui/react';

const DeleteAlert = ({
  isOpen,
  onClose,
  id,
  setView,
  updatePins,
  closePopup,
  loadDeleteToast,
}) => {
  const user = useSelector((state) => state.user);
  const cancelRef = useRef();

  const deleteHandler = async () => {
    const res = await axios
      .delete(
        `https://adg-projects-hs6ir.ondigitalocean.app/api/projects/${id}`,
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
          onClose();
          loadDeleteToast();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Project
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? This action cannot be undone.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={deleteHandler} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlert;
