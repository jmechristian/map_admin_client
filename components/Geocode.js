import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Marker, useControl } from 'react-map-gl';

export const Geocode = (props) => {
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
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === 'Point' && result.geometry.coordinates));
        if (location) {
          console.log('yes');
          setMarker(
            <Marker
              {...props.marker}
              longitude={location[0]}
              latitude={location[1]}
            />
          );
        } else {
          setMarker(null);
          console.log('no');
        }
      });
      return ctrl;
    },
    {
      position: props.position,
    }
  );
  return marker;
};
