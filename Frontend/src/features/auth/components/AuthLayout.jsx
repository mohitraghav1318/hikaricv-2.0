import React, { useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import styles from './AuthLayout.module.scss'
import { useAuthLayoutReveal } from '../hooks/useAuthLayoutReveal'

/**
 * Persistent shell for /login and /register.
 * Mounts once when you enter the auth section; the background image,
 * brand mark, and tab bar never unmount when switching between the
 * two routes — only the <Outlet /> content (heading/form) changes.
 */
const AuthLayout = () => {
    const { pathname } = useLocation()
    const isLogin = pathname.startsWith('/login')

    const visualRef = useRef(null)
    const cardRef = useRef(null)

    useAuthLayoutReveal({ visual: visualRef, card: cardRef })

    return (
        <main className={styles.page}>
            <section className={styles.visual} aria-hidden="true" ref={visualRef}>
                <div className={styles.visualContent}>
                    <p className={styles.brand}>HikariCV</p>
                    <h2>Master your career with AI precision.</h2>
                    <p>Build interview plans with real-time AI feedback for your next role.</p>
                </div>
            </section>

            <section className={styles.panel}>
                <div className={styles.card} ref={cardRef}>
                    <div className={styles.tabs}>
                        <Link className={`${styles.tab} ${isLogin ? styles.tabActive : ''}`} to="/login">Login</Link>
                        <Link className={`${styles.tab} ${!isLogin ? styles.tabActive : ''}`} to="/register">Sign Up</Link>
                    </div>

                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default AuthLayout