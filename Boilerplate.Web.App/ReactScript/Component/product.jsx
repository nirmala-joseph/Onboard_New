import React, { Component } from 'react';
import { Table, Button, Icon, Grid, GridRow, GridColumn, Modal, Form } from 'semantic-ui-react';
import EditProductdata from './editProduct.jsx';
import ProductDelete from './deleteProduct.jsx';


export default class Product extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            productlist: [],
            Success: { Data: '' },
            showDeleteModal: false,
            deleteId: 0,
            showCreateModal: false,
            name: '',
            price: '',
            updateId: 0,
            id: 0,
            errors: {},
            open: false,
            showUpdateModal: false,
            showDeleteModal: false
        };

        this.createNew = this.createNew.bind(this);
        this.loadData = this.loadData.bind(this);
        this.editProductDetail = this.editProductDetail.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
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

    editProductDetail(id, name, price) {

        this.setState({ showUpdateModal: true, name: name, price: price, updateId: id });
    }



    deleteProduct(id) {

        this.setState({ showDeleteModal: true, deleteId: id })
    }





    onSubmit() {
        
        this.setState({ open: false })
        let data = {
            'name': this.state.name,
            'price': this.state.price
        };
        // console.log("onsubmit-",data);
        
        $.ajax({
            url: "/product/createProduct",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',

            success: function (res) {
                if (res == 'success') {
                    
                    this.loadData();
                   
                }
                else { alert("failed to add product");}
            }.bind(this)
        });
    }

    onEditSubmit() {
        //e.preventDefault();
        //alert(this.state.name + '.....')
        this.setState({ showUpdateModal: false })
        let data = {
            'id': this.state.updateId,
            'name': this.state.name,
            'price': this.state.price
        };
         console.log("onsubmit-",data);

        $.ajax({
            url: "/Product/updateProduct",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',

            success: function (res) {
                if (res == 'success') {
                    this.loadData();
                }
            }.bind(this)
        });
    }

    onDelete() {
        
        this.setState({ showDeleteModal: false })
        let data = this.state.deleteId;
        console.log(data);
        $.ajax({
            url: "/Product/deleteProduct/" + data,
            type: "DELETE",
            data: data,
            dataType: 'json',
            success: function (res) {
                if (res == 'success') {
                    this.loadData();
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
            url: "/Product/GetProducts",
            type: "GET",
            success: function (data) { this.setState({ productlist: data }) }.bind(this)
        });
    }

    ///////////////////////////////////////////////////////////////
    render() {

        let tableList = this.state.productlist;
        console.log(tableList)
        let TableData;

        if (tableList.length != 0) {

            TableData = tableList.map((p, index) =>

                <Table.Row key={p.id}>
                    <Table.Cell>{p.name}</Table.Cell>
                    <Table.Cell>${p.price}</Table.Cell>


                    <Table.Cell>

                        <Button color='yellow' onClick={this.editProductDetail.bind(this,p.id, p.name, p.price)}>
                            <i className="edit icon"></i>Edit</Button>
                    </Table.Cell>

                    <Table.Cell>

                        <Button color='red' onClick={this.deleteProduct.bind(this, p.id)}>
                            <Icon name='delete' />Delete</Button>

                    </Table.Cell>

                </Table.Row>);


        }


        return (

            <div>
                <div>{this.state.showUpdateModal ? <EditProductdata open={this.state.showUpdateModal} onChange={this.onChange} close={this.closeEdit} name={this.state.name} price={this.state.price} submit={this.onEditSubmit} /> : null}</div>
                <div>{this.state.showDeleteModal ? <ProductDelete open={this.state.showDeleteModal} close={this.closeDelete} submit={this.onDelete} id={this.state.id} submit={this.onDelete} /> : null}</div>
                <Grid>
                    <GridRow><GridColumn><Button color="blue" onClick={this.createNew}>New Product</Button></GridColumn></GridRow>
                </Grid>
                <Table collapsing celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width='six'>Name</Table.HeaderCell>
                            <Table.HeaderCell width='three'>Price</Table.HeaderCell>
                            <Table.HeaderCell width='three'>Actions</Table.HeaderCell>
                            <Table.HeaderCell width='three'>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {TableData}
                    </Table.Body>
                </Table>


                <Modal open={this.state.open} onClose={this.close} style={{ display: 'block' }} size={'small'}>
                    <Modal.Header>Create Product</Modal.Header>
                    <Modal.Content >
                        <Form onSubmit={this.onSubmit}>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name' onChange={this.onChange} name="name" />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input placeholder='price' onChange={this.onChange} name="price" />
                            </Form.Field>
                        </Form>


                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>Cancel</Button>
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




