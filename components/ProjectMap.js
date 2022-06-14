import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPin } from '../data/pinSlice';
import Map, { Popup, useControl, Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {
  Box,
  Container,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
  Drawer,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import AddPlace from './AddPlace';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWRnLWJyYW5kaW5nIiwiYSI6ImNsM3czZ3IwZDBuaGYzYm8yemcwdWFlMGgifQ.2378CUUNBJppYXdD1c5aHg';

const ProjectMap = () => {
  const [isOpen, setIsOpen] = useState(false);
  const marker = useSelector((state) => state.pin.pin);
  const markers = useSelector((state) => state.pin.allPins);
  const dispatch = useDispatch();

  const [viewport, setViewport] = useState({
    longitude: -77.04101184657091,
    latitude: 38.92036921864505,
    zoom: 11,
  });

  const pins = useMemo(
    () =>
      markers.map((mark) => (
        <Marker
          longitude={mark.attributes.lat}
          latitude={mark.attributes.lng}
          key={mark.id}
          anchor='bottom'
        >
          <LocationMarkerIcon width={'40px'} height={'40px'} fill='#d31b5d' />
        </Marker>
      )),
    [markers]
  );

  const GeoCode = (props) => {
    useControl(
      () => {
        const ctrl = new MapboxGeocoder({
          ...props,
          marker: true,
          accessToken: props.mapboxAccessToken,
          mapboxgl: mapboxgl,
        });
        ctrl.on('result', (evt) => {
          console.log(evt);
          const { result } = evt;
          dispatch(setPin(result));
        });
        return ctrl;
      },
      {
        position: props.position,
      }
    );
  };

  const drawerHandler = (value) => {
    setIsOpen(value);
  };

  return (
    <>
      <AddPlace open={isOpen} closeDrawer={drawerHandler} place={marker} />
      <Map
        {...viewport}
        onMove={(event) => setViewport(event.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle='mapbox://styles/adg-branding/cl47jmywy003p15rmjzucu62i'
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {pins}
        <GeoCode position='top-left' mapboxAccessToken={MAPBOX_TOKEN} />
        {marker ? (
          <Popup
            longitude={marker.center[0]}
            latitude={marker.center[1]}
            onClose={() => dispatch(setPin(null))}
          >
            <Container>
              <Box py={'2'}>
                <Text fontSize={'medium'} lineHeight={'5'}>
                  {marker.place_name}
                </Text>
              </Box>
              <Box py={'2'}>
                <HStack spacing={'4'}>
                  <Tag
                    size={'md'}
                    key={'md'}
                    variant='solid'
                    colorScheme='pink'
                    py={'2'}
                    px={'4'}
                    onClick={() => {
                      drawerHandler(true);
                    }}
                    css={{ cursor: 'pointer' }}
                  >
                    <TagLeftIcon boxSize='12px' as={AddIcon} />
                    <TagLabel>Add to Map</TagLabel>
                  </Tag>
                </HStack>
              </Box>
            </Container>
          </Popup>
        ) : null}
      </Map>
    </>
  );
};

export default ProjectMap;
