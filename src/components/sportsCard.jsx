import * as React from 'react';
import { Link, Outlet } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Image,
  Rating,
  StepperField,
  Text,
  View
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';



export function SportsCard(props) {

    const {onAdd, handleAddToCart} = props;
    const product = props.product;

    return (
        <View width="100%" maxWidth="50rem" padding={{ base: 0, large: '2rem' }}>
        <Card variation="outlined">
          <Flex
            direction={{ base: 'column', large: 'row' }}
            justifyContent="space-evenly"
          >
            <Flex direction="column" gap="5rem" alignItems="center">
              <View width="15rem" height="19rem">
                <Image
                  src={product.cardImage}
                  alt={product.imageCaption}
                  width="100%"
                  height="100%"
                />
              </View>
            </Flex>
            <Flex direction="column" justifyContent="space-between">
              <Flex direction="column" gap="0.7rem">
                <Flex justifyContent="space-between" alignItems="center">
                  <Heading level={3}>{product.playerName}</Heading>
                  <Flex height="1.8rem">
                    {product.isAuthentic ? (
                      <Badge variation="success">Authentic</Badge>
                    ) : null}
                    {product.isNew ? (
                      <Badge variation="info">New</Badge>
                    ) : null}
                    {product.limitedSupply ? (
                      <Badge variation="warning">Limited</Badge>
                    ) : null}
                  </Flex>
                </Flex>
                <Text fontWeight="bold">{product.playerNumber}</Text>
                <Flex
                  direction={{ base: 'column', large: 'row' }}
                  alignItems="baseline"
                >
                  <Rating
                    value={product.averageRating}
                    fillColor="#f4a41d"
                  ></Rating>
                  <Text fontSize="small" fontWeight="lighter">
                    <Link to={`/sportscards/${product.id}/reviews`} key={product.id}> Reviews</Link>
                  </Text>
                </Flex>
                <Divider />
                <Flex alignItems="baseline">
                  <Text fontSize="medium" fontWeight="bold">
                    Price:
                  </Text>
                  <Text fontSize="large" color="#B12704" fontWeight="bold">
                    {product.cardPrice}
                  </Text>
                </Flex>
                <Text fontSize="small" paddingBottom="1rem">
                  {product.cardDescription}
                </Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                direction={{ base: 'column', large: 'row' }}
              >
                <Flex alignItems="center" gap="5px">
                  <Text>Qty:</Text>
                  <StepperField
                    label="Quantity"
                    min={1}
                    max={1}
                    step={1}
                    labelHidden
                    width="10rem"
                    isDisabled={!product.inStock}
                  />
                </Flex>
                <Button
                  variation="primary"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </View>
    )
}
