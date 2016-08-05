import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Header from './display/Header';
import Default from './pages/Default';
import Schedule from './pages/Schedule';
import Diagnostics from './pages/Diagnostics';
import DevTools from 'mobx-react-devtools';

@observer
class App extends Component {
    render() {

        let page;
        switch (this.props.appState.pageId) {
            case 'schedule':
                page = (<Schedule  appState={this.props.appState}/>);

            case 'diagnostics':
                page = (<Diagnostics  appState={this.props.appState}/>);
                break;
            default:
                page = (<Default appState={this.props.appState}/>);
        }
        page = (<Schedule  appState={this.props.appState}/>);
        if (process.env.NODE_ENV !== 'production') {
            return (
                <div>
                    <Header appState={this.props.appState}/>
                    {page}
                    <DevTools />
                </div>
            );
        }else{
            return (
                <div>
                    <Header appState={this.props.appState}/>
                    {page}
                </div>
            );
        }
    }
};

export default App;
