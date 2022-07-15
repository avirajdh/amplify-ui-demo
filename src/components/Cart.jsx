import * as React from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import {
    Button,
    Card,
    Flex,
    Image,
    Text,
    Heading,
    View,
    Badge
} from '@aws-amplify/ui-react';
import {FaWindowClose} from 'react-icons/fa';
import '@aws-amplify/ui-react/styles.css';

export default function Cart(props) {
    const {closeCart} = props;
    const [cartItems, setCartItems] = React.useState([]);
    React.useEffect(() => {
        fetch("/api/carts")
        .then((res) => {
            console.log("Response: ", res)
            return res.json();
        })
        .then((json) => {
            console.log("JSON: ", json)
            setCartItems(json)
        })
    }, [])

    const onAdd = (product) => {
        const alreadyExists = cartItems.find((item) => item.id === product.id);
        if (alreadyExists) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...alreadyExists, qty: alreadyExists.qty + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    }
    const onRemove = (product) => {
        const alreadyExists = cartItems.find(item => item.id === product.id);
        if(alreadyExists.qty === 1) { 
          setCartItems(cartItems.filter((item) => item.id !== product.id));
        } else {
          setCartItems(cartItems.map(item => item.id === product.id ? {...alreadyExists, qty: alreadyExists.qty - 1} : item));
        }
    }
    const cartItemDisplay = cartItems.map((item) => {
        return(
            <Card padding={"1 rem"} margin={"1 rem"} backgroundColor={"green.20"}
            boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
            border="1px solid var(--amplify-colors-black)">
                <Flex variation="outlined" direction={"row"} justifyContent={"flex-start"} alignContent={"flex-start"} wrap={"wrap"} gap={"2rem"}>
                    <Image src={item.cardImage} alt={item.imageCaption} maxHeight={"5rem"} width={"5rem"} maxWidth={"inherit"}></Image>
                    <Heading level={4} width={"5rem"}>{item.playerName}</Heading>
                    <Button variation='success' onClick={() => onAdd(item)} color={"green"}>+</Button>
                    <Button variation='warning' onClick={() => onRemove(item)} color={"red"}>-</Button>
                    <Text>{item.qty} x {item.cardPrice}</Text>  
                </Flex>
            </Card>
        )
    });
    return(
        <View ariaLabel="Cart" backgroundColor={"green.10"}
        borderRadius="6px" border="1px solid var(--amplify-colors-black)" boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
        color="var(--amplify-colors-blue-60)" padding="1rem">
             <Flex direction={"column"} alignItems={"center"} >
                <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <Heading level={"4"}> Here's your Cart</Heading>
                    <Flex direction={"row"} alignItems={"center"}>
                        <Button size='small' onClick={closeCart}><FaWindowClose /></Button>
                    </Flex>
                 </Flex>                
                <Flex direction={"column"} justifyContent={"flex-start"}>
                    {cartItems.length === 0 && <Text textAlign={"center"}>Cart is Empty</Text>}
                    {cartItems.length !== 0 && cartItemDisplay}
                </Flex>
            </Flex> 
        </View>
    )
}