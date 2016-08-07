import React from 'react';

import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Accordion, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

class Menu extends React.Component{

    render(){
        return (
            <Accordion defaultActiveKey="2">
                <Panel header="Account" eventKey="1">
                    <Link to="/account/">Details</Link>
                    <Link to="/account/">Contact</Link>
                    <Link to="/account/">Security</Link>
                    <Link to="/account/">Preferences</Link>
                </Panel>
                <Panel header="Briefs" eventKey="2">
                    <Link to={`/briefs/create/`}>Create a Brief</Link>
                    <Link to={`/briefs/sample-brief/`}>Inca Trail</Link>
                    <Link to="/">Curve on Tour 1</Link>
                </Panel>
                <Panel header="Messages" eventKey="3">
                    <Link to="/">Hilary</Link>
                    <Link to="/">Nemeth</Link>
                </Panel>
            </Accordion>
        );
    }
}

export default Menu