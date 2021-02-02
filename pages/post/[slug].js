import { Box, Center, Container, Heading, Image, Text } from '@chakra-ui/react'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
export const Post = ({ title, body, image }) => {
  const [imageUrl, setİmageUrl] = useState('')
  // console.log(title)
  // console.log(body)

  useEffect(() => {
    const imageBuilder = imageUrlBuilder({
      projectId: 'tx0bnokj',
      dataset: 'production',
    })

    setİmageUrl(imageBuilder.image(image))
  }, [image])

  return (
    <>
      <Navbar />
      <Container maxW='4xl' centerContent>
        <Box padding='4' bg='whiteAlpha.400' maxW='3xl'>
          <Heading textAlign='center' as='h2' size='2xl'>
            {title}
          </Heading>
          {imageUrl && (
            <Center>
              <Image
                margin='1em'
                boxSize='100%'
                objectFit='cover'
                src={imageUrl}
              />
            </Center>
          )}
          <Text fontSize='md' fontWeight='600' styles={{ lineHeight: '30' }}>
            <BlockContent blocks={body} />
          </Text>
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug
  console.log(pageSlug)
  if (!pageSlug) {
    return {
      notFound: true,
    }
  }

  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}" ]`
  )
  const url = `https://tx0bnokj.api.sanity.io/v1/data/query/production?query=${query}`

  const result = await fetch(url).then((res) => res.json())

  const post = result.result[0]

  if (!post) {
    return {
      notFound: true,
    }
  } else {
    return {
      props: {
        title: post.title,
        body: post.body,
        image: post.mainImage,
      },
    }
  }
}

export default Post
