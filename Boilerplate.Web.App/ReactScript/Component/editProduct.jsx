﻿import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class EditProductdata extends Component {


    render() {
        // alert(this.props.name)
        return (
            <div>
                <Modal open={this.props.open} onClose={this.props.close} style={{ display: 'block' }} size={'small'}>
                    <Modal.Header>Edit Product</Modal.Header>
                    <Modal.Content >
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name' value={this.props.name} onChange={this.props.onChange} name="name" />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input placeholder='Price' value={this.props.price} onChange={this.props.onChange} name="price" />
                            </Form.Field>
                        </Form>


                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.props.close}>Cancel</Button>
                        <Button type='submit'
                            icon='check'
                            color='green'
                            labelPosition='right'
                            content="Save"
                            onClick={this.props.submit}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }

}