import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const withAuthentication = (wrappedComponent) => {
    const BASE_URL = "http://127.0.0.1:8000";
    return function AuthComponent(props){
        const[isAuthenticated, setIsAuthenticated]= useState(false)

        useEffect(() => {

            var access_token = localStorage.get('access')
            var refresh_token = localStorage.get('refresh')

            if(access_token && refresh_token){

                fetch(`${BASE_URL}/auth/jwt/verify/`,{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: { "token": access_token }
                })
                .then(response => {
                    if (response.ok) {
                        setIsAuthenticated(true);
                    }
                    else{
                        fetch(`${BASE_URL}/auth/jwt/refresh/`,{
                            method: 'POST',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: {'refresh': refresh_token}
                        })
                        .then(response => {
                            if (response.ok) {
                                localStorage.set('access', response.json()['access'])
                                localStorage.set('refresh', response.json()['refresh'])
                                setIsAuthenticated(true);
                            }
                            else{
                                setIsAuthenticated(false);
                            }
                        })
                        .catch(error =>{
                            console.log(error);
                        })
                    }
                })
                .catch(error =>{
                    console.log(error);
                })

            }else{
                setIsAuthenticated(false);
            }

        },[]);

        if(isAuthenticated){
            return <wrappedComponent {...props}/>
        }else{
            return <Navigate to ="/login/"/>
        }
    };
};

export default withAuthentication

