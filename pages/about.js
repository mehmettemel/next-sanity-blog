import { Container, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function About({ category }) {
  const [about, setAbout] = useState([])

  useEffect(() => {
    setAbout(category[0])
  }, [category])

  console.log(about)

  return (
    <div>
      <Navbar />
      <Container maxW='100ch' my='2em'>
        <Heading my='1em'>{about.title}</Heading>
        <Text style={{ lineHeight: '30px' }}>{about.description}</Text>
      </Container>
    </div>
  )
}

export default About
export async function getStaticProps(context) {
  const query = encodeURIComponent('*[ _type == "category" ]')
  const url = `https://tx0bnokj.api.sanity.io/v1/data/query/production?query=${query}`
  const result = await fetch(url).then((res) => res.json())
  console.log(result)
  return {
    props: { category: result.result },
  }
}
