import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form, Select } from 'semantic-ui-react';

export default class CreateSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: '',
            productId: '',
            storeId: '',
            dos:'',
            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoreDropdownList: []
        };
        this.onChange = this.onChange.bind(this);
        this.CustomersDropdown = this.CustomersDropdown.bind(this);
        this.ProductsDropdown = this.ProductsDropdown.bind(this);
        this.StoresDropdown = this.StoresDropdown.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.CustomersDropdown();
        this.ProductsDropdown();
        this.StoresDropdown();
    }

    CustomersDropdown() {
        $.ajax({
            url: "/Customer/GetCustomers",
            type: "GET",
            success: function (data) {
                //alert(data);
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

    onSubmit() {

        let CID = this.state.customerId;
        let data = { 'CustomerId': this.state.customerId, 'ProductId': this.state.productId, 'StoreId': this.state.storeId, 'DateSold': this.state.dos }
        console.log(data);
        $.ajax({
            url: "/Sales/createSale",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',

            success: function (res) {
                if (res == 'success') {
                    this.props.close();
                    this.props.loadData();

                }
                else { alert("failed to add product"); }
            }.bind(this)

        });
        

    }




    render() {
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

        let date = new Date().getDate();
        date = date+'/' + new Date().getMonth();
        date = date+'/' + new Date().getFullYear();
        
        return (
            <div>


                <Modal open={this.props.open} onClose={this.props.close} style={{ display: 'block' }} size={'small'}>
                    <Modal.Header>Create New Sale</Modal.Header>
                    <Modal.Content >
                        <Form onSubmit={this.props.onSubmit}>
                            <Form.Field><label>Date of sale</label><input type="date" name="dos" onChange={this.onChange}/></Form.Field>
                            <Form.Field control={Select} label='Customer' options={Customertemp} placeholder='customer' name='customerId' onChange={this.onChange}/>
                            <Form.Field control={Select} label='Product' options={Producttemp} placeholder='Product' name='productId' onChange={this.onChange}/>
                            <Form.Field control={Select} label='Store' options={Storetemp} placeholder='Store' name='storeId' onChange={this.onChange} />

                           
                        </Form>
  


                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.props.close}>Cancel</Button>
                        <Button type='submit' color='green'
                            icon='check'
                            labelPosition='right'
                            content="Create"
                            onClick={this.onSubmit}
                        />
                    </Modal.Actions>
                </Modal>

            </div>
        );
    }
}