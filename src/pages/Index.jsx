import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Select, CheckboxGroup, Checkbox, Stack, Textarea, useToast, VStack, InputGroup, InputLeftAddon, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Text } from "@chakra-ui/react";
import { FaUpload, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [form, setForm] = useState({
    sampleType: "",
    colors: [],
    logo: null,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    lineSpeed: "",
    printSize: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const { isOpen: isShippingOpen, onOpen: onShippingOpen, onClose: onShippingClose } = useDisclosure();
  const { isOpen: isPreviewOpen, onOpen: onPreviewOpen, onClose: onPreviewClose } = useDisclosure();
  const [preview, setPreview] = useState(null);
  const toast = useToast();

  //... rest of the existing handleColorChange and handleInputChange functions

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUniqueNumber = Date.now();
    setUniqueNumber(newUniqueNumber);
    onShippingOpen();
    toast({
      title: "Form submitted.",
      description: "We've received your sample request.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handlePreview = () => {
    setPreview(form);
    onPreviewOpen();
  };

  //... rest of the existing return statement up to the <Container>

  const shippingLabel = (
    <Modal isOpen={isShippingOpen} onClose={onShippingClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Shipping Label</ModalHeader>
        <ModalBody>
          <Box p={5} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={2}>
              Cyklop CSC Att.: SampleLab M.Slot {uniqueNumber}
            </Heading>
            <Box>
              Wilhelm Röntgenstraat 10
              <br />
              8013NC Zwolle
              <br />
              Nederland
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => window.print()}>
            Print Label
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const previewModal = preview && (
    <Modal isOpen={isPreviewOpen} onClose={onPreviewClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            <strong>Sample Type:</strong> {preview.sampleType}
          </Text>
          <Text>
            <strong>Colors:</strong> {preview.colors.join(", ")}
          </Text>
          <Text>
            <strong>Logo:</strong> {preview.logo?.name}
          </Text>
          <Text>
            <strong>Name:</strong> {preview.name}
          </Text>
          <Text>
            <strong>Email:</strong> {preview.email}
          </Text>
          <Text>
            <strong>Phone:</strong> {preview.phone}
          </Text>
          <Text>
            <strong>Company Name:</strong> {preview.companyName}
          </Text>
          <Text>
            <strong>Line Speed:</strong> {preview.lineSpeed}
          </Text>
          <Text>
            <strong>Print Size:</strong> {preview.printSize}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onPreviewClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      {shippingLabel}
      {previewModal}
      <Container maxW="container.md" py={10}>
        {/* ... rest of the existing JSX for the form */}
        <Button leftIcon={<FaEye />} colorScheme="blue" variant="outline" onClick={handlePreview} mr={4}>
          Preview
        </Button>
      </Container>
    </>
  );
};

export default Index;
