import Head from "next/head";
import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  Stack,
  Container,
  Link,
  Button,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Product, Dependency, WalletSection } from "../components";
import { dependencies, products } from "../config";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW="5xl" py={10}>
      <WalletSection />
    </Container>
  );
}
