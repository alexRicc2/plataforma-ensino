import React from 'react';
import { URL } from '../variables';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/AppActions';
import Logo from '../assets/images/RTLogo.jpeg';
import BG from '../assets/images/.png';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            msgErro: '',
            email: '',
            password: '',
            redirect: false,
            path: '',
            loading_save:false
        }

    }

    login(event) {
        event.preventDefault();
        this.setState({loading_save:true,msgErro:""});
        fetch(`${URL}api/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                // 'Authorization': `Bearer ${this.props.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(async (responseLog) => {
            try {
                let resp = await responseLog.json();
                console.log(resp);
                if (resp.errors != null || resp.error != null) {
                    let errors = Object.values(resp.errors);
                    let erro = '';
                    for (let i = 0; i < errors.length; i++) {
                        if (i != errors.length - 1)
                            erro += errors[i] + '\n';
                        else
                            erro += errors[i];
                    }
                    console.log(erro);

                    this.setState({ loading: false, msgErro: erro, refresh: false, loadingMore: false,loading_save:false });
                }
                else {
                    this.setState({loading_save:false});
                    
                    localStorage.setItem('token', resp.access_token);
                    localStorage.setItem('user', JSON.stringify(resp.user));
                    this.props.login({ token: resp.access_token, user:resp.user });
                }
            } catch (err) {
                console.log(err);
                this.setState({ loading: false, msgErro: 'Erro ao pegar resposta do servidor', refresh: false, loadingMore: false,loading_save:false });
            }

        })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false, msgErro: 'Erro ao pegar resposta do servidor. Você está conectado a internet?', refresh: false, loadingMore: false,loading_save:false });
            });
    }


    componentDidMount() {
        const { match: { params } } = this.props;
    }

    changeEmail(event) {
        let text = event.target.value
        let final_num = '';
        final_num = text;
        this.setState({ email: final_num })
    }

    changePassword(event) {
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <div style={{ height: '100vh' }}>
                {this.state.redirect == true && <Redirect to={this.state.path} />}
                {this.state.loading && <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <div className="spinner-border text-primary" role="status"  >
                </div></div>}
                {!this.state.loading && <div className="row" style={{ backgroundColor: 'white', margin: 0 }}>

                    <div className="col-md-12 col-sm-12 col-12 col-lg-12 col-xl-12 d-block" style={{ overflow: 'hidden', backgroundImage: `url(${BG})`, backgroundSize: 'cover', padding: 0, margin: 0, height: '100vh' }}>
                        <div className="row" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="col-md-6 col-12 col-sm-12 col-lg-4 col-xl-4" style={{ margin: 0, padding: 0 }}>
                                <div className="card" style={{ margin: 0, maxWidth: 400 }}>
                                    <div className="card-body" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>


                                        <div className="text-center">
                                            <a className="logo"><img src={Logo}
                                                height="80" alt="logo" /></a>
                                        </div>

                                        <div style={{ padding: '1rem', paddingBottom: 0 }}>
                                            <h4 className="font-18 m-b-5 text-center header-title">Bem vindo !</h4>
                                            <p className="text-muted text-center" >Faça login para continuar.</p>

                                            <form className="form-horizontal m-t-30" onSubmit={this.login.bind(this)}>

                                                <div className="form-group row">
                                                    <label className="col-sm-12 col-form-label" style={{ paddingLeft: 0, paddingRight: 0 }}>E-mail <b style={{ color: 'red' }}>*</b></label>

                                                    <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                        <input id="email" type="username"
                                                            className="form-control  " name="email"
                                                            value={this.state.email} onChange={this.changeEmail.bind(this)} required autoComplete="email" autoFocus />

                                                    </div>

                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-12 col-form-label" style={{ paddingLeft: 0, paddingRight: 0 }}>Senha <b style={{ color: 'red' }}>*</b></label>

                                                    <div className="col-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                        <input id="password" type="password"
                                                            value={this.state.password}
                                                            onChange={this.changePassword.bind(this)}
                                                            className="form-control" name="password"
                                                            required autoComplete="current-password" />



                                                    </div>

                                                </div>

                                                <div className="form-group row ">
                                                    <div className="col-sm-12" style={{ padding: 0 }}>
                                                        <span className="invalid-feedback" style={{ display: 'flex', justifyContent: 'center' }} role="alert">
                                                            <strong style={{ textAlign: 'center', fontSize: '0.8rem' }}>{this.state.msgErro}</strong>
                                                        </span>
                                                    </div>
                                                    {this.state.loading_save==false && <div className="col-sm-12 text-right" style={{ padding: 0 }}>
                                                        <button className="btn btn-primary w-md waves-effect waves-light" style={{ width: '100%', marginTop: '15px', height: '3rem', }} type="submit">Entrar</button>

                                                    </div>}
                                                    {this.state.loading_save==true && <div className="col-12 d-flex justify-content-center align-items-center" style={{ marginTop: '2rem' }}>
                                                        <div className="spinner-border text-primary" role="status"  >
                                                        </div>
                                                    </div>}
                                                </div>


                                                <div className="form-group m-t-10 mb-0 row">
                                                    <div className="col-12 m-t-20" style={{ textAlign: 'center' }}>

                                                        {/* <a href="{{ action('Auth\ForgotPasswordController@showLinkRequestForm',$faculdade->slug) }}">
                                            <i className="mdi mdi-lock"></i>{{ __('Esqueceu sua senha?') }}
                                        </a>  */}
                                                        {/* {this.state.faculdade == null && <a href="{{ action('Auth\ForgotPasswordController@showLinkRequestForm','admin') }}">
                                                    <i className="mdi mdi-lock"></i>Esqueceu sua senha?
                                        </a>} */}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="text-center mt-4">
                                            <p>© 2021  ITEC Mais </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>}
            </div>
        );
    }


}

const mapsStateToProps = (state) => (
    {
    }
);

export default connect(mapsStateToProps, { login })(Login);
