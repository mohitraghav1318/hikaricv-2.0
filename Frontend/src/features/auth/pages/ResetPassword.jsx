import React, { useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import "../auth.form.scss"
import { resetPassword } from "../services/auth.api"

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const [ password, setPassword ] = useState("")
  const [ loading, setLoading ] = useState(false)
  const [ message, setMessage ] = useState("")
  const [ error, setError ] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const data = await resetPassword({ token, password })
      setMessage(data.message)

      setTimeout(() => {
        navigate("/login")
      }, 1200)
    } catch (err) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="form-container">
        <h1>Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              onChange={(e) => { setPassword(e.target.value) }}
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
            />
          </div>

          <button className="button primary-button" disabled={loading}>
            {loading ? "Resetting..." : "Reset password"}
          </button>
        </form>

        {message && <p>{message}</p>}
        {error && <p>{error}</p>}

        <p>Back to <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default ResetPassword
