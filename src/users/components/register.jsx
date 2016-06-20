import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import styles from '../../styles';

const mapStateToProps = (state) => ({
    errorMsg: state.users.errors.register,
    successMsg: state.users.msgs.register
})

const mapDispatchToProps = (dispatch) => ({
    onRegisterClick: (username, password) => dispatch({
        type: 'REGISTER', username, password
    })
})

class Register extends React.Component{
    render(){
        return (
            <div>
                <h2>Register</h2>
                <p>
                    <input ref="username" placeholder="Username"/>
                </p>
                <p>
                    <input ref="password" type="password" placeholder="Password"/>
                </p>
                <button onClick={() => this.props.onRegisterClick(
                    this.refs.username.value,
                    this.refs.password.value
                )}>
                    Register
                </button>
                <p>{this.props.successMsg}</p>
                <p>{this.props.errorMsg}</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
