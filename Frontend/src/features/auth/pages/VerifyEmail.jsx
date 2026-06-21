import React, { useEffect, useState, useRef } from "react"
import { Link, useParams } from "react-router"
import "../auth.form.scss"
import { verifyEmail } from "../services/auth.api"

const VerifyEmail = () => {
    const { token } = useParams()

    const [ message, setMessage ] = useState("Verifying your email...")
    const [ error, setError ] = useState("")
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const verifyUserEmail = async () => {
            try {
                const data = await verifyEmail({ token })
                setMessage(data.message)
            } catch (err) {
                setMessage("")
                setError(err.message || "Something went wrong")
            }
        }

        verifyUserEmail()
    }, [ token ])


    return (
        <main>
            <div className="form-container">
                <h1>Verify Email</h1>

                {message && <p>{message}</p>}
                {error && <p>{error}</p>}

                <p>Go to <Link to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default VerifyEmail
