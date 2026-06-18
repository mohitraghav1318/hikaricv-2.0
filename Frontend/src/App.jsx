import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <div className="app-shell">
          <Navbar />
          <main className="app-shell__main">
            <RouterProvider router={router} />
          </main>
          <Footer />
        </div>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
