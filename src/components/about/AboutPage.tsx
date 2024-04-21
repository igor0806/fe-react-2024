import AboutImage from '@/assets/About_image.svg';

import styles from './AboutPage.module.css';

function About() {
    return (
        <>
            <main>
                <section>
                    <div className={styles.introFlex}>
                        <div className={styles.introText}>
                            <h1 className={styles.aboutTitle}>About Me</h1>
                            <img className={styles.aboutImage} src={AboutImage} alt="about" />
                            <p>
                                Hi! My name is [Name] and I&apos;m a Junior Frontend Developer. I am already familiar with main Web
                                Technologies like React, HTML, CSS, JavaScript and Git version control system. This page was developed
                                during the course{' '}
                                <a className={styles.link} href="https://www.mastersacademy.education/frontend-react-it">
                                    &apos;Intro to React&apos;
                                </a>{' '}
                                from Masters Academy in 2024. This is a social project from MOCG company where I got an opportunity to work
                                with Frontend mentors and to create my own small project for the portfolio. You can contact me via [social
                                network name] and check out my GitHub.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default About;
