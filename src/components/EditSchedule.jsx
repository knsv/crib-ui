import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Modal, Button, InputGroup, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import storage from 'crib-storage';
import Q from 'q';

@observer
class EditSchedule extends Component {
    componentWillMount() {

    }

    render() {

        if(this.props.show) {
            return (  <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Id:</ControlLabel>
                            <FormControl
                                type="text"
                                value={12}
                                placeholder="Enter text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Schedule:</ControlLabel>
                            <FormControl
                                type="text"
                                value={12}
                                placeholder="Enter text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Event:</ControlLabel>
                            <FormControl
                                type="text"
                                value={12}
                                placeholder="Enter text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Args:</ControlLabel>
                            <FormControl
                                type="text"
                                value={12}
                                placeholder="Enter text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button>Close</Button>
                        <Button bsStyle="primary">Save changes</Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>);
        }

        return (<span className="hidden"></span>);
    }

    handleChange = () => {


    }

}


export default EditSchedule;