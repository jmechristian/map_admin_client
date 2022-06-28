import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Flex,
  List,
  ListItem,
  ListIcon,
  Text,
  Link,
  Stack,
  useMediaQuery,
} from '@chakra-ui/react';
import { LocationMarkerIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import CloseButton from './CloseButton';

const ListView = ({
  allPins,
  map,
  setPopupInfo,
  openListView,
  closeListView,
}) => {
  const flyToMarker = (item) => {
    map.flyTo({
      center: [item.attributes.lng, item.attributes.lat],
      zoom: 14,
      duration: 2000,
      offset: isMobile ? [0, 200] : [0, 80],
      pitch: 70,
      bearing: 0,
      essential: true,
      curve: 0.7,
      easing: function (t) {
        return 1 - Math.pow(1 - t, 5);
      },
    });
    setPopupInfo(item);
  };

  const [isMobile] = useMediaQuery('(max-width: 500px)');

  return (
    <AnimatePresence>
      {openListView && (
        <Box
          as={motion.div}
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transformOrigin={'right'}
          transition='0.1s linear'
          width={{ base: '85%', sm: '40%', md: '30%', lg: '25%', xl: '20%' }}
          bgColor='white'
          boxShadow={'xl'}
          overflowY='scroll'
          position={'absolute'}
          top={'0'}
          left={'0'}
          zIndex={'overlay'}
          height={'100%'}
        >
          <Stack direction='column' width={'100%'} py={'4'} px={'5'}>
            <Flex justifyContent={'space-between'} alignItems={'top'}>
              <Text
                fontSize={'xl'}
                fontWeight='bold'
                color={'blackAlpha.800'}
                mb='3'
              >
                Projects List View &#40;{allPins.length}&#41;
              </Text>
              <Box width={'20px'} onClick={closeListView}>
                <CloseButton />
              </Box>
            </Flex>
            <Box>
              <List spacing={3}>
                {allPins.map((item, index) => (
                  <ListItem key={index} cursor='pointer'>
                    <Flex alignItems={'center'}>
                      <Flex
                        onClick={() => flyToMarker(item)}
                        alignItems={'center'}
                      >
                        <ListIcon as={LocationMarkerIcon} color='brand.900' />
                        <Text fontSize={'md'} color={'gray.600'}>
                          {item.attributes.name}
                        </Text>
                      </Flex>
                      {item.attributes.link ? (
                        <Link href={item.attributes.link} isExternal>
                          <ListIcon
                            as={ExternalLinkIcon}
                            color='gray.400'
                            marginLeft={'1'}
                          />
                        </Link>
                      ) : (
                        ''
                      )}
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default ListView;
