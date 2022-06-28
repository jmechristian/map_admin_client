import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUser } from '../data/userSlice';
import ProjectMap from '../components/ProjectMap';
import Signin from '../components/SignIn';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function Home({ places }) {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['adg-auth']);
  const [comp, setComp] = useState();

  useEffect(() => {
    if (cookies['adg-auth'] || state.user != null) {
      setComp(<ProjectMap places={places} />);
    } else {
      setComp(<Signin />);
    }
  }, [setComp, places, cookies, state]);

  useEffect(() => {
    if (cookies['adg-auth'] || state.user != null) {
      dispatch(setUser(cookies['adg-auth']));
    }
  });

  return (
    <Box width='100vw' height='100%'>
      {comp}
    </Box>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    'https://adg-projects-hs6ir.ondigitalocean.app/api/projects?populate=*'
  );
  const places = res.data.data;

  return {
    props: { places },
  };
}
