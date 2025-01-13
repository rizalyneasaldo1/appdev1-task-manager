import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth, googleProvider } from "../firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import './SignInUp.css';



function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            alert('Signed in Succesfully')
            navigate('/tasklist')
        } catch (error) {
            setError(error)
            } 
        }

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            alert('Signed in Succesfully')
            navigate('/tasklist')
        } catch (error) {
            setError(error)
        } 
    }

    return (
        <>
                <form onSubmit={handleSignIn}>
                    <h3>SIGN IN</h3>
                    <input type="email" required placeholder="user@email.com" onChange={(e) => {setEmail(e.target.value)}}/>
                    <input type="password" required placeholder="password" onChange={(e) => {setPassword(e.target.value)}}/>
                    <button type="submit"> <b>Log In</b> </button>
                    <p>or</p><button onClick={handleSignInWithGoogle}> <b>Sign In with Google Account</b> </button>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </form>
                {error && <p>{error}</p>}
        </>
    )
}

export default SignIn