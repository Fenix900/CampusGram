import { useToast } from '@chakra-ui/react'

export const useDisplayError = () => {
    const toast = useToast();
    //Custom hook for displaying errors or things like that (also use for confirming creation of account)
    const displayMessage = (title, description, status) => {
        toast({
            position: 'top',
            title: title || 'Im just a placeholder, something is def. WRONG',
            description: description || "Im just a placeholder, something is def. WRONG",
            status: status || 'info',
            duration: 4000,
            isClosable: true,
        });
    };

    return displayMessage;
}