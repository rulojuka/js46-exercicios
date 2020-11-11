import React, { Component, Fragment } from 'react'
import Cabecalho from '../../components/Cabecalho'
import { LoginService } from '../../services/LoginService'
import Widget from '../../components/Widget'
import { NotificacaoContext } from '../../context/NotificacaoContext'

import './loginPage.css'

// 1 - refatorar: extrair o código dos inputs para um componente
// 2 - Remover o ref e colocar as informações no estado do componente (controlled components)
// 3 - Adicionar uma função de onChange que valida as informações
// 4 - Mostrar os erros na tela

const InputFormField = ({ type, title, id, values, onChange, errors }) => {
    return (

        <div className="loginPage__inputWrap">
            <label className="loginPage__label" htmlFor={id}>{title}</label>
            <input className="loginPage__input" onChange={onChange} value={values[id]} type={type} id={id} name={id} />
                <p> {errors[id]}</p>
        </div>

    )
}

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
    //estado

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
            .catch((err) => {
                console.error(`Erro ${err.status}.`, err.message)
                this.context.setMsg(err.message);
            })
    }

    formValidations = () =>{
        const {inputLogin, inputSenha} = this.state.values;
        const errors = {}

        if (!inputLogin) {
            errors.inputLogin = "Insira seu login!"
        }

        if (!inputSenha) {
            errors.inputSenha = "Insira sua senha!"
        }

        
        this.setState({errors})
        
    }

    onFormFieldChange = ({target}) => {

        
        const value = target.value
        const name = target.name
        
        const values = {
            ...this.state.values,
            [name]:value
        }
        
        this.setState( {values}, () => {this.formValidations()} )
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

                                <InputFormField type="text" title="Login:" id="inputLogin"
                                    values={this.state.values}
                                    onChange={this.onFormFieldChange}
                                     errors={this.state.errors}
                                />


                                <InputFormField type="password" title="Senha:" id="inputSenha" 
                                    values={this.state.values}
                                    onChange={this.onFormFieldChange}
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