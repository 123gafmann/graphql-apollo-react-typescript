import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import { Launches } from './component-launches';
import { Launch } from './component-launch';

//import logo from './SpaceX-Logo.png';
const logo = require('./images/spacex-logo.png');

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
    cache: new InMemoryCache()
});

export class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={client}>
                <Router>
                    <div className="container">
                        <img src={logo} alt="Space X logo" style={{width:"300px", display:"block", margin:"auto"}}/>
                        <Route exact path="/" component={Launches} />
                        <Route exact path="/launch/:flight_number" component={Launch} />
                    </div>
                </Router>
            </ApolloProvider>
        );
    }
}