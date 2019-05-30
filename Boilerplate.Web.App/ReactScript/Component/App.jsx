// ./src/common/main.component.jsx
import React, { Component } from 'react';
import Customer from './customer.jsx';
import Product from './product.jsx';
import Store from './store.jsx';
import Sales from './sales.jsx';
import 'semantic-ui-css';
import { Menu, Segment } from 'semantic-ui-react';



export default class App extends Component {

    state = { activeItem: 'customers' }
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }
    render() {
        const { activeItem } = this.state
        let mainPage;
        if (activeItem == 'customers') {
            mainPage = <Customer />;
        }
        else if (activeItem == 'products') {
            mainPage = <Product />;
        }
        else if (activeItem == 'stores') {
            mainPage = <Store />;
        }
        else if (activeItem == 'sales') {
            mainPage = <Sales />;
        }
        else {
            mainPage = <Customer />
        }




        return (
            //<div> {<Customer />} </div>
            <div>
                <Segment inverted>
                    <Menu inverted secondary>
                        <Menu.Item name='React' />
                        <Menu.Item
                            name='customers'
                            active={activeItem === 'customers'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='products'
                            active={activeItem === 'products'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='stores'
                            active={activeItem === 'stores'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='sales'
                            active={activeItem === 'sales'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                </Segment>
                {mainPage}
            </div>

        );
    }
}

    

