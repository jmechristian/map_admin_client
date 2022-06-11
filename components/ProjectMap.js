import React, { useState } from 'react';
import Map, { Popup, useControl } from 'react-map-gl';
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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWRnLWJyYW5kaW5nIiwiYSI6ImNsM3czZ3IwZDBuaGYzYm8yemcwdWFlMGgifQ.2378CUUNBJppYXdD1c5aHg';

const ProjectMap = () => {
  const [marker, setMarker] = useState();

  const [viewport, setViewport] = useState({
    longitude: -77.04101184657091,
    latitude: 38.92036921864505,
    zoom: 10,
  });

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
          setMarker(result);
        });
        return ctrl;
      },
      {
        position: props.position,
      }
    );
  };

  return (
    <Map
      {...viewport}
      onMove={(event) => setViewport(event.viewState)}
      style={{ width: '100%', height: '100%' }}
      mapStyle='mapbox://styles/adg-branding/cl47jmywy003p15rmjzucu62i'
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <GeoCode position='top-left' mapboxAccessToken={MAPBOX_TOKEN} />
      {marker ? (
        <Popup
          longitude={marker.center[0]}
          latitude={marker.center[1]}
          onClose={() => setMarker(null)}
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
                  variant='subtle'
                  colorScheme='cyan'
                  py={'2'}
                  px={'4'}
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
  );
};

export default ProjectMap;
