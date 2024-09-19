import {
  Box,
  IconButton,
  Button,
  Image,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  Input,
  useToast,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product.js';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  if (!product) return null; // Prevent rendering if product is undefined

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct, fetchProducts } = useProductStore(); // FetchProducts added
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (pid) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
    if (success) {
      await fetchProducts(); // Wait for the products to be fetched after update
      onClose();
    }
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder='Product Name' value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
              <Input placeholder='Product Price' value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} type='number' />
              <Input placeholder='Image URL' value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id)}>
              Update
            </Button>
            <Button colorScheme='red' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
