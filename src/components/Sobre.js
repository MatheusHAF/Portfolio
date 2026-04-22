import { useEffect, useRef } from "react";
import gsap from "gsap";

import styles from './StylesModules/Sobre.module.css';

import { FaGithub,FaPython,FaReact,FaGitAlt,FaJava,FaHtml5,FaCss3Alt,FaNodeJs } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiC,SiGreensock } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";

function Sobre() {
    const techRef = useRef(null);
    const lastIndexes = useRef([]);

    useEffect(() => {
        if (!techRef.current) return;

        const items = Array.from(techRef.current.querySelectorAll("nav"));
        const COLS = 6;

        function getNeighbors(index) {
            return [
                index,
                index - 1,
                index + 1,
                index - COLS,
                index + COLS
            ];
        }

        function animateRandom() {
            items.forEach(item => item.classList.remove(styles.isActive));

            const forbidden = new Set(lastIndexes.current.flatMap(getNeighbors));
            const available = items
                .map((_, i) => i)
                .filter(i => !forbidden.has(i));

            // fallback se ficar muito restrito
            const pool = available.length >= 2
                ? available
                : items.map((_, i) => i);

            const selectedIndexes = [];
            while (selectedIndexes.length < 2) {
                const rand = pool[Math.floor(Math.random() * pool.length)];
                if (!selectedIndexes.includes(rand)) {
                    selectedIndexes.push(rand);
                }
            }

            lastIndexes.current = selectedIndexes;

            selectedIndexes.forEach(index => {
                const item = items[index];
                item.classList.add(styles.isActive);

                gsap.fromTo(
                    item,
                    { },
                    {

                        duration: 0.6,
                        yoyo: true,
                        repeat: 1,
                    }
                );
            });
        }

        animateRandom();
        const interval = setInterval(animateRandom, 1800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="about" className={styles.container}>
            <nav>
                <h1>Um pouco sobre mim</h1>
                <p>
                    Olá! Me chamo Matheus, tenho 25 anos e sou técnico em Informática, formado pelo IFSP (2016–2019), onde descobri minha paixão por programação.
                     Atualmente, curso Engenharia da Computação na Unicamp, onde também colaboro em um projeto de extensão sobre autogestão e cooperativas populares.
                     Além disso, realizo freelances e me dedico a projetos pessoais, sempre buscando aprimorar minhas habilidades e explorar novas tecnologias.
                </p>
            </nav>

            <nav>
                <h2>Habilidades</h2>

                <div ref={techRef} className={styles.tech}>
                    <nav><FaPython /><p>Python</p></nav>
                    <nav><FaGitAlt /><p>Git</p></nav>
                    <nav><FaReact /><p>React</p></nav>
                    <nav><FaJava /><p>Java</p></nav>
                    <nav><IoLogoJavascript /><p>JavaScript</p></nav>
                    <nav><FaGithub /><p>Github</p></nav>

                    <nav><FaHtml5 /><p>HTML5</p></nav>
                    <nav><FaCss3Alt /><p>CSS3</p></nav>
                    <nav><SiC /><p>Linguagem C</p></nav>
                    <nav><FaNodeJs /><p>NodeJS</p></nav>
                    <nav><SiGreensock /><p>GSAP</p></nav>
                    <nav><SiPostgresql/><p>PostgreSQL</p></nav>
                </div>
            </nav>
        </div>
    );
}

export default Sobre;
