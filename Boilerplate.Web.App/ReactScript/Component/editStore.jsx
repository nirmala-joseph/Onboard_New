import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class EditStoredata extends Component {


    render() {
        // alert(this.props.name)
        return (
            <div>
                <Modal open={this.props.open} onClose={this.props.close} style={{ display: 'block' }} size={'small'}>
                    <Modal.Header>Edit Store</Modal.Header>
                    <Modal.Content >
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name' value={this.props.name} onChange={this.props.onChange} name="name" />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input placeholder='Address' value={this.props.address} onChange={this.props.onChange} name="address" />
                            </Form.Field>
                        </Form>


                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.props.close}>Cancel</Button>
                        <Button type='submit'
                            color='green'
                            icon='check'
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