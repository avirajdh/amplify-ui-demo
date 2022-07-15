import * as React from 'react';
import {
    Button,
    Flex
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { SportsCard } from './sportsCard';

export function SportsCards() {
    const [products, setProducts] = React.useState([])
    React.useEffect(() => {
        fetch("/api/sportscards")
        .then((res) => res.json())
        .then((json) => {
            console.log("Sports cards: ", json)
            setProducts(json)
        })
    }, [])

    const [all, clickAll] = React.useState(true);
    const [soccer, clickSoccer] = React.useState(false);
    const [basketball, clickBasketball] = React.useState(false);
    const [football, clickFootball] = React.useState(false);


    const handleAddToCart = (product) => {
        fetch('/api/carts', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(product)          
        })
        .then((response) => {
            console.log("POST response: ", response)
            return response.json()
        })
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const sportsCard = products.map((product) => {
        return(
            <SportsCard product={product} handleAddToCart={handleAddToCart}></SportsCard>
        )
    });
    const soccerCard = products.filter((product) => product.sport==="Soccer").map((product) => {
        return(
            <SportsCard product={product} handleAddToCart={handleAddToCart}></SportsCard>
        )
    });
    const basketballCard = products.filter((product) => product.sport==="Basketball").map((product) => {
        return(
            <SportsCard product={product} handleAddToCart={handleAddToCart}></SportsCard>
        )
    });
    const footballCard = products.filter((product) => product.sport==="Football").map((product) => {
        return(
            <SportsCard product={product} handleAddToCart={handleAddToCart}></SportsCard>
        )
    });
    const allIsClicked = () => {
        clickAll(true);
        clickSoccer(false);
        clickBasketball(false);
        clickFootball(false);
    }
    const soccerIsClicked = () => {
        clickSoccer(true);
        clickAll(false);
        clickBasketball(false);
        clickFootball(false);
    }
    const basketballIsClicked = () => {
        clickBasketball(true);
        clickAll(false);
        clickSoccer(false);
        clickFootball(false);
    }
    const footballIsClicked = () => {
        clickFootball(true);
        clickAll(false);
        clickSoccer(false);
        clickBasketball(false);
    }
    return(
        <main>
            <Flex direction="column">
                <Flex direction="row" justifyContent="center" alignItems="center" alignContent="flex-start" wrap="nowrap" gap="1.5rem" marginTop={'2rem'}>
                    <Button variation='primary' onClick={allIsClicked}>All</Button>
                    <Button variation='primary' onClick={soccerIsClicked}>Soccer</Button>
                    <Button variation='primary' onClick={basketballIsClicked}>Basketball</Button>
                    <Button variation='primary' onClick={footballIsClicked}>Football</Button>
                </Flex>
                <Flex direction = "row" justifyContent="align-start" alignItems="flex-start" alignContent="flex-start" wrap="wrap" gap="3rem" marginTop={'2rem'}>
                    {all && sportsCard}
                    {soccer && soccerCard}
                    {basketball && basketballCard}
                    {football && footballCard}
                </Flex>
                {/* <Pagination {...paginationProps} marginBottom={"2rem"}/> */}
            </Flex>
        </main>
        
    )
}
