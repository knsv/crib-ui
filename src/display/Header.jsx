import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@observer
class Header extends Component {
    render() {
        const currentPage = this.props.appState.getPage()
        const checkActive = (pageId) => {
            if(pageId === currentPage){
                console.log('Is active Active');
                return 'active';
            }

            return 'inactive';
        };


        return (<nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">Bootstrap theme</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className={checkActive('default')}><a href="#" onClick={this.setDefault}>Home</a></li>
                        <li className={checkActive('about')}><a href="#about">About</a></li>
                        <li className={checkActive('diagnostics')}><a href="#contact" onClick={this.setDiagnostics}>Diagnostics</a></li>
                    </ul>
                </div>
            </div>
        </nav>);
    }

    setDiagnostics = () => {
        this.props.appState.setPage('diagnostics');
    };

    setDefault = () => {
        this.props.appState.setPage('default');
    }
}



export default Header;