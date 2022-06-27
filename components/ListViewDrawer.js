import React from 'react';
import {
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  ListIcon,
  Text,
} from '@chakra-ui/react';
import { LocationMarkerIcon } from '@heroicons/react/solid';

const ListViewDrawer = ({
  openListView,
  closeListView,
  allPins,
  map,
  setPopupInfo,
}) => {
  const flyToMarker = (item) => {
    closeListView();
    map.flyTo({
      center: [item.attributes.lng, item.attributes.lat],
      zoom: 14,
      duration: 2000,
      offset: [0, 80],
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

  return (
    <Drawer
      isOpen={openListView}
      placement='left'
      onClose={closeListView}
      size={'xs'}
      autoFocus={false}
      trapFocus={false}
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Projects List View</DrawerHeader>

        <DrawerBody>
          <List spacing={3}>
            {allPins.map((item, index) => (
              <ListItem key={index}>
                <Flex alignItems={'center'} onClick={() => flyToMarker(item)}>
                  <ListIcon as={LocationMarkerIcon} color='brand.900' />
                  <Text fontSize={'md'}>{item.attributes.name}</Text>
                </Flex>
              </ListItem>
            ))}
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ListViewDrawer;
