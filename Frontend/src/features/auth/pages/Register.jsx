import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Loading from '../../../components/Loading'
import LandingNavbar from '../../../features/landing/components/LandingNavbar'
import Footer from '../../landing/components/Footer'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const {loading,handleRegister} = useAuth()
    
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
            <LandingNavbar />
            <main className="auth-page">
            <section className="auth-visual" aria-hidden="true">
                <div className="auth-visual__content">
                    <p className="auth-brand">HikariCV</p>
                    <h2>Master your career with AI precision.</h2>
                    <p>Build interview plans with real-time AI feedback for your next role.</p>
                </div>
            </section>

            <section className="auth-panel">
                <div className="form-container">
                    <div className="auth-tabs">
                        <Link className="auth-tabs__item" to="/login">Login</Link>
                        <Link className="auth-tabs__item auth-tabs__item--active" to="/register">Sign Up</Link>
                    </div>

                    <div className="auth-heading">
                        <h1>Create account</h1>
                        <p>Start building interview plans tailored to your next role.</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Enter username' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='name@company.com' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='Create password' />
                        </div>

                        <button className='button primary-button' >Create Account</button>

                    </form>

                    <p className="auth-switch">Already have an account? <Link to={"/login"} >Login</Link> </p>
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default Register
