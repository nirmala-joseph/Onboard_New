import React, { Component } from 'react';
import { Table, Button, Icon, Grid, GridRow, GridColumn, Modal, Form, Select } from 'semantic-ui-react';
import CreateSale from './createSale.jsx';
import DeleteSales from './deleteSales.jsx';
import EditSales from './editSales.jsx';


export default class Sales extends Component {

    constructor(props) {
        super(props);
       // this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            SalesList: [],
            Success: { Data: '' },
            showCreateModal: false,
            showDeleteModal: false,
            deleteId: 0,
            editId: 0,
            name: '',
            address: '',
            ProductId: '',
            StoreId: '',
            CustomerId: '',
            DateSold: '',
            ID: 0,
            errors: {},
            open: false,
            showUpdateModal: false,
                  
            storeDropdownList: []            
        };

        this.createNew = this.createNew.bind(this);
        this.loadData = this.loadData.bind(this);
        this.close = this.close.bind(this);
       //this.editSalesDetail = this.editSalesDetail.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.deleteSale = this.deleteSale.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.getDate = this.getDate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        
    }

    closeEdit() {
        this.setState({ showUpdateModal: false })
    }
    closeDelete() {
        this.setState({ showDeleteModal: false })
    }

    onChange(e, data) {
        console.log(e.target.name,'-------->',e.target.value)
        if (e.target.name === undefined) {
            this.setState({ [data.name]: data.value });
      }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    //onChange(e, data) {
    //    if (e.target.name === undefined) {
    //        this.setState({ [data.name]: data.value });
    //    }
    //    else {
    //        this.setState({ [e.target.name]: e.target.value });
    //    }
    //}

    

    deleteSale(id) {

        this.setState({ showDeleteModal: true, deleteId: id })
    }
    //////////////handleUpdate

    handleUpdate(id) {
       // alert('id' + id);
       
        //alert(editId);
        //let data = id;
       
        $.ajax({
            url: "/Sales/getSale/" +id,
            type: "GET",
            dataType: 'json',
            ContentType:'application/json',
            //data: id,
            success: function (data) {
                this.setState({ ID: data.id, CustomerId: data.customerId, ProductId: data.productId, StoreId: data.storeId, DateSold: this.getDate(data.dateSold) });
              console.log('dataaaaa',data)
            }.bind(this)
            
        });
        this.setState({ showUpdateModal: true, editId: id });
    }

    //DateConverterForUpdate
    DateConverterForUpdate(tempdate) {
        var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")))
        var temp = new Date(converted);
        //var date = (temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear())
        var date = (temp.getFullYear() + "/" + (temp.getMonth() + 1) + "/" + (temp.getDate()))
        //var yr = temp.getFullYear();
        
        //var month = temp.getMonth()+1;
        //if (month < 10) { month = '0' + month }
        //var datetemp = temp.getDate();
        //if (datetemp < 10) { datetemp = '0' + datetemp }
        //var date = yr + "/" + month + "/" + datetemp;
        return date
    }

    
    close()
        {
        this.setState({ showCreateModal: false });
    }



    componentDidMount() {

        this.loadData();
       

    }




    onEdit() {

        this.setState({ showUpdateModal: false });

        
        let data = {
            'Id': this.state.editId,
            'CustomerId': this.state.CustomerId,
            'ProductId': this.state.ProductId,
            'StoreId': this.state.StoreId,
            'DateSold': this.state.DateSold
        }
        console.log(data);
        $.ajax({
            url: "/Sales/updateSales",
            type: "POST",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',

            success: function (res) {
                if (res == 'success') {
                    //this.props.close();
                    this.loadData();

                }
                else { alert("failed to edit product"); }
            }.bind(this)

        });
        //let data = {
        //    'Id': this.state.editId,
        //    'ProductId': this.state.ProductId,
        //    'CustomerId': this.state.CustomerId,
        //    'StoreId': this.state.StoreId,
        //    'DateSold': this.state.DateSold
           
        //};

        //console.log('dataaa----->',data)
        //$.ajax({
        //    url: "/Sales/updateSales",
        //    type: "POST",
        //    data: JSON.stringify(data),
        //    dataType: 'json',
        //    contentType: 'application/json; charset=UTF-8',

        //    success: function (res) {
        //        if (res == 'success') {
        //            this.loadData();
        //        }
        //    }.bind(this)
        //});
    }

    onDelete() {

        this.setState({ showDeleteModal: false })
        let data = this.state.deleteId;
        console.log(data);
        $.ajax({
            url: "/Sales/deleteSales/" + data,
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
        this.setState({
            showCreateModal: true
            //open: true 
        });

        
        
    }

    getDate(tempdate) {
        var temp = new Date(tempdate);
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sept", "Oct",
            "Nov", "Dec"
        ];
        var date = (temp.getDate() + ' ' + monthNames[temp.getMonth()] + ', ' + temp.getFullYear())
        return date
    }


    


    loadData() {
        $.ajax({
            url: "/Sales/GetSales",
            type: "GET",
            success: function (data) { this.setState({ SalesList: data }) }.bind(this)
           
        });
       
    }

    ///////////////////////////////////////////////////////////////
    render() {

        
        let tableList = this.state.SalesList;
        console.log(tableList);
        let TableData;
       
        if (tableList.length != 0)
        {

            TableData = tableList.map((s) =>
                <Table.Row key={s.id}>
                    <Table.Cell>{s.customerName}</Table.Cell>
                    <Table.Cell>{s.productName}</Table.Cell>
                    <Table.Cell>{s.storeName}</Table.Cell>
                    <Table.Cell>{this.getDate(s.dateSold)}</Table.Cell>
                    <Table.Cell>

                        <Button color='yellow' onClick={this.handleUpdate.bind(this, s.id)}>
                            <i className="edit icon"></i>Edit </Button></Table.Cell>
                    

                    <Table.Cell>

                        <Button color='red' onClick={this.deleteSale.bind(this, s.id)}>
                            <Icon name='delete' />Delete</Button>

                    </Table.Cell>

                </Table.Row>);


        }


        return (

            
            <div>
                <div>{this.state.showCreateModal ? <CreateSale open={this.state.showCreateModal} onChange={this.onChange} close={this.close} submit={this.onSubmit} loadData={this.loadData} /> : null}</div>
                <div>{this.state.showDeleteModal ? <DeleteSales open={this.state.showDeleteModal} close={this.closeDelete} submit={this.onDelete} /> : null}</div>
                <div>{this.state.showUpdateModal ? <EditSales open={this.state.showUpdateModal} onChange={this.onChange} close={this.closeEdit} submit={this.onEdit} updateId={this.state.ID} CustomerId={this.state.CustomerId} ProductId={this.state.ProductId} StoreId={this.state.StoreId} DateSold={this.state.DateSold} onChange={this.onChange} /> : null}</div>
                <Grid>
                    <GridRow><GridColumn><Button color="blue" onClick={this.createNew}>New Sale</Button></GridColumn></GridRow>
                </Grid>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Date Sold</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {TableData}
                    </Table.Body>
                </Table>



            </div>

        );

    }
}




