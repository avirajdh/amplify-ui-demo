import * as React from 'react';
import {
  Expander,
  ExpanderItem,
  Flex,
  Heading
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function Faqs() {
    return(
        <Flex direction={"column"}>
            <Heading level={"2"} alignSelf={"center"}>FAQs</Heading>
            <Flex direction={"column"} alignSelf="center" justifyContent="center" marginTop={"5rem"} marginLeft={"3rem"} width={"60rem"} maxWidth={"60rem"}>
                <Expander type="single" isCollapsible={true}>
                    <ExpanderItem title="Is it accessible?" value="demo-item-1">
                        Yes! It adheres to the WAI-ARAI design pattern.
                    </ExpanderItem>
                    <ExpanderItem title="Can I customize the styling?" value="demo-item-2">
                        Of course! See the section on CSS Styling below.
                    </ExpanderItem>
                    <ExpanderItem
                        title="Is it a great way to organize content?"
                        value="demo-item-3"
                    >
                        Most definitely!
                    </ExpanderItem>
                    <ExpanderItem title="Is it accessible?" value="demo-item-1">
                        Yes! It adheres to the WAI-ARAI design pattern.
                    </ExpanderItem>
                    <ExpanderItem title="Can I customize the styling?" value="demo-item-2">
                        Of course! See the section on CSS Styling below.
                    </ExpanderItem>
                    <ExpanderItem
                        title="Is it a great way to organize content?"
                        value="demo-item-3"
                    >
                        Most definitely!
                    </ExpanderItem>
                    
                </Expander>
            </Flex>
        </Flex>
    )
}