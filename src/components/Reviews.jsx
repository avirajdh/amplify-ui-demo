import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
  Flex,
  View,
  Button,
  Link
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {Review} from './Review.jsx'
import '@aws-amplify/ui-react/styles.css';

export function Reviews() {
    const params = useParams();
    const sportsCardId = params.id;
    const [reviews, setReviews] = React.useState([]);
    React.useEffect(() => {
      fetch("/api/reviews")
      .then((res) => { 
        console.log(res)
        return res.json()
      })
      .then((json) => {
          setReviews(json)
          console.log(json)
      })
    }, [])
    const getReviews = reviews.filter((review) => review.cardId === parseInt(sportsCardId, 10)).map(
      (review) => {
        return(
          <Review review={review} />
        )
      }
    )
    return(
      <View as="div"
        ariaLabel="View example"
        borderRadius="6px"
        color="var(--amplify-colors-blue-60)"
        maxWidth="60rem" marginBottom={"2rem"} marginLeft="2rem">
        <Flex direction='row' maxWidth={"50rem"} wrap={"wrap"}>
          {getReviews}
        </Flex>
        <Link href={`http://localhost:3000/sportscards/${sportsCardId}/reviews/create-review`} key={sportsCardId}><Button variation='primary'>Create a Review</Button></Link>
      </View>
    )
}