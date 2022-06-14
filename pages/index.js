import { useEffect } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import ProjectMap from '../components/ProjectMap';
import Signin from '../components/SignIn';
import { useSelector, useDispatch } from 'react-redux';
import { setAllPins } from '../data/pinSlice';

export default function Home() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPins = async () => {
      const res = await axios.get('http://localhost:1337/api/projects');
      dispatch(setAllPins(res.data.data));
    };

    getPins();
  }, [dispatch]);

  return (
    <Box width='100vw' height='100vh' bg='blackAlpha.300'>
      {state.user ? <ProjectMap /> : <Signin />}
    </Box>
  );
}
