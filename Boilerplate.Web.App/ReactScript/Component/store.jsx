import React, { Component } from 'react';
import { Table, Button, Icon, Grid, GridRow, GridColumn, Modal, Form } from 'semantic-ui-react';
import EditStoredata from './editStore.jsx';
import StoreDelete from './deleteStore.jsx';


export default class Store extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            StoreList: [],
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
            showDeleteModal: false
        };

        this.createNew = this.createNew.bind(this);
        this.loadData = this.loadData.bind(this);
        this.editStoreDetail = this.editStoreDetail.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.deleteStore = this.deleteStore.bind(this);
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

    editStoreDetail(id, name, address) {

        this.setState({ showUpdateModal: true, name: name, address: address, updateId: id });
    }



    deleteStore(id) {

        this.setState({ showDeleteModal: true, deleteId: id })
    }





    onSubmit() {
        this.setState({ open: false });
        let data = {
            'name': this.state.name,
            'address': this.state.address
        };
        // console.log("onsubmit-",data);

        $.ajax({
            url: "/Store/createStore",
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

    onEditSubmit() {

        this.setState({ showUpdateModal: false })
        let data = {
            'id': this.state.updateId,
            'name': this.state.name,
            'address': this.state.address
        };


        $.ajax({
            url: "/Store/updateStore",
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
            url: "/Store/deleteStore/" + data,
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
            url: "/Store/GetStores",
            type: "GET",
            success: function (data) { this.setState({ StoreList: data }) }.bind(this)
        });
    }

    ///////////////////////////////////////////////////////////////
    render() {

        let tableList = this.state.StoreList;
        console.log(tableList)
        let TableData;

        if (tableList.length != 0) {

            TableData = tableList.map((s, index) =>

                <Table.Row key={s.id}>
                    <Table.Cell>{s.name}</Table.Cell>
                    <Table.Cell>{s.address}</Table.Cell>


                    <Table.Cell>

                        <Button color='yellow' onClick={this.editStoreDetail.bind(this, s.id, s.name, s.address)}>
                            <i className="edit icon"></i>Edit</Button>
                    </Table.Cell>

                    <Table.Cell>

                        <Button color='red' onClick={this.deleteStore.bind(this, s.id)}>
                            <Icon name='delete' />Delete</Button>

                    </Table.Cell>

                </Table.Row>);


        }


        return (

            <div>
                <div>{this.state.showUpdateModal ? <EditStoredata open={this.state.showUpdateModal} onChange={this.onChange} close={this.closeEdit} name={this.state.name} address={this.state.address} submit={this.onEditSubmit} /> : null}</div>
                <div>{this.state.showDeleteModal ? <StoreDelete open={this.state.showDeleteModal} close={this.closeDelete} submit={this.onDelete} id={this.state.id} submit={this.onDelete} /> : null}</div>
                <Grid>
                    <GridRow><GridColumn><Button color="blue" onClick={this.createNew}>New Store</Button></GridColumn></GridRow>
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
                    <Modal.Header>Create New Store</Modal.Header>
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




