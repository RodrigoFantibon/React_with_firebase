import React, { useEffect, useState } from 'react'
import { Input } from './components/Input'
import * as firebaseUserService from './services/firebase/user'

const App = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const [ user, setUser ] = useState({})
    const [ credentials, setCredentials ] = useState({
        email: '',
        password: ''
    })


    const handleChangeText = (id, value) => {
        setCredentials(prev => ({...prev, [id]: value}))
    }

    useEffect(() => {
        const load = async () => {
            const userAuthenticated = await firebaseUserService.isAuthenticated()
            console.log('caiu aqui')
            console.log(userAuthenticated)
            
            if(userAuthenticated){
                setIsAuthenticated(true)
                setUser(userAuthenticated)
            }
        }
        load()
    }, [])

    return (
        <div>
            {isAuthenticated && (
                <div>
                    <p>ID: { user.uid }</p>
                    <p>Email: { user.email }</p>
                    <button type='button' onClick={() => {
                        firebaseUserService.logout()
                        setIsAuthenticated(false)
                        setUser({})
                    }}>Logout</button>
                </div>
            )}

            {!isAuthenticated && (
                <div>
                    <Input 
                        id="email" 
                        type="text"
                        label="Email" 
                        placeholder="Digite seu email"
                        onChange={handleChangeText}
                        value={credentials.email}
                    />
                    <Input 
                        id="password" 
                        type="password"
                        label="Password" 
                        placeholder="Digite sua senha"
                        onChange={handleChangeText}
                        value={credentials.password}
                    />
                    <button 
                        type='button' 
                        onClick={async () => {
                            const response = await firebaseUserService.createUser(credentials.email, credentials.password)
                            setCredentials({
                                email: '',
                                password: ''
                            })
                            if(response){
                                setIsAuthenticated(true)
                                setUser(response)
                            }
                        }}
                    >
                        Criar conta
                    </button>

                    <button 
                        type='button' 
                        onClick={async () => {
                            const response = await firebaseUserService.login(credentials.email, credentials.password)

                            setCredentials({
                                email: '',
                                password: ''
                            })

                            if(response){
                                setIsAuthenticated(true)
                                setUser(response)
                            }
                        }}
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    )
}

export default App