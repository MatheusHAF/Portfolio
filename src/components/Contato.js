import styles from "./StylesModules/Contato.module.css";
import Forms from "./Forms";
import { useState } from "react";

import { FaSquareGithub, FaLinkedin } from "react-icons/fa6";
import { IoMdMail, IoMdCloudDownload } from "react-icons/io";

import { FaInstagramSquare } from "react-icons/fa";

function Contato() {
  const [copiado, setCopiado] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("matheushenrique612@gmail.com");
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar e-mail:", err);
    }
  };

  return (
    <div id="contacts" className={styles.container}>
      <h1>Entre em contato comigo!</h1>
      <div className={styles.divs}>
        <div className={styles.left}>
          <h2>Minhas redes</h2>
          <nav>
            <div
              className={styles.copyNav}
              role="button"
              tabIndex={0}
              onClick={copyEmail}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  copyEmail();
                }
              }}
            >
              <IoMdMail />
              <span>
                <p>E-mail</p>
                <p className={styles.secondp}>
                  {copiado ? "Copiado!" : "matheushenrique612@gmail.com"}
                </p>
              </span>
            </div>
          </nav>
          <nav>
            <a
              href="https://www.linkedin.com/in/matheus-francisco-a5bb1a218/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
              <span>
                <p>Linkedin</p>
                <p className={styles.secondp}>@matheus-francisco-a5bb1a218</p>
              </span>
            </a>
          </nav>
          <nav>
            <a
              href="https://github.com/MatheusHAF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareGithub />
              <span>
                <p>Github</p>
                <p className={styles.secondp}>@MatheusHAF</p>
              </span>
            </a>
          </nav>
          <nav>
            <a
              href="https://www.instagram.com/suec.mh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagramSquare />
              <span>
                <p>Instagram</p>
                <p className={styles.secondp}>@suec.mh</p>
              </span>
            </a>
          </nav>
          <nav>
            <a
              href="https://docs.google.com/document/d/1RJSIxEub6bAeiM768Ta6_LnWUN5LRiO-JrWx9-7FupU/export?format=pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn_download}
            >
              <IoMdCloudDownload />
              Baixar Currículo (PDF)
            </a>
          </nav>
        </div>
        <div className={styles.right}>
          <Forms />
        </div>
      </div>
    </div>
  );
}

export default Contato;
