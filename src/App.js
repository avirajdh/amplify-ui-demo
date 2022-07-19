import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import { Authenticator, Flex , Button, ToggleButton, Icon} from '@aws-amplify/ui-react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import {Menu, MenuItem, Divider, Text} from '@aws-amplify/ui-react';
import {SportsCards} from './components/sportsCards';
import { FaHome, FaBasketballBall, FaSearch, FaAnchor, FaCartPlus, FaCross} from 'react-icons/fa';
import { HomePage } from './components/HomePage';
import {Reviews} from './components/Reviews'
import Cart from './components/Cart.jsx';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Faqs from './components/Faqs';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateReview from './components/CreateReview';

Amplify.configure(awsconfig);


function App({ signOut, user}) {
  const [isOpen, openCart] = React.useState(false);
  const closeCart = () => {
    openCart(false);
  }
  const toggleCart = () => {
    if(!isOpen) {
      openCart(true);
    }
  }

  return (
      <main>
          <Flex direction={"row"} alignContent={"flex-start"} marginTop={"1rem"}>
            <Flex direction={"row"} justifyContent={"flex-start"} marginLeft={"1rem"}>
              <Menu menuAlign="start" variation="primary" size="default">
                <MenuItem><Link to="/">Home<FaHome /></Link></MenuItem>
                <Divider />
                <MenuItem><Link to="/sportscards">Sports Cards<FaBasketballBall /></Link></MenuItem>
                <Divider />
                <MenuItem><Link to="/faqs">FAQs<FaAnchor /></Link></MenuItem>
              </Menu>
              <Button onClick={signOut} variation='primary'>Sign out</Button>
            </Flex>  
          </Flex>
          <Flex direction={"row"} justifyContent={"flex-end"} marginRight={"1em"}>         
              {!isOpen && <ToggleButton size='large' onClick={() => toggleCart()}><FaCartPlus /> <Text variation="primary" as="em" color="red"></Text></ToggleButton>}
              <Flex direction={"column"}>
                {isOpen && <Cart closeCart={closeCart}/>}
              </Flex>
          </Flex>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/sportscards" element={<SportsCards></SportsCards>} />
          <Route path="/sportscards/:id/reviews" element={<Reviews></Reviews>} />
          <Route path="/sportscards/:id/reviews/create-review" element={<CreateReview></CreateReview>} />
          <Route path="/faqs" element={<Faqs />} />
        </Routes>
    </main>
  );
}

export default withAuthenticator(App);
