import styles from './StylesModules/Projetos.module.css'

import { register } from 'swiper/element/bundle';

import { dbcards } from '../data/dbcardsprojects';

import { useState, useEffect } from 'react';

import { CiGlobe } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { SlNote } from "react-icons/sl";

import Modal from './Modal';

import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';


register();
function Projetos() {
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth >= 975) {
                setSlidesPerView(3);
            }
            else if (window.innerWidth >= 650) {
                setSlidesPerView(2);
            }
            else {
                setSlidesPerView(1);
            }
        };

        window.addEventListener('resize', updateSlidesPerView);
        updateSlidesPerView();

        return () => {
            window.removeEventListener('resize', updateSlidesPerView);
        };
    }, []);

    const openModal = (item) => {
        setSelectedProject(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <div id='projects' className={styles.container}>
            <h1>Projetos</h1>
            <swiper-container
                slides-per-view={`${slidesPerView}`}
                navigation={true}
            >
                {dbcards.map((item, index) => (
                    <swiper-slide key={index}>
                        <div className={styles.card}>
                            <img src={item.image} alt={`${item.title}`} />
                            <div>
                                <h2>{item.title}</h2>
                                <p>{item.tags.join(' • ')}</p>
                                <div className={styles.div_links}>
                                    <a
                                        href={item.link || "#"}
                                        target={item.link ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className={`${styles.btn} ${!item.link ? styles.btn_disabled : ""}`}
                                        onClick={(e) => {
                                            if (!item.link) e.preventDefault();
                                        }}
                                        aria-disabled={!item.link}
                                    >
                                        <CiGlobe />
                                        <span className={styles.btn_text}>Visualizar</span>
                                    </a>

                                    <a
                                        href={item.github || "#"}
                                        target={item.github ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className={`${styles.btn} ${!item.github ? styles.btn_disabled : ""}`}
                                        onClick={(e) => {
                                            if (!item.github) e.preventDefault();
                                        }}
                                        aria-disabled={!item.github}
                                    >
                                        <FaGithub />
                                        <span className={styles.btn_text}>GitHub</span>
                                    </a>

                                    <button
                                        onClick={() => openModal(item)}
                                        className={styles.btn}
                                    >
                                        <SlNote />
                                        <span className={styles.btn_text}>Detalhes</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                ))}
            </swiper-container>

            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                title={selectedProject?.title}
            >
                {selectedProject && (
                    <>
                        <p className={styles.modal_desc}>{selectedProject.desc}</p>
                        <p className={styles.modal_techs}>{selectedProject.techs}</p>
                    </>
                )}
            </Modal>
        </div>
    );
}
export default Projetos

