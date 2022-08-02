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
  Link,
  useMediaQuery,
} from '@chakra-ui/react';
import { LocationMarkerIcon, ExternalLinkIcon } from '@heroicons/react/solid';
import { orderBy } from 'lodash';

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

  const sortedPins = _.orderBy(
    allPins,
    [(c) => c.attributes.name, 'name'],
    ['asc']
  );

  console.log(sortedPins);

  const [isMobile] = useMediaQuery('(max-width: 500px)');

  return (
    <Drawer
      isOpen={openListView}
      placement='left'
      onClose={closeListView}
      size={'xs'}
      autoFocus={false}
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Projects List View &#40;{allPins.length}&#41;
        </DrawerHeader>

        <DrawerBody>
          <List spacing={3}>
            {sortedPins.map((item, index) => (
              <ListItem key={index} cursor='pointer'>
                <Flex alignItems={'center'}>
                  <Flex onClick={() => flyToMarker(item)} alignItems={'center'}>
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ListViewDrawer;
