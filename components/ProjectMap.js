import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllPins, setPin } from '../data/pinSlice';
import Map, { Popup, useControl, Marker } from 'react-map-gl';
import MarkerPin from './MarkerPin';
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
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddPlace from './AddPlace';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWRnLWJyYW5kaW5nIiwiYSI6ImNsM3czZ3IwZDBuaGYzYm8yemcwdWFlMGgifQ.2378CUUNBJppYXdD1c5aHg';

const ProjectMap = ({ places }) => {
  useEffect(() => {
    dispatch(setAllPins(places));
    console.log({ ...viewState });
  }, [dispatch, places, viewState]);

  const [isOpen, setIsOpen] = useState(false);
  const [viewState, setViewState] = useState(initialView);
  const [allPins, setPins] = useState(places);
  const marker = useSelector((state) => state.pin.pin);
  const dispatch = useDispatch();
  const toast = useToast();

  const initialView = {
    longitude: -77.04101184657091,
    latitude: 38.92036921864505,
    zoom: 10,
  };

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

  const loadToast = () => {
    return toast({
      title: 'Pin Successfully Created!',
      description: `Pin for ${
        marker ? marker.address : 'marker'
      } has been created`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  const pins = useMemo(
    () =>
      allPins.map((mark) => (
        <Marker
          longitude={mark.attributes.lng}
          latitude={mark.attributes.lat}
          key={mark.id}
          anchor='bottom'
        >
          <MarkerPin />
        </Marker>
      )),
    [allPins]
  );

  const getUpdatedAllPins = useCallback(async () => {
    const res = await axios.get(
      'https://adg-projects-hs6ir.ondigitalocean.app/api/projects'
    );
    dispatch(setAllPins(res.data.data));
    setPins(res.data.data);
  }, [dispatch]);

  return (
    <>
      <AddPlace
        open={isOpen}
        closeDrawer={drawerHandler}
        place={marker}
        setView={() => setViewState(initialView)}
        updatePins={() => getUpdatedAllPins()}
        loadToast={() => loadToast()}
      />
      <Map
        initialViewState={{
          longitude: -77.04101184657091,
          latitude: 38.92036921864505,
          zoom: 11,
        }}
        onMove={(event) => setViewState(event.viewState)}
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
                    color={'white'}
                    bg={'brand.900'}
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
