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
import Link from 'next/link';

const MarkerPopup = ({
  name,
  id,
  setView,
  updatePins,
  closePopup,
  loadDeleteToast,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <DeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        setView={setView}
        updatePins={updatePins}
        closePopup={closePopup}
        loadDeleteToast={loadDeleteToast}
      />
      <Box bg='white' width={'250px'}>
        <Flex direction={'column'} padding='8px'>
          <Box marginBottom={'8px'}>
            <Image
              boxSize={'100%'}
              src='https://adg-projects.nyc3.cdn.digitaloceanspaces.com/assets/1654K_hero.webp'
              alt={name}
            />
          </Box>
          <Box marginBottom={'4px'}>
            <Heading as='h4' size={'sm'}>
              {name}
            </Heading>
          </Box>
          <Box marginBottom={'16px'}>
            <Text noOfLines={2} lineHeight='short'>
              11Q is a luxury condo development with 15 units located in the
              Logan Circle neighborhood. This building is a renovation and
              addition to an existing structure, includes both one and two
              bedroom floor plans with designer finishes throughout and private
              outdoor terraces.
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
                  <EditIcon width={'4'} height={'4'} />
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
