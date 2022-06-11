import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Select,
  Spacer,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const AddPlace = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Drawer isOpen={true} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add New Project</DrawerHeader>
          <DrawerBody>
            <Box height={'100%'}>
              <Flex direction='column'>
                <FormControl>
                  <Flex pb={'2'}>
                    <Box>
                      <FormLabel htmlFor='lng'>Longitude</FormLabel>
                      <Input id='lng' type='lng' disabled={true} />
                      <FormHelperText>Required</FormHelperText>
                    </Box>
                    <Spacer />
                    <Box>
                      <FormLabel htmlFor='lat'>Latitude</FormLabel>
                      <Input id='lat' type='lat' disabled={true} />
                      <FormHelperText>Required</FormHelperText>
                    </Box>
                  </Flex>
                  <Box py={'2'}>
                    <FormLabel htmlFor='name'>Project Name</FormLabel>
                    <Input id='name' type='name' />
                    <FormHelperText>Required</FormHelperText>
                  </Box>
                  <Box py={'2'}>
                    <FormLabel htmlFor='dept'>Department</FormLabel>
                    <Select placeholder='Select Department' id='dept'>
                      <option value='option1'>Architecture</option>
                      <option value='option2'>Commercial Interiors</option>
                      <option value='option3'>AkRes</option>
                      <option value='option3'>Branding &amp; Marketing</option>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </Box>
                  <Box py={'2'}>
                    <FormLabel htmlFor='address'>Address</FormLabel>
                    <Input id='address' type='address' />
                  </Box>
                  <Box py={'2'}>
                    <FormLabel htmlFor='name'>
                      Project Description (Optional)
                    </FormLabel>
                    <Textarea placeholder='Add optional project description' />
                  </Box>
                </FormControl>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  colorScheme='teal'
                  my={'4'}
                  size={'lg'}
                >
                  Add to Map
                </Button>
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddPlace;
