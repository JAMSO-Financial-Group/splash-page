import { FC, useState } from "react"
import {
  Icon,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  Stack,
  StackDivider,
} from "@chakra-ui/react"
import useChakraBreakpoint from "../../../hooks/useChakraBreakpoint"
import ThresholdBrand from "../../ThresholdBrand"
import MobileNavLink from "./MobileNavLink"
import { LinkInfo, SocialLink } from "../types"
import SocialMediaLinks from "../SocialMediaLinks"
import { FaChevronLeft } from "react-icons/all"
import { BodySm, H5 } from "../../Typography"

const MobileDrawer: FC<{
  onClose: () => void
  isOpen: boolean
  navLinks: LinkInfo[]
  socialLinks: SocialLink[]
}> = ({ onClose, isOpen, navLinks, socialLinks }) => {
  const isMobileDevice = useChakraBreakpoint("lg")

  const [navLinksToRender, setNavLinksToRender] = useState(navLinks)
  const [isNestedRoute, setIsNestedRoute] = useState(false)

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      isOpen={isOpen && isMobileDevice}
    >
      <DrawerOverlay />
      <DrawerContent bg="gray.900">
        <DrawerHeader
          py="44px"
          justifyContent={isNestedRoute ? "left" : "center"}
        >
          {isNestedRoute ? (
            <HStack
              cursor="pointer"
              onClick={() => {
                setNavLinksToRender(navLinks)
                setIsNestedRoute(false)
              }}
            >
              <Icon color="gray.300" as={FaChevronLeft} />
              <H5 color="gray.300">Back</H5>
            </HStack>
          ) : (
            <ThresholdBrand isDrawerOpen />
          )}
        </DrawerHeader>
        <DrawerBody
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          pb={20}
        >
          <Stack divider={<StackDivider borderColor="gray.700" />}>
            {navLinksToRender.map(({ url, label, subitems }) => (
              <MobileNavLink
                key={label}
                href={url}
                hasNested={!!subitems}
                onClick={() => {
                  if (subitems) {
                    setIsNestedRoute(true)
                    setNavLinksToRender(subitems)
                  }
                }}
              >
                {label}
              </MobileNavLink>
            ))}
          </Stack>
          <VStack>
            <SocialMediaLinks isMobileDrawerFooter links={socialLinks} />
            <BodySm color="gray.300">
              ©{new Date().getFullYear()} | A Thesis Build
            </BodySm>
            <BodySm color="gray.300">All Rights Reserved</BodySm>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileDrawer
