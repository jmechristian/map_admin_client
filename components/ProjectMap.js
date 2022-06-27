import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllPins, setPin } from '../data/pinSlice';
import Map, {
  Popup,
  useControl,
  Marker,
  NavigationControl,
  useMap,
} from 'react-map-gl';
import MarkerPin from './MarkerPin';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {
  Box,
  Container,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddPlace from './AddPlace';
import TopRightUI from './TopRightUI';
import MarkerPopup from './MarkerPopup';
import FilterDrawer from './FilterDrawer';
import ListViewDrawer from './ListViewDrawer';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYWRnLWJyYW5kaW5nIiwiYSI6ImNsM3czZ3IwZDBuaGYzYm8yemcwdWFlMGgifQ.2378CUUNBJppYXdD1c5aHg';

const ProjectMap = ({ places }) => {
  const { filteredPins } = useSelector((state) => state.filter);

  useEffect(() => {
    if (filteredPins != null) {
      setPins(filteredPins);
    } else setPins(places);
  }, [filteredPins, places]);

  const [isOpen, setIsOpen] = useState(false);
  const [viewState, setViewState] = useState(initialView);
  const [allPins, setPins] = useState(places);
  const [popupInfo, setPopupInfo] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [openListView, setOpenListView] = useState(false);
  const marker = useSelector((state) => state.pin.pin);

  const dispatch = useDispatch();
  const toast = useToast();
  const mapRef = useRef();

  const initialView = {
    longitude: -77.0307193335218,
    latitude: 38.87225889119998,
    zoom: 12,
    pitch: 70,
  };

  const GeoCode = (props) => {
    useControl(
      () => {
        const ctrl = new MapboxGeocoder({
          ...props,
          marker: true,
          accessToken: props.mapboxAccessToken,
          mapboxgl: mapboxgl,
          flyTo: {
            zoom: 15,
            duration: 2500,
            pitch: 70,
            bearing: 0,
            essential: true,
            curve: 0.7,
            easing: function (t) {
              return 1 - Math.pow(1 - t, 5);
            },
          },
        });
        ctrl.on('result', (evt) => {
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

  const filterHandler = (value) => {
    setOpenFilters(value);
  };

  const loadToast = () => {
    return toast({
      title: 'Pin Successfully Created!',
      description: `Pin for ${
        marker ? marker.address : 'marker'
      } has been created`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  const loadDeleteToast = () => {
    return toast({
      title: 'Pin Successfully Deleted!',
      description: `Pin for ${
        popupInfo ? popupInfo.attributes.name : 'marker'
      } has been deleted`,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  const loadEditToast = () => {
    return toast({
      title: 'Pin Successfully Updated!',
      description: `Pin for ${
        popupInfo ? popupInfo.attributes.name : 'marker'
      } has been Updated`,
      status: 'info',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  const getUpdatedAllPins = useCallback(async () => {
    const res = await axios.get(
      'https://adg-projects-hs6ir.ondigitalocean.app/api/projects?populate=*'
    );
    dispatch(setAllPins(res.data.data));
    setPins(res.data.data);
  }, [dispatch]);

  const pins = useMemo(
    () =>
      allPins.map((mark) => (
        <Marker
          longitude={mark.attributes.lng}
          latitude={mark.attributes.lat}
          key={mark.id}
          anchor='bottom'
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(mark);
            mapRef.current.flyTo({
              center: [mark.attributes.lng, mark.attributes.lat],
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
          }}
        >
          <MarkerPin place={mark} />
        </Marker>
      )),
    [allPins, mapRef]
  );

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
      <FilterDrawer
        openFilter={openFilters}
        closeFilter={() => setOpenFilters(false)}
        allPins={allPins}
      />
      <ListViewDrawer
        openListView={openListView}
        closeListView={() => setOpenListView(false)}
        allPins={allPins}
        map={mapRef.current}
        setPopupInfo={setPopupInfo}
      />
      <Box
        position={'absolute'}
        top={'0'}
        right={'0'}
        zIndex={'999'}
        marginTop={'10px'}
        marginRight={'10px'}
      >
        <TopRightUI
          setView={() => setViewState(initialView)}
          closePopup={() => setPopupInfo(null)}
          openFilters={() => setOpenFilters(true)}
          openListView={(lis) => setOpenListView(true)}
        />
      </Box>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -77.0307193335218,
          latitude: 38.87225889119998,
          zoom: 12,
          pitch: 70,
        }}
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle='mapbox://styles/adg-branding/cl47jmywy003p15rmjzucu62i'
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <GeoCode position='top-left' mapboxAccessToken={MAPBOX_TOKEN} />
        <NavigationControl position='bottom-left' />
        {pins}
        {popupInfo && (
          <Popup
            anchor='bottom'
            longitude={popupInfo.attributes.lng}
            latitude={popupInfo.attributes.lat}
            onClose={() => setPopupInfo(null)}
            offset={40}
            focusAfterOpen={false}
            maxWidth='none'
          >
            <MarkerPopup
              place={popupInfo}
              setView={() => setViewState(initialView)}
              updatePins={() => getUpdatedAllPins()}
              closePopup={() => setPopupInfo(null)}
              loadDeleteToast={() => loadDeleteToast()}
              loadEditToast={() => loadEditToast()}
            />
          </Popup>
        )}
        {marker ? (
          <Popup
            longitude={marker.center[0]}
            latitude={marker.center[1]}
            onClose={() => dispatch(setPin(null))}
            focusAfterOpen={false}
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
