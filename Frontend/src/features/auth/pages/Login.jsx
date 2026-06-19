import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import Loading from '../../../components/Loading'


const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

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
        <><main className="auth-page">
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
                        <Link className="auth-tabs__item auth-tabs__item--active" to="/login">Login</Link>
                        <Link className="auth-tabs__item" to="/register">Sign Up</Link>
                    </div>

                    <div className="auth-heading">
                        <h1>Welcome back</h1>
                        <p>Enter your credentials to access your dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='name@company.com' />
                        </div>
                        <div className="input-group">
                            <div className="input-label-row">
                                <label htmlFor="password">Password</label>
                                <Link to={"/forgot-password"}>Forgot?</Link>
                            </div>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='Enter password' />
                        </div>
                        <button className='button primary-button' >Login to Dashboard</button>
                    </form>

                    <p className="auth-switch">Don't have an account? <Link to={"/register"} >Create an account</Link> </p>
                </div>
            </section>
        </main></>
    )
}

export default Login
