import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@observer
class Default extends Component {
    render() {
        return (<div className="container-fluid" role="main">
            <div className="row">
                <div className="col-md-5"></div>
                <div className="col-md-2">
                    <button onClick={this.onReset}>
                        Seconds passed... {this.props.appState.timer}
                    </button>
                </div>
                <div className="col-md-5"></div>
            </div>
        </div>);
    }

    onReset = () => {
        this.props.appState.resetTimer();
        this.props.appState.setPage('schedule');
    }
}

export default Default;