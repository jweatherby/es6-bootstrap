import React from 'react';
import {connect} from 'react-redux';
import {
    Button, Modal
} from 'react-bootstrap';
import {FieldGroup, slugify} from '../../utils';
import store from '../../store';
import bows from 'bows';

const logger = bows('briefs.create');

const mapStateToProps = (state, props) => ({
    briefs: state.briefs
})

const mapDispatchToProps = (dispatch) => ({
    addBrief: (brief) => dispatch({
        type: 'CREATE_BRIEF', brief
    })
})


class CreateBrief extends React.Component {

    constructor(props){
        super(props);
        this.numBriefs = props.briefs.length
    }

    componentDidUpdate(){
        if(this.props.briefs.length != this.numBriefs){
            this.numBriefs = this.props.briefs.length;
            this.props.onHide();
        }
    }

    handleAddBrief(){
        let brief = {
            title: this.refs.title.value,
            emails: this.refs.emails.value,
            slug: slugify(this.refs.title.value)
        }
        this.props.addBrief(brief)
    }

    render(){
        return (
            <Modal {...this.props}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a Brief</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FieldGroup
                        id="briefTitle"
                        label="The name of your brief"
                    ><input className={'form-control'} ref='title'
                        placeholder='The name of your brief'/>
                    </FieldGroup>
                    <FieldGroup
                        id="briefUsers"
                        label="Enter email addresses here"
                    ><textarea className={'form-control'} ref='emails'
                        placeholder='Comma separated email addresses'/>
                    </FieldGroup>
                    <div className={'clearfix'}>
                        <Button
                            bsStyle={'success'}
                            className={'pull-right'}
                            onClick={this.handleAddBrief.bind(this)}
                        >Create</Button>
                    </div>
                </Modal.Body>
            </Modal>);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateBrief);
