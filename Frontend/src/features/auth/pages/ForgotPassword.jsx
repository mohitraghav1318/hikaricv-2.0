import React, { useState } from "react"
import { Link } from "react-router"
import "../auth.form.scss"
import { forgotPassword } from "../services/auth.api"

const ForgotPassword = () => {

    const [ email, setEmail ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ message, setMessage ] = useState("")
    const [ error, setError ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")
        setError("")

        try {
            const data = await forgotPassword({ email })
            setMessage(data.message)
        } catch (err) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main>
            <div className="form-container">
                <h1>Forgot Password</h1>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                        />
                    </div>

                    <button className="button primary-button" disabled={loading}>
                        {loading ? "Sending..." : "Send reset link"}
                    </button>
                </form>

                {message && <p>{message}</p>}
                {error && <p>{error}</p>}

                <p>Remember your password? <Link to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default ForgotPassword
