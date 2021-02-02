import { Box, Flex, Link, Heading, Spacer } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'
function Navbar() {
  const router = useRouter()
  return (
    <Flex
      align='center'
      justify='center'
      w='30%'
      minW='320px'
      margin='0 auto'
      boxShadow='rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
    >
      <Box p='5'>
        <Heading size='md'>
          <Link onClick={() => router.push('/')} colorScheme='teal' mr='20'>
            Temel Blog
          </Link>
        </Heading>
      </Box>
      <Spacer />
      <Box p='5'>
        <Link onClick={() => router.push('/')} colorScheme='teal' mr='20'>
          Home
        </Link>

        <Link onClick={() => router.push('/about')} colorScheme='teal'>
          About
        </Link>
      </Box>
    </Flex>
  )
}

export default Navbar
