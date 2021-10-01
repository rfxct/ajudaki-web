import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

export default function NovoTicket() {
    return (
        <div id="app" className="has-aside-left has-aside-mobile-transition has-navbar-fixed-top has-aside-expanded">
            <Sidebar />
            <Navbar />

            {/* Content */}
            <section className="section is-main-section">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-help-circle default"></i></span> Enviar Ticket
                        </p>
                    </header>

                    <div className="card-content">
                        <form method="get" action="#">
                            <div className="field">
                                <label className="label">Título <span style={{ color: 'red' }}>*</span></label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Insira o título" required />
                                </div>
                                <span className="help"><span style={{ color: 'red' }}>*</span> campo obrigatório</span>
                            </div>

                            <div className="field">
                                <label className="label">Descrição <span style={{ color: 'red' }}>*</span></label>
                                <div className="control">
                                    <textarea className="textarea" placeholder="Descreva melhor o seu problema" required></textarea>
                                </div>
                                <span className="help"><span style={{ color: 'red' }}>*</span> campo obrigatório</span>
                            </div>

                            <div className="field">
                                <label className="label">Anexos</label>
                                <div className="field file">
                                    <label className="upload control">
                                        <a className="button is-dark">
                                            <span className="icon"><i className="mdi mdi-upload default"></i></span>
                                            <span>Escolher arquivos</span>
                                        </a>
                                        <input type="file" />
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="button is-primary">Enviar</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
