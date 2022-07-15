import * as React from 'react';
import {Button, Flex, Heading, Text, Link} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export function HomePage() {
    return(
        <Flex direction="column">
            <Flex direction="row" justifyContent="center" alignItems="center" alignContent="flex-start" wrap="nowrap" gap="1.5rem" marginTop={'12rem'}>
                <Heading level={1} variation='primary' color={"black"}>Card Stop</Heading>
            </Flex>
            <Flex direction="row" justifyContent="center" alignItems="center" alignContent="flex-start" wrap="nowrap" gap="1.5rem" marginTop={'1rem'}>
                <Text variation="primary" as="em" color="black" lineHeight="1.5em" fontWeight={400} fontSize="1.5em" fontStyle="normal"
                textDecoration="none" width="30vw">
                    Welcome to Cards Stop! Your one stop destination for some of your favorite player's authentic cards. We have the best
                    prices in the industry and also offer a price match guarantee. Click on the button below to get started and shop your favorite player's cards.
                </Text>
            </Flex>
            <Flex direction="row" justifyContent="center" alignItems="center" alignContent="flex-start" wrap="nowrap" gap="1.5rem" marginTop={'2rem'}>
                <Link href="/sportscards"><Button variation='primary'>Get Started</Button></Link>
            </Flex>
        </Flex>
    )
}