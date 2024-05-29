import React from 'react';
import Head from 'next/head';
import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                />
            </Head>
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <div className={styles.footerColumn}>
                        <h3>Platform</h3>
                        <ul>
                            <li>Finetune</li>
                            <li>Explore</li>
                            <li>Orchestrate</li>
                            <li>WForce</li>
                            <li>Project Management</li>
                            <li>Integrations & Security</li>
                            <li>LLM Annotation Tool</li>
                            <li>Image Annotation Tool</li>
                            <li>Video Annotation Tool</li>
                            <li>Text Annotation Tool</li>
                            <li>Audio Annotation Tool</li>
                            <li>Classification Tool</li>
                        </ul>
                    </div>
                    <div className={styles.footerColumn}>
                        <h3>Solutions</h3>
                        <ul>
                            <li>Agriculture</li>
                            <li>Healthcare</li>
                            <li>Insurance</li>
                            <li>Sports</li>
                            <li>Autonomous Driving</li>
                            <li>Robotics</li>
                            <li>Aerial Imagery</li>
                            <li>NLP and Document Processing</li>
                            <li>Security and Surveillance</li>
                        </ul>
                    </div>
                    <div className={styles.footerColumn}>
                        <h3>Resources</h3>
                        <ul>
                            <li>Blog</li>
                            <li>Podcast</li>
                            <li>Webinar</li>
                            <li>Documentation</li>
                            <li>What's New</li>
                            <li>Python SDK</li>
                            <li>Support</li>
                        </ul>
                    </div>
                    <div className={styles.footerColumn}>
                        <h3>Company</h3>
                        <ul>
                            <li>Pricing</li>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Press</li>
                            <li>Privacy Policy</li>
                            <li>Cookie Policy</li>
                        </ul>
                    </div>
                    <div className={`${styles.footerColumn} ${styles.followUs}`}>
                        <h3>Follow us</h3>
                        <ul className={styles.socialMedia}>
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
