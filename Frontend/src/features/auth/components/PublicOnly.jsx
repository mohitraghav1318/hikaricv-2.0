import React from "react"
import { Navigate } from "react-router"
import Loading from "../../../components/common/Loading"
import { useAuth } from "../hooks/useAuth"

const PublicOnly = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (user) {
        return <Navigate to="/dashboard" replace />
    }

    return children
}

export default PublicOnly
