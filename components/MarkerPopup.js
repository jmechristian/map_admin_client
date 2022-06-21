import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  Tag,
  TagLabel,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import DeleteAlert from './DeleteAlert';
import EditModal from './EditModal';
import Link from 'next/link';

const MarkerPopup = ({
  place,
  setView,
  updatePins,
  closePopup,
  loadDeleteToast,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openEditModal, setOpenEditModal] = useState(false);
  return (
    <>
      <DeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        id={place.id}
        setView={setView}
        updatePins={updatePins}
        closePopup={closePopup}
        loadDeleteToast={loadDeleteToast}
      />
      <EditModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        place={place}
      />
      <Box bg='white' width={'250px'}>
        <Flex direction={'column'} padding='8px'>
          <Box marginBottom={'10px'}>
            <Image
              boxSize={'100%'}
              src='https://adg-projects.nyc3.cdn.digitaloceanspaces.com/assets/1654K_hero.webp'
              alt={place.attributes.name}
            />
          </Box>
          <Box>
            <Heading as='h4' size={'sm'}>
              {place.attributes.name}
            </Heading>
          </Box>
          <Box marginBottom={'10px'}>
            <Text noOfLines={2} lineHeight='short'>
              {place.attributes.description
                ? place.attributes.description
                : '11Q is a luxury condo development with 15 units located in the Logan Circle neighborhood. This building is a renovation and addition to an existing structure, includes both one and two bedroom floor plans with designer finishes throughout and private outdoor terraces.'}
            </Text>
          </Box>
          <Flex justifyContent={'space-between'}>
            <Box>
              <HStack spacing={'4'}>
                <Tag
                  size={'md'}
                  key={'md'}
                  variant='solid'
                  color={'white'}
                  bg={'blackAlpha.800'}
                  py={'6px'}
                  px={'12px'}
                  borderRadius='4px'
                  css={{ cursor: 'pointer' }}
                >
                  <TagLabel fontSize={'sm'}>View Project</TagLabel>
                </Tag>
              </HStack>
            </Box>
            <Flex>
              <Box>
                <Tag size={'md'} key={'md'} colorScheme='blue'>
                  <EditIcon
                    width={'4'}
                    height={'4'}
                    onClick={() => setOpenEditModal(true)}
                  />
                </Tag>
              </Box>
              <Box>
                <Tag
                  size={'md'}
                  key={'md'}
                  colorScheme='red'
                  marginLeft={'6px'}
                >
                  <DeleteIcon width={'4'} height={'4'} onClick={onOpen} />
                </Tag>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default MarkerPopup;
