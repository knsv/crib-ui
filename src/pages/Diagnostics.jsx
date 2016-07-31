import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {FormGroup, InputGroup, FormControl, Button, Table} from 'react-bootstrap';
import storage from 'crib-storage';

@observer
class Diagnostics extends Component {
    componentWillMount() {
        this.buss = this.props.appState.getBuss();
        this.events = 'Events received!\n';
        let self = this;
        this.buss.on('*', function (data) {
            console.log('EVENT => ', data.data[0],' ', data);
            self.props.appState.pushEvent(data);
        });

        // this.buss.emit('SET', {key:'diag12', value: 'okidoki'});
        storage.init(this.buss);
        storage.set('diag12', 'okidoki');

    }

    render() {
        const eventsCode = [];
        const events = this.props.appState.getEvents();
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            eventsCode.push(
                (
                    <tr key={i}>
                        <td>{event.date.toISOString()}</td>
                        <td>{event.data[0]}</td>
                        <td>{JSON.stringify(event.data[1])}</td>
                    </tr>
                )
            );
        }

        const tableInstance = (
            <Table responsive>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Data</th>
                </tr>
                </thead>
                <tbody>
                {eventsCode}
                </tbody>
            </Table>
        );


        return (<div className="container-fluid" role="main">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-5">
                    <form>
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text"/>
                                <InputGroup.Addon>=></InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </div>
                <div className="col-md-1">
                    <Button type="button" onClick={this.echo}>
                        Send
                    </Button>
                </div>
                <div className="col-md-4"></div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {tableInstance}
                </div>

            </div>
        </div>);
    }

    echo = () => {
        storage.get('diag12');
    }
}

export default Diagnostics;