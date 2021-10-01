import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

export default function Perfil() {
    return (
        <div id="app" className="has-aside-left has-aside-mobile-transition has-navbar-fixed-top has-aside-expanded">
            <Sidebar />
            <Navbar />

            {/* Content */}
            <section className="section is-main-section">
                <div className="tile is-ancestor">
                    <div className="tile is-parent">
                        <div className="card tile is-child">
                            <header className="card-header">
                                <p className="card-header-title">
                                    <span className="icon"><i className="mdi mdi-account default"></i></span> Perfil
                                </p>
                            </header>
                            <div className="card-content">
                                <div className="is-user-avatar image has-max-width is-aligned-center">
                                    <img src="https://avatars.dicebear.com/v2/initials/marcos-ferreira.svg" alt="Marcos Ferreira" />
                                </div>

                                <form method="get" action="#">
                                    <div className="field">
                                        <label className="label">Nome</label>
                                        <div className="control">
                                            <input className="input" type="text" defaultValue="Marcos Ferreira" required />
                                        </div>
                                        <span className="help"><span style={{ color: 'red' }}>*</span> campo obrigatório</span>
                                    </div>
                                    <div className="field">
                                        <label className="label">E-mail</label>
                                        <div className="control">
                                            <input className="input" type="text" defaultValue="marcos.ferreira@gov.br" required />
                                        </div>
                                        <span className="help"><span style={{ color: 'red' }}>*</span> campo obrigatório</span>
                                    </div>
                                    <button type="submit" className="button is-primary">Salvar alterações</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="tile is-parent">
                        <div className="card tile is-child">
                            <header className="card-header">
                                <p className="card-header-title">
                                    <span className="icon"><i className="mdi mdi-lock default"></i></span> Alterar senha
                                </p>
                            </header>
                            <div className="card-content">
                                <form>
                                    <div className="field">
                                        <label className="label">Senha Atual <span style={{ color: 'red' }}>*</span></label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Insira o título" required />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="field">
                                        <label className="label">Nova senha <span style={{ color: 'red' }}>*</span></label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Nova senha" required />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="field">
                                        <label className="label">Confirme a senha <span style={{ color: 'red' }}>*</span></label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Confirme a senha" required />
                                        </div>
                                    </div>
                                    <br />
                                    <button type="submit" className="button is-primary">Salvar alterações</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
