import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const CouldNotFindUser = () => {
    const navigate = useNavigate();
    const handleClickGoHome = () => {
        navigate('/home'); // Navigate to the /home route
    };
  return (
    <div>
        <Box textAlign="center" py={10} px={6}>
            <Text fontSize="4xl" fontWeight="bold">User Not Found</Text>
            <Text mt={3} color="gray.500">The user you are looking for does not exist.</Text>
            <Button
                mt={6}
                colorScheme="blue"
                onClick={handleClickGoHome}
            >
                Go Back
            </Button>
        </Box>
    </div>
  )
}
