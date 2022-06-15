import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import ProjectMap from '../components/ProjectMap';
import Signin from '../components/SignIn';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

export default function Home({ places }) {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['adg-auth']);
  const [comp, setComp] = useState();

  useEffect(() => {
    if (cookies['adg-auth'] || state.user) {
      setComp(<ProjectMap places={places} />);
    } else {
      setComp(<Signin />);
    }
  }, [setComp, places, cookies, state]);

  return (
    <Box width='100vw' height='100vh' bg='blackAlpha.300'>
      {comp}
    </Box>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:1337/api/projects');
  const places = res.data.data;

  return {
    props: { places },
  };
}
