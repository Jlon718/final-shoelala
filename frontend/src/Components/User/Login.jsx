import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import shoelalaImage from '../../img/shoesbg.avif';
import { auth, googleProvider, facebookProvider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                `http://localhost:4001/api/v1/login`,
                { email, password },
                config
            );
            console.log(data);
            // Authentication logic here
            navigate("/");
        } catch (error) {
            toast.error("Invalid email or password", {
                position: "bottom-right",
            });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        login(email, password);
    };

    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const { user } = result;
            console.log(user);
            // Handle user login logic here
            navigate("/");
        } catch (error) {
            console.error("Facebook Login Error:", error);
            toast.error("Facebook login failed", {
                position: "bottom-right",
            });
        }
    };

    const handleGmailLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const { user } = result;
            console.log(user);
            // Handle user login logic here
            navigate("/");
        } catch (error) {
            console.error("Google Login Error:", error);
            toast.error("Google login failed", {
                position: "bottom-right",
            });
        }
    };

    return (
        <div style={{ ...styles.background, backgroundImage: `url(${shoelalaImage})` }}>
            <div style={styles.loginContainer}>
                <h2 style={styles.heading}>Customer Login</h2>
                <form onSubmit={submitHandler} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email_field" style={styles.inputIcon}>
                            📧
                        </label>
                        <input
                            type="email"
                            id="email_field"
                            placeholder="Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password_field" style={styles.inputIcon}>
                            🔒
                        </label>
                        <input
                            type="password"
                            id="password_field"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.extraOptions}>
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link to="/password/forgot" style={styles.forgotPassword}>
                            Forgot Password?
                        </Link>
                    </div>
                    <button type="submit" style={styles.button}>
                        LOGIN
                    </button>
                    <p style={styles.newUser}>
                        New User?{" "}
                        <Link to="/register" style={styles.registerLink}>
                            Register
                        </Link>
                    </p>
                </form>
                <div style={styles.socialButtons}>
                    <button onClick={handleFacebookLogin} style={styles.facebookButton}>
                        <FacebookIcon style={styles.icon} />
                        Login with Facebook
                    </button>
                    <button onClick={handleGmailLogin} style={styles.gmailButton}>
                        <GoogleIcon style={styles.icon} />
                        Login with Gmail
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    background: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0e2433",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    loginContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        padding: "30px",
        width: "400px",
        textAlign: "center",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    inputGroup: {
        display: "flex",
        alignItems: "center",
        marginBottom: "15px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "10px",
        padding: "10px",
    },
    inputIcon: {
        fontSize: "18px",
        marginRight: "10px",
        color: "#ffffff",
    },
    input: {
        flex: 1,
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        color: "#ffffff",
        fontSize: "16px",
    },
    extraOptions: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px",
        color: "#ffffff",
        marginBottom: "20px",
    },
    forgotPassword: {
        color: "#00e5ff",
        textDecoration: "none",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#00e5ff",
        border: "none",
        borderRadius: "10px",
        color: "#ffffff",
        fontWeight: "bold",
        cursor: "pointer",
        marginBottom: "20px",
    },
    newUser: {
        fontSize: "14px",
        color: "#ffffff",
    },
    registerLink: {
        color: "#00e5ff",
        textDecoration: "none",
        fontWeight: "bold",
    },
    socialButtons: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
    },
    facebookButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        backgroundColor: "#3b5998",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        margin: "10px 0",
        width: "100%",
        maxWidth: "400px",
    },
    gmailButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        backgroundColor: "#db4437",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        margin: "10px 0",
        width: "100%",
        maxWidth: "400px",
    },
    icon: {
        marginRight: "10px",
    },
};

export default Login;