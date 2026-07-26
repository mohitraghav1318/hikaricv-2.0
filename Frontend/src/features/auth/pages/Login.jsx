import React, { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import styles from './Login.module.scss'
import { useAuth } from '../hooks/useAuth'
import { useAuthFormReveal } from '../hooks/useAuthFormReveal'
import Loading from '../../../components/Loading'


const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const headingRef = useRef(null)
    const submitRef = useRef(null)
    const fieldRefs = useRef([])
    fieldRefs.current = []
    const registerField = (el) => {
        if (el) fieldRefs.current.push(el)
    }

    useAuthFormReveal({
        heading: headingRef,
        fields: fieldRefs,
        submit: submitRef,
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/dashboard')
    }

    if(loading){
        return (
            <Loading />
        )
    }


    return (
        <>
            <div className={styles.heading} ref={headingRef}>
                <h1>Welcome back</h1>
                <p>Enter your credentials to access your dashboard.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup} ref={registerField}>
                    <label htmlFor="email">Email Address</label>
                    <div className={styles.inputShell}>
                        <Mail size={17} strokeWidth={2} />
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='name@company.com' />
                    </div>
                </div>
                <div className={styles.inputGroup} ref={registerField}>
                    <div className={styles.labelRow}>
                        <label htmlFor="password">Password</label>
                        <Link to={"/forgot-password"}>Forgot?</Link>
                    </div>
                    <div className={styles.inputShell}>
                        <Lock size={17} strokeWidth={2} />
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter password' />
                    </div>
                </div>
                <button className={styles.submit} ref={submitRef}>
                    Login to Dashboard
                    <ArrowRight size={18} strokeWidth={2.4} />
                </button>
            </form>

            <p className={styles.switch}>Don't have an account? <Link to={"/register"}>Create an account</Link></p>
        </>
    )
}

export default Login