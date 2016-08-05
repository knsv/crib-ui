import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {FormGroup, InputGroup, FormControl, Button, Table} from 'react-bootstrap';
import storage from 'crib-storage';
import Q from 'q';

var QQ = require('q');
console.log('Q = ',Q);

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
        // let scheduler = [
        //     {id: "EVENT_1", args: {test: 1}, date: "0 * * * * *"},
        //     {id: "EVENT_2", date: "0 0,5,10,15,20,25,30,35,40,45,50,55 * * * *"},
        //     {id: "Hue Work", date: "0 15 8 * * *", event: "Hue Sleep", args: ["Ingvild on 0"]},
        //     {id: "Hue Afternoon", date: "0 18 15 * * *",args: ["Ingvild on 0"]},
        //     {id: "Hue Early Evening", date: "0 0 18 * * *", args: ["Bjarke on 0"]},
        //     {id: "Hue Evening", date: "0 0 20 * * *", args: ["Vidar on 0"]},
        //     {id: "Hue Night", date: "0 0 22 * * *", args: ["Maria on 0"]},
        //     {id: "Hue Late Night", date: "0 30 0 * * *", args: ["Knut on 0"]},
        //     {id: "Hue Sleep", date: "0 15 1 * * *", "event": "Hue Sleep", args: ["All Off"]},
        //     {id: "Hue Morning", date: "0 0 6 * * *", "event": "Hue Morning", args: ["Bjarke on 0"]}
        // ];
        // storage.set('scheduler', scheduler);

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
        storage.get('diag12').then((res) => {
            alert(res);
        });
    }
}


export default Diagnostics;