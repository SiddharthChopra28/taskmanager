import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

function withoutAuthentication(WrappedComponent) {
    return function AuthWrapper(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const BASE_URL = "http://127.0.0.1:8000";


        const [loading, setLoading] = useState(true);  // <-- new loading state

        useEffect(() => {
            const access_token = localStorage.getItem('access');
            const refresh_token = localStorage.getItem('refresh');

            if (access_token && refresh_token) {
                fetch(`${BASE_URL}/auth/jwt/verify/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: access_token })
                })
                .then(response => {
                    if (response.ok) {
                        console.log(response)
                        console.log('auth token valid')
                        setIsAuthenticated(true);
                        setLoading(false);
                    } else {
                        fetch(`${BASE_URL}/auth/jwt/refresh/`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ refresh: refresh_token })  // <-- fix here
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.access) {
                                console.log('acess provideed')
                                localStorage.setItem('access', data.access);
                                if (data.refresh) {
                                    localStorage.setItem('refresh', data.refresh);
                                }
                                setIsAuthenticated(true);
                            } else {
                                console.log('sabkuch invalid hai')
                                setIsAuthenticated(false);
                            }
                            setLoading(false);
                        })
                        .catch(error => {
                            console.log(error);
                            setIsAuthenticated(false);
                            setLoading(false);
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    setIsAuthenticated(false);
                    setLoading(false);
                });

            } else {
                setIsAuthenticated(false);
                setLoading(false);
            }

        }, []);

        if (loading) {
            return <div>Loading...</div>;  // Or a spinner
        }

        if (!isAuthenticated) {
            return <WrappedComponent {...props} />;
        } else {
            return <Navigate to="/" />;
        }
    };
}

export default withoutAuthentication;

