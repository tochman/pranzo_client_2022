import { Avatar, Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';

const LargeQuote = () => {
  return (
    <Stack
      bg={useColorModeValue('gray.50', 'gray.800')}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={'center'}
      direction={'column'}>
      <Text
        fontSize={{ base: 'xl', md: '2xl' }}
        textAlign={'center'}
        maxW={'3xl'}
        as={'i'}>
        "We had an incredible experience working with Pranzo and were
        impressed they made such a big difference in only three weeks. Our team
        is so grateful for the wonderful improvements they made and their
        ability to get familiar with the product concept so quickly.""
      </Text>
      <Box textAlign={'center'}>
        <Avatar
          src={
            'https://source.unsplash.com/random/?face'
          }
          alt={'John Doe'}
          mb={2}
        />

        <Text fontWeight={600}>John Doe</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.400', 'gray.400')}>
          Owner - The Other Place, Lerum
        </Text>
      </Box>
    </Stack>
  );
}

export default LargeQuote