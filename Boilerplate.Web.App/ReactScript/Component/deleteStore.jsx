import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';

export default class StoreDelete extends Component {
    
    render() {
        
        return (

            <Modal open={this.props.open} onClose={this.props.close} size='small'>
                    <Modal.Header> Delete Store? </Modal.Header>
                    <Modal.Content><h4>Are you sure you want to delete ? </h4></Modal.Content>
                    <Modal.Actions>
                    <Button onClick={this.props.close} secondary >Cancel</Button>
                    <Button onClick={this.props.submit} color='red'>
                            Delete <i className="x icon"></i></Button>
                    </Modal.Actions>
                </Modal>
            
        )
    }
}