import styles from './StylesModules/Forms.module.css'
import { useState } from 'react'

import { IoIosPerson } from "react-icons/io";
import { MdAlternateEmail, MdDriveFileRenameOutline, MdOutlineTitle } from "react-icons/md";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import Modal from './Modal';

function Forms() {
    const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
    const [name, setName] = useState('')
    const [assunto, setAssunto] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(null) // { type: 'success' | 'error', title, desc }

    const clearForm = () => {
        setName('');
        setAssunto('');
        setEmail('');
        setMessage('');
    };

    async function sendEmail(e) {
        e.preventDefault();

        if (name === '' || assunto === '' || email === '' || message === '') {
            setModal({
                type: 'error',
                title: 'Campos obrigatórios',
                desc: 'Por favor, preencha todos os campos antes de enviar.'
            });
            return;
        }

        if (!accessKey) {
            setModal({
                type: 'error',
                title: 'Configuração ausente',
                desc: 'A chave de acesso do formulário não está configurada. Verifique o arquivo .env.'
            });
            return;
        }

        setLoading(true);

        const formData = {
            access_key: accessKey,
            name: name,
            email: email,
            subject: assunto,
            message: message
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setModal({
                    type: 'success',
                    title: 'E-mail enviado!',
                    desc: 'Obrigado pelo contato! Responderei assim que possível.'
                });
                clearForm();
            } else {
                console.error("Erro:", data);
                setModal({
                    type: 'error',
                    title: 'Erro ao enviar',
                    desc: 'Não foi possível enviar a mensagem. Tente novamente em alguns instantes.'
                });
            }
        } catch (error) {
            console.error("Erro:", error);
            setModal({
                type: 'error',
                title: 'Erro ao enviar',
                desc: 'Não foi possível enviar a mensagem. Verifique sua conexão e tente novamente.'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={sendEmail}>
                <nav>
                    <label><IoIosPerson />Nome: </label>
                    <input type="text"
                        placeholder='Digite seu nome'
                        onChange={(e) => setName(e.target.value)}
                        value={name} />
                </nav>
                <nav>
                    <label><MdAlternateEmail />E-mail: </label>
                    <input type="email"
                        placeholder='Digite seu e-mail'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} />
                </nav>
                <nav>
                    <label><MdOutlineTitle />Assunto: </label>
                    <input type="text"
                        placeholder='Digite o assunto'
                        onChange={(e) => setAssunto(e.target.value)}
                        value={assunto} />
                </nav>
                <nav>
                    <label><MdDriveFileRenameOutline />Mensagem: </label>
                    <textarea cols="30"
                        rows="10"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}></textarea>
                </nav>
                <input
                    className={styles.btnsubmit}
                    type="submit"
                    value={loading ? "Enviando..." : "Enviar"}
                    disabled={loading}
                />
            </form>

            <Modal
                isOpen={!!modal}
                onClose={() => setModal(null)}
                title={modal?.title}
            >
                <div className={modal?.type === 'success' ? styles.modal_success : styles.modal_error}>
                    {modal?.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                    <p>{modal?.desc}</p>
                    <button onClick={() => setModal(null)} className={styles.modal_btn}>
                        Fechar
                    </button>
                </div>
            </Modal>
        </div>
    )
}
export default Forms

