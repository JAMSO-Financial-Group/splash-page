import React, { FC } from "react"
import { BoxProps, Button, Stack } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import { H5 } from "./Typography"
import DigitalPatternBox from "./DigitalPatternBox"
import useChakraBreakpoint from "../hooks/useChakraBreakpoint"

export type TakeTheQuizBannerProps = {
  description: string
  buttonText: string
}

const TakeTheQuizBannerTemplate: FC<TakeTheQuizBannerProps & BoxProps> = ({
  description,
  buttonText,
  ...containerProps
}) => {
  const isMobile = useChakraBreakpoint("md")
  return (
    <DigitalPatternBox
      variant="dark"
      margin="auto"
      h={{ base: "auto", md: "150px" }}
      maxW="6xl"
      w="100%"
      borderRadius={{ base: 0, md: "6px" }}
      boxShadow="0px 25px 50px -12px rgba(0, 0, 0, 0.25);"
      {...containerProps}
    >
      <Stack
        justifyContent="space-around"
        direction={{ base: "column", md: "row" }}
        spacing={6}
      >
        <H5 color="gray.500" maxW="645px">
          {description}
        </H5>
        <Button variant={isMobile ? "solid" : "outline"} minW="170px">
          {buttonText}
        </Button>
      </Stack>
    </DigitalPatternBox>
  )
}

const query = graphql`
  query TakeTheQuizBanner {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "takeTheQuizBanner" } } }
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`

const TakeTheQuizBanner: FC<
  Omit<TakeTheQuizBannerProps, "description" | "buttonText"> & BoxProps
> = (props) => {
  const data = useStaticQuery(query)
  // const body = data.allMarkdownRemark.edges[0].node.html
  console.log("CANNOT FIGURE THIS OUT", data)
  return (
    // @ts-ignore
    <TakeTheQuizBannerTemplate description="boo" buttonText="haha" {...props} />
  )
}

export default TakeTheQuizBanner
