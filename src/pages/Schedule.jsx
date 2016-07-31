import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@observer
class Schedule extends Component {
    render() {
        return (<div className="container-fluid" role="main">
            <div className="row">
                <div className="col-md-5"></div>
                <div className="col-md-2">
                   Schedule
                </div>
                <div className="col-md-5"></div>
            </div>
        </div>);
    }
}

export default Schedule;