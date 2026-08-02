import { useRef } from "react";
import styles from "./StylesModules/Home.module.css";
import { FaSquareGithub, FaLinkedin, FaSquareCaretDown  } from "react-icons/fa6";

// Importações do GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar o plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const containerRef = useRef(null);
  const waveRef = useRef(null);

  useGSAP(
    () => {
      //Animacao para o bounce do container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Ativa quando o topo da seção chega a 80% da visão
          toggleActions: "play none none none",
        },
      });
      tl.fromTo(
        "nav",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1.1,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
        },
      ).to("nav", {
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
      });

      // 2. Animação para a mãozinha
      // Ela começa junto com a timeline, mas nunca para
      gsap.to(waveRef.current, {
        rotation: 15, // Ângulo do aceno
        scale: 1.1,
        duration: 0.8,
        repeat: -1, // Loop infinito
        yoyo: true,
        ease: "sine.inOut", // Movimento suave de onda
        transformOrigin: "bottom right", // Rotaciona a partir do pulso
      });
    },
    { scope: containerRef },
  );

  return (
    <div id="Home" ref={containerRef} className={styles.container}>
      <nav>
        <p className={styles.ptop}>
          Olá
          <span
            ref={waveRef}
            style={{
              display: "inline-block",
              margin: "0 10px",
              cursor: "default",
            }}
          >
            👋
          </span>
          me chamo{" "}
          <a
            href="https://github.com/MatheusHAF"
            target="_blank"
            rel="noreferrer"
          >
            Matheus
          </a>
        </p>

        <div className={styles.middle}>
          <p>Software</p>
          <p className={styles.picons}>
            <a
              href="https://github.com/MatheusHAF"
              target="_blank"
              rel="noreferrer"
            >
              <FaSquareGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/matheus-francisco-a5bb1a218/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://docs.google.com/document/d/1RJSIxEub6bAeiM768Ta6_LnWUN5LRiO-JrWx9-7FupU/export?format=pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FaSquareCaretDown  className={styles.idown}/>
            </a>
          </p>
        </div>

        <p className={styles.pbottom}>Developer</p>
      </nav>
    </div>
  );
}

export default Home;
