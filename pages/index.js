import Head from 'next/head'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
export default function Home({ posts }) {
  const [mappedPosts, setMappedPosts] = useState([])
  const router = useRouter()
  useEffect(() => {
    if (posts.length) {
      const imageBuilder = imageUrlBuilder({
        projectId: 'tx0bnokj',
        dataset: 'production',
      })

      setMappedPosts(
        posts.map((p) => {
          return {
            ...p,
            mainImage: imageBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      )
    } else {
      setMappedPosts([])
    }
    return () => {}
  }, [posts])
  return (
    <div>
      <Navbar />

      <Heading as='h1' textAlign='center' my='2em'>
        Welcome to my blog
      </Heading>

      <Flex justify='space-evenly' flexWrap='wrap'>
        {mappedPosts.length ? (
          mappedPosts.map((p, index) => (
            <LinkBox
              key={index}
              mx='1em'
              my='2em'
              boxShadow='rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
              px='1em'
              py='1em'
              h='100%'
              cursor='pointer'
              transition='.5s ease'
              _hover={{
                boxShadow: 'rgba(99, 99, 99, 0.2) 5px 7px 10px 2px',
              }}
            >
              <LinkOverlay
                onClick={() => router.push(`/post/${p.slug.current}`)}
              >
                <Text fontSize='xl' fontWeight='600'>
                  {p.title}
                </Text>
                <Image objectFit='cover' src={p.mainImage} my='.5em' />
              </LinkOverlay>
            </LinkBox>
          ))
        ) : (
          <div>No Post Found Yet</div>
        )}
      </Flex>
    </div>
  )
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[ _type == "post" ]')
  const url = `https://tx0bnokj.api.sanity.io/v1/data/query/production?query=${query}`
  const result = await fetch(url).then((res) => res.json())

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: [],
      },
    }
  } else {
    return {
      props: {
        posts: result.result,
      },
    }
  }
}
