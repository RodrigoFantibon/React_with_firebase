import { auth } from '../../firebaseConnection';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth'

const createUser = async (email, password) => {
    const dep = createUser.dependencies()

    try {
        const response = await dep.createUserWithEmailAndPassword(dep.auth, email, password)
        return response.user
    } catch(error) {
        if(error.code === 'auth/weak-password'){
            alert("Senha muito fraca, use uma senha de pelo menos 6 digitos")
        }
        else if (error.code==='auth/email-alredy-in-use'){
            alert("Email já esta sendo usado no momento")
        }
        return false
    }
}

createUser.dependencies = () => ({
    auth,
    createUserWithEmailAndPassword,
})

const login = async (email, password) => {
    const dep = login.dependencies()
    try {
        const response = await dep.signInWithEmailAndPassword(dep.auth, email, password)
        return response.user
    }  catch(error) {
        alert("Email e/ou senha inválido")
    }
}

login.dependencies = () => ({
    auth,
    signInWithEmailAndPassword,
})

const logout = async () => {
    const dep = logout.dependencies()
    try {
        await dep.signOut(dep.auth)
        return true
    }  catch(error) {
        alert("Erro ao fazer logout")
    }
}

logout.dependencies = () => ({
    signOut,
    auth
})

const isAuthenticated = async () => {
    const dep = isAuthenticated.dependencies()
    return new Promise((resolve, reject) => {
        dep.onAuthStateChanged(dep.auth, (user) => {
            if(user){
                resolve(user)
            }
            else{
                reject(false)
            }
          })
    })
}

isAuthenticated.dependencies = () => ({
    onAuthStateChanged,
    auth,
})

export {
    createUser,
    login,
    logout,
    isAuthenticated
}