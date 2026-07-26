import React, { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import styles from './Register.module.scss'
import { useAuth } from '../hooks/useAuth'
import { useAuthFormReveal } from '../hooks/useAuthFormReveal'
import Loading from '../../../components/Loading'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()

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
        await handleRegister({username,email,password})
        navigate("/dashboard")
    }

    if(loading){
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className={styles.heading} ref={headingRef}>
                <h1>Create account</h1>
                <p>Start building interview plans tailored to your next role.</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>

                <div className={styles.inputGroup} ref={registerField}>
                    <label htmlFor="username">Username</label>
                    <div className={styles.inputShell}>
                        <User size={17} strokeWidth={2} />
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Enter username' />
                    </div>
                </div>
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
                    <label htmlFor="password">Password</label>
                    <div className={styles.inputShell}>
                        <Lock size={17} strokeWidth={2} />
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Create password' />
                    </div>
                </div>

                <button className={styles.submit} ref={submitRef}>
                    Create Account
                    <ArrowRight size={18} strokeWidth={2.4} />
                </button>

            </form>

            <p className={styles.switch}>Already have an account? <Link to={"/login"}>Login</Link></p>
        </>
    )
}

export default Register