import type { ReactElement } from "react";
import { Box, Flex } from "@chakra-ui/react";

function DefaultLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <Flex
        height="90vh"
        flexDirection="column"
        justify="center"
        align="center"
        mx="10vw"
      >
        {children}
      </Flex>
    </>
  );
}

export default DefaultLayout;
