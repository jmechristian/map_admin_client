import React, { useState, useEffect } from 'react';
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

const MarkerPopup = ({
  place,
  setView,
  updatePins,
  closePopup,
  loadDeleteToast,
  loadEditToast,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openEditModal, setOpenEditModal] = useState(false);

  const department = place.attributes.department.data.attributes.name;
  const hero = place.attributes.hero;

  const closeModal = () => setOpenEditModal(false);

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
        setView={setView}
        updatePins={updatePins}
        closePopup={closePopup}
        closeModal={closeModal}
        loadEditToast={loadEditToast}
      />
      <Box bg='white' width={'250px'}>
        <Flex direction={'column'} padding='6px'>
          {hero.data ? (
            <Box marginBottom={'10px'}>
              <Image
                boxSize={'100%'}
                src={`${hero.data.attributes.formats.thumbnail.url}`}
                alt={
                  place.attributes
                    ? place.attributes.name
                    : 'Akseizer Design Group'
                }
              />
            </Box>
          ) : (
            ''
          )}
          <Flex>
            <Text color={'gray.500'} fontSize={'xs'} fontStyle={'italic'}>
              {department ? department : ''}
              {place.attributes.subcategories.data.length > 0
                ? ', ' +
                  place.attributes.subcategories.data[0].attributes.subcategory
                : ''}
              {place.attributes.building_type.data
                ? ', ' + place.attributes.building_type.data.attributes.type
                : ''}
            </Text>
          </Flex>
          <Box>
            <Heading as='h4' size={'md'}>
              {place.attributes.name}
            </Heading>
          </Box>
          <Box marginBottom={'20px'}>
            <Text noOfLines={3} lineHeight='short'>
              {place.attributes.description ? place.attributes.description : ''}
            </Text>
          </Box>
          <Flex justifyContent={'space-between'}>
            <Box>
              {place.attributes.link ? (
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
                    <TagLabel fontSize={'sm'}>
                      <a
                        href={`${place.attributes.link}`}
                        target='_blank'
                        rel='noreferrer'
                      >
                        View Project
                      </a>
                    </TagLabel>
                  </Tag>
                </HStack>
              ) : (
                ''
              )}
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
