import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import { LoginService } from '../../services/LoginService'
import Widget from '../../components/Widget'
import { NotificacaoContext } from '../../context/NotificacaoContext'

import './loginPage.css'

const InputFormField = ({id, label, type, errors, values, onChange }) => {
    return (
        <div className="loginPage__inputWrap">
            <label className="loginPage__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="loginPage__input"
                type={type}
                id={id}
                name={id}
                value={values[id]}
                onChange={onChange}
            />

            <p style={{color: "red"}}>{errors[id]}</p>
        </div>
    );
};

class LoginPage extends Component {
    static contextType = NotificacaoContext;

    constructor(){
        super()
        this.state = {
            values: {
                inputLogin: "",
                inputSenha: ""
            },
            errors: {}
        }
    }

    onFormFieldChange = ({target}) => {
        const value = target.value;
        const name = target.name;
        const values = { ...this.state.values, [name]:value }
        this.setState({values}, () => {
            this.formValidations();
        })
    }

    formValidations = () => {
        const { inputLogin, inputSenha } = this.state.values
        const errors = {}

        if(!inputLogin) errors.inputLogin = "Esse campo é obrigatório"
        if(!inputSenha) errors.inputSenha = "Esse campo é obrigatório"

        this.setState({errors})
    };
    
    fazLogin = (evento) => {
        evento.preventDefault()

        const dadosDeLogin = {
            login: this.state.values.inputLogin,
            senha: this.state.values.inputSenha
        }

        LoginService.fazerLogin(dadosDeLogin)
        .then(() => {
            this.props.history.push('/')
            this.context.setMsg("Bem vindo a Twitelum!!!");
        })
        .catch( (err) =>{
            console.error(`Erro ${err.status}.`,err.message)
            this.context.setMsg(err.message);
        })
    }

    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" action="/"
                                onSubmit={this.fazLogin}>
                                <InputFormField
                                    id="inputLogin"
                                    label="Login: "
                                    type="text"
                                    onChange={this.onFormFieldChange}
                                    values={this.state.values}
                                    errors={this.state.errors}
                                    />
                                
                                <InputFormField
                                    id="inputSenha"
                                    label="Senha: "
                                    type="password"
                                    onChange={this.onFormFieldChange}
                                    values={this.state.values}
                                    errors={this.state.errors}
                                    />
                                {/* <div className="loginPage__errorBox">
                                    Mensagem de erro!
                                </div> */}
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default LoginPage