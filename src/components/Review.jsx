import * as React from 'react';
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Image,
  Rating,
  ScrollView,
  Text
} from '@aws-amplify/ui-react';
import {FaRegThumbsUp, FaRegThumbsDown, FaRegWindowClose} from 'react-icons/fa';
import '@aws-amplify/ui-react/styles.css';

export function Review(props) {
    const review = props.review;
    const [numLikes, increaseNumLikes] = React.useState(0);
    const [numDislikes, increaseNumDislikes] = React.useState(0);
    const [isLiked, setLiked] = React.useState(false);
    const [isDisliked, setDisliked] = React.useState(false);

    const setLike = () => {
        if(numDislikes !== 0) {
            increaseNumDislikes(-1);
        }
        setDisliked(false);
        setLiked(true);
        increaseNumLikes(1);
        
    }
    const setDislike = () => {
        if(numLikes !== 0) {
            increaseNumLikes(-1);
        }
        setLiked(false);
        setDisliked(true);
        increaseNumDislikes(1);
    }
    return(
        <Card variation='outlined' padding={"2 rem"} margin={"2rem"} maxWidth={"50rem"} backgroundColor={"green.10"}
        boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
        border="1px solid var(--amplify-colors-black)"
        >
            <Flex direction="row" alignItems={"flex-start"}>               
                <ScrollView className="horizonatal-example" height="300px" maxWidth="280px">
                    <Image
                        width="500px"
                        maxWidth="500px"
                        src="https://i.ebayimg.com/images/g/-igAAOSwpdNgl4uO/s-l500.jpg"
                        alt="customer posted sports card"
                    />
                </ScrollView>
                <Flex direction="column">
                    <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>
                        <Heading level={"5"} alignSelf={"center"}>{review.customerName}</Heading>
                        {review.verified ? (
                        <Badge alignSelf="flex-end" maxWidth={"10rem"} variation="warning">Verified Purchase</Badge>
                        ) : <Badge alignSelf="flex-end" maxWidth={"12rem"} variation="primary">Non-Verified Purchase</Badge>}
                    </Flex>                   
                    <Text
                        variation="primary"
                        as="p"
                        color="blue"
                        lineHeight="1.5em"
                        fontWeight={700}
                        fontSize="1em"
                        fontStyle="normal"
                        textDecoration="none"
                        width="30vw"
                    >
                        {review.dateOfReview}
                    </Text>
                    <Text>{review.reviewText}</Text>
                    <Flex direction={"row"} alignContent={"center"}>
                        <Button variation={isLiked ? "primary" : "default"} onClick={setLike}><FaRegThumbsUp /> {numLikes > 0 ? numLikes : null}</Button>
                        <Button variation={isDisliked ? "primary" : "default"} onClick={setDislike}><FaRegThumbsDown /> {numDislikes > 0 ? numDislikes : null}</Button>
                    </Flex>
                    <Flex direction={"row"} alignItems={"baseline"}>
                        <Rating value={review.rating} maxValue={5} fillColor="hsl(300, 95%, 30%)" emptyColor="hsl(210, 5%, 94%)"/>
                        <Text>({review.rating} / 5)</Text>
                    </Flex>
                    
                </Flex>
            </Flex>
        </Card>
    )
}
export default Review;