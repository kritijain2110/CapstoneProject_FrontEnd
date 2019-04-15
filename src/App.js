
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './screens/home/Home';
import Header from './common/header/Header';
import Basic from './common/header/Basic';
import Details from './screens/details/Details';
import Checkout from './screens/checkout/Checkout';
class App extends Component {
    render() {
        return (
            <Router>
                <div>

                    <Switch>
                        <Route path='/' exact={true} component={Header} />
                        <Route path='/Login' exact={true} component={Header} />
                        <Route path='/Home' exact={true} component={Home} />
                       
                        <Route path='/Detail' exact={true} component={Details} />
                        <Route path='/Checkout' exact={true} component={Checkout} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

