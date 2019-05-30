import React, { Component } from 'react';
import { Table, Button, Icon, Grid, GridRow, GridColumn, Modal, Form } from 'semantic-ui-react';
import EditCustomerdata from './editCustomer.jsx';
import CustomerDelete from './deleteCustomer.jsx';


export default class Customer extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            CustomerList: [],
            Success: { Data: '' },
            showDeleteModal: false,
            deleteId: 0,
            showCreateModal: false,
            name: '',
            address: '',
            updateId: 0,
            id: 0,
            errors: {},
            open: false,
            showUpdateModal: false,
            showDeleteModal:false
        };

        this.createNew = this.createNew.bind(this);
        this.loadData = this.loadData.bind(this);
        this.editCustomerDetail = this.editCustomerDetail.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.onDelete = this.onDelete.bind(this);

    }
    closeEdit() {
        this.setState({ showUpdateModal: false })
    }
    closeDelete() {
        this.setState({ showDeleteModal: false })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    editCustomerDetail(id ,name, address) {

        this.setState({ showUpdateModal: true, name: name, address: address, updateId:id });
    }



    deleteCustomer(id) {

        this.setState({ showDeleteModal: true,deleteId:id})
    }





    onSubmit() {
        
        let data = {
            'name': this.state.name,
            'address': this.state.address
        };
       // console.log("onsubmit-",data);
        
        $.ajax({
            url: "/Customer/createCustomer",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',

            success: function (res) {
                if (res == 'success') {
                    window.location.reload();
                }
            }.bind(this)
        });
    }

    onEditSubmit() {
        
        this.setState({ showUpdateModal:false })
        let data = {
            'id': this.state.updateId,
            'name': this.state.name,
            'address': this.state.address
        };
       

        $.ajax({
            url: "/Customer/updateCustomer",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',

            success: function (res) {
                if (res == 'success') {
                    window.location.reload();
                }
            }.bind(this)
        });
    }

    onDelete() {
        
        this.setState({ showDeleteModal: false })
        let data = this.state.deleteId;
        console.log(data);
        $.ajax({
            url: "/customer/deleteCustomer/" + data,
            type: "DELETE",
            data: data,
            dataType: 'json',
            success: function (res) {
                if (res == 'success') {
                    window.location.reload();
                }
            }.bind(this)
        });
    }


    createNew() {
        this.setState({ open: true })
    }
   
    close = () => this.setState({ open: false })


         
    componentDidMount() {

        this.loadData();

    }


    loadData() {
        $.ajax({
            url: "/Customer/GetCustomers",
            type: "GET",
            success: function (data) { this.setState({ CustomerList: data }) }.bind(this)
        });
    }

    ///////////////////////////////////////////////////////////////
    render() {

        let tableList = this.state.CustomerList;
        console.log(tableList)
        let TableData;

        if (tableList.length != 0) {

            TableData = tableList.map((c, index) =>

                <Table.Row key={c.id}>
                    <Table.Cell>{c.name}</Table.Cell>
                    <Table.Cell>{c.address}</Table.Cell>


                    <Table.Cell>

                        <Button color='yellow' onClick={this.editCustomerDetail.bind(this,c.id, c.name, c.address)}>
                            <i className="edit icon"></i>Edit</Button>
                    </Table.Cell>

                    <Table.Cell>

                        <Button color='red' onClick={this.deleteCustomer.bind(this, c.id)}>
                            <Icon name='delete' />Delete</Button>

                    </Table.Cell>

                </Table.Row>);


        }


        return (

            <div>
                <div>{this.state.showUpdateModal ? <EditCustomerdata open={this.state.showUpdateModal} onChange={this.onChange} close={this.closeEdit} name={this.state.name} address={this.state.address} submit={this.onEditSubmit} /> : null}</div>
                <div>{this.state.showDeleteModal ? <CustomerDelete open={this.state.showDeleteModal} close={this.closeDelete} submit={this.onDelete} id={this.state.id} submit={this.onDelete} /> : null}</div>
                <Grid>
                    <GridRow><GridColumn><Button color="blue" onClick={this.createNew}>New Customer</Button></GridColumn></GridRow>
                </Grid>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {TableData}
                    </Table.Body>
                </Table>


                <Modal open={this.state.open} onClose={this.close} style={{ display: 'block' }} size={'small'}>
                    <Modal.Header>Create Customer</Modal.Header>
                    <Modal.Content >
                        <Form onSubmit={this.onSubmit}>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name' onChange={this.onChange} name="name" />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input placeholder='Address' onChange={this.onChange} name="address" />
                            </Form.Field>
                        </Form>


                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>Cancel</Button>
                        <Button type='submit'
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


            

