import Head from 'next/head';
import styles from '../styles/Home.module.css';
import MyForm from '../components/Form'
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react';


export default function Home() {
  return (
    <ChakraProvider>
<CSSReset />
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MyForm />
      </Box>    </ChakraProvider>
  )
}
