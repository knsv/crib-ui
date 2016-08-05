import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {FormGroup, InputGroup, FormControl, Button, Table} from 'react-bootstrap';
import storage from 'crib-storage';
import EditSchedule from '../components/EditSchedule.jsx';
import Q from 'q';

@observer
class Schedule extends Component {
    componentWillMount() {
        this.buss = this.props.appState.getBuss();
        this.events = 'Events received!\n';
        let self = this;

        storage.init(this.buss);
        storage.get('scheduler').then((schedule)=>{
            self.props.appState.setSchedule(schedule);
        });
        this.props.appState.schedulePage.modalVisisble = false;
    }

    render() {
        const eventsCode = [];
        const sched = this.props.appState.getSchedule()
        for (let i = 0; i < sched.length; i++) {
            const trigger = sched[i];
            eventsCode.push(
                (
                    <tr key={i}>
                        <td>{trigger.id}</td>
                        <td>{trigger.date}</td>
                        <td>{trigger.event}</td>
                        <td>{JSON.stringify(trigger.args)}</td>
                        <td><a href="#" onClick={()=>{this.edit(trigger.id)}}>edit</a></td>
                    </tr>
                )
            );
        }

        const tableInstance = (
            <Table responsive>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Schedule</th>
                    <th>Event ID</th>
                    <th>Args</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {eventsCode}
                </tbody>
            </Table>
        );
        //

        return (<div className="container-fluid" role="main">
            <EditSchedule show={this.props.appState.schedule.modalVisisble} appState={this.props.appState}/>
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

    edit = (num) => {
        console.log('editing ',num);
        this.props.appState.schedulePage.modalVisisble = true;
        console.log('dialog state set to visible ',num);
    }
}

export default Schedule;