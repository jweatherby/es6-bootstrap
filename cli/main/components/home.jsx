import React from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Col} from 'react-bootstrap';

import Menu from './menu';
import TopNav from './topnav';
import Footer from './footer';

import main from '../css/layout.scss';
import utils from '../css/utils.scss';


class Home extends React.Component {
    render() {
        return (
            <div className="container-full">
                <header className={'app-pane header'}>
                    <TopNav/>
                </header>
                <nav className={'app-pane menu-left'}>
                    <Menu />
                </nav>
                <div className={"app-pane main"}>
                    {this.props.children}
                </div>
                <footer className={"app-pane footer"}>
                    <Footer/>
                </footer>
            </div>
        );
    }
}

export default connect()(Home);
