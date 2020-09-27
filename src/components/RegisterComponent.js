import React, { Component } from 'react'
import '../styles/Login.css';
import UserService from '../service/UserService';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import { isEmail } from "validator";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Value in this field is required!
            </div>
        )
    }
}

const vname = value => {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Error in user name entering. It should be bigger than 2 and less than 30 symbols!
            </div>
        )
    }
}

const vsurname = value => {
    if (value.length < 2 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                  Error in user surname entering. It should be bigger than 2 and less than 30 symbols!
            </div>
        )
    }
}

const vlogin = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Email entering error!
            </div>
        )
    }
}

const vpassword = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                  Error in user password entering. It should be bigger than 2 and less than 20 symbols!
            </div>
        )
    }
}
class RegisterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            surname: '',
            login: '',
            password: '',
            successfull: false,
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeSurname = this.onChangeSurname.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.registerClicked = this.registerClicked.bind(this)
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeSurname(e) {
        this.setState({
            surname: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            login: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(values) {
        let user = {
            name: values.name,
            surname: values.surname,
            login: values.login,
            password: values.password
        }
        this.registerClicked(user)
    }

    registerClicked(e) {
        e.preventDefault()
        this.setState({
            message: "",
            successfull: false
        })

        this.form.validateAll()

        let user = {
            name: this.state.name,
            surname: this.state.surname,
            login: this.state.login,
            password: this.state.password
        }
        if (this.checkBtn.context._errors.length === 0) {
            UserService.register(user).then(response => {
                this.setState({
                    message: response.data.message,
                    successfull: true
                });
                this.props.history.push(`/`)
            },
                error => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString();
                    this.setState({
                        successfull: false,
                        message: resMessage
                    });
                }
            )
        }
    }

    render() {
        return (

            <body>
                <div id="background">
                </div>
                <div className="body-content" >

                    <div className="page-login">

                        <div className="page-content">

                            <div className="panel-default">


                                <div className="tab-front">
                                    <div class="col-md-12">
                                        <img src="https://s3.amazonaws.com/gt7sp-prod/decal/52/21/54/6278668868833542152_1.png" style={{height: 300}}/>
                                    </div>
                                    <div className="hidden-before-binding" style={{ marginTop: -10 }}>
                                        <div style={{fontSize:20,color:"gold"}}>
                                            SignUp into the system
                                        </div>
                                        <Form
                                            onSubmit={this.registerClicked}
                                            ref={c => {
                                                this.form = c;
                                            }}
                                        >
                                            {!this.state.successfull && (
                                                <div>
                                                    <div className="form-group">

                                                        <Input type="text" className="form-control" placeholder="Enter name"
                                                            name="name" value={this.state.name} onChange={this.onChangeName}
                                                            validations={[required, vname]} style={{fontSize:14}}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <Input type="text" className="form-control" placeholder="Enter surname"
                                                            name="surname" value={this.state.surname} onChange={this.onChangeSurname}
                                                            validations={[required, vsurname]} style={{fontSize:14}}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <Input type="text" className="form-control" placeholder="Enter login"
                                                            name="login" value={this.state.login} onChange={this.onChangeEmail}
                                                            validations={[required, vlogin]} style={{fontSize:14}}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <Input type="password" className="form-control" placeholder="Enter password"
                                                            name="password" value={this.state.password} onChange={this.onChangePassword}
                                                            validations={[required, vpassword]} style={{fontSize:14}}/>
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-success"><span>Enter</span></button>
                                                    </div>

                                                </div>
                                            )}
                                            {this.state.message && (
                                                <div className="form-group">
                                                    <div className={
                                                        this.state.successfull ?
                                                            "alert alert-success" :
                                                            "alert alert-danger"
                                                    }
                                                        role="alert"
                                                    >
                                                        {this.state.message}
                                                    </div>
                                                </div>
                                            )}
                                            <CheckButton style={{ display: "none" }} ref={c => {
                                                this.checkBtn = c;
                                            }} />

                                        </Form>
                                            )
                                        }
                                <a id="password-lost" class="link-primary" href="/" data-bind="click: togglePanel">You already have account?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </body>
        )

    }
}
export default RegisterComponent