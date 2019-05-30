import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form, Select } from 'semantic-ui-react';

export default class EditSales extends Component
{
        constructor(props) {
            super(props);
            this.state = {
                customerId: '',
                productId: '',
                storeId: '',
                dos: '',
                CustomerDropdownList: [],
                ProductDropdownList: [],
                StoreDropdownList: [],
                showDateField:true
            };
            this.onChange = this.onChange.bind(this);
            this.CustomersDropdown = this.CustomersDropdown.bind(this);
            this.ProductsDropdown = this.ProductsDropdown.bind(this);
            this.StoresDropdown = this.StoresDropdown.bind(this);
            this.showDate = this.showDate.bind(this);
            this.changeDate = this.changeDate.bind(this);
            //this.onSubmit = this.onSubmit.bind(this);
        }

    componentDidMount() {
        this.CustomersDropdown();
        this.ProductsDropdown();
        this.StoresDropdown();
        console.log('DateSold in model-' + this.props.DateSold);
    }

    changeDate() {
        this.setState({ showDateField: false }, console.log(this.state.showDateField))
    }

    showDate() {
        if (!this.state.showDateField) {
            return <input type="date" name="DateSold" defaultValue={this.props.DateSold} onChange={this.props.onChange} />
        }
        return <input type="text" name="DateSold" defaultValue={this.props.DateSold} onChange={this.props.onChange} onClick={this.changeDate} />
    }

    CustomersDropdown() {
        $.ajax({
            url: "/Customer/GetCustomers",
            type: "GET",
            success: function (data) {
                // alert(data);
                this.setState({ CustomerDropdownList: data });
            }.bind(this)
        })
    }

    ProductsDropdown() {
        $.ajax({
            url: "/Product/GetProducts",
            type: "GET",
            success: function (data) {
                console.log(data);
                this.setState({ ProductDropdownList: data });
            }.bind(this)
        });

    }

    StoresDropdown() {
        $.ajax({
            url: "/Store/GetStores",
            type: "GET",
            success: function (data) { this.setState({ StoreDropdownList: data }) }.bind(this)
        });
    }

    onChange(e, data) {
        if (e.target.name === undefined) {
            this.setState({ [data.name]: data.value });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    close() {

    }

    render() {
        //alert(this.props.CustomerId);
        let list = this.state.CustomerDropdownList;
        let Customertemp = list.map(sale => {
            return ({ 'key': sale.id, 'value': sale.id, 'text': sale.name });
        });
        console.log(this.state.ProductDropdownList);
        let prodlist = this.state.ProductDropdownList;
        let Producttemp = prodlist.map(sale => {
            return ({ 'key': sale.id, 'value': sale.id, 'text': sale.name });
        });

        let storelist = this.state.StoreDropdownList;
        let Storetemp = storelist.map(st => {
            return ({ 'key': st.id, 'value': st.id, 'text': st.name });
        });
        // alert(this.props.name)
        return (
            <div>
                <Modal open={this.props.open} onClose={this.props.close} style={{ display: 'block' }} size={'small'}>
                    <Modal.Header>Edit Sales Details</Modal.Header>
                    <Modal.Content >
                        
                            <Form onSubmit={this.props.onSubmit}>
                            <Form.Field><label>Date of sale</label>{this.showDate()}</Form.Field>
                            <Form.Field control={Select} label='Customer' options={Customertemp} value={this.props.CustomerId} name='CustomerId' onChange={this.props.onChange} />
                            <Form.Field control={Select} label='Product' options={Producttemp} value={this.props.ProductId} name='ProductId' onChange={this.props.onChange} />
                            <Form.Field control={Select} label='Store' options={Storetemp} value={this.props.StoreId} name='StoreId' onChange={this.props.onChange} />
                            
                            </Form>
                                                                  
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.props.close}>Cancel</Button>
                        <Button type='submit'
                            color='green'
                            icon='check'
                            labelPosition='right'
                            content="Edit"
                            onClick={this.props.submit}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }

}