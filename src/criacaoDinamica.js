// import React, { useState } from 'react'
// import { Input } from './components/Input'

// const App = () => {
//     const [ credentials, setCredentials ] = useState({
//         email: '',
//         password: ''
//     })


//     const handleChangeText = (id, value) => {
//         setCredentials(prev => ({...prev, [id]: value}))
//     }

//     const campos = [
//         {
//             type: 'input',
//             props: { id: 'email', type: 'text', label: 'Email', placeholder: 'Digite seu email do diguinho' },
//         },
//         {
//             type: 'input',
//             props: { id: 'password', type: 'password', label: 'Password', placeholder: 'Digite sua senha' },
//         },
//         {
//             type: 'input',
//             props: { id: 'password2', type: 'text', label: 'Email', placeholder: 'fgfgfdgfg' },
//         }
//     ]


//     return (
//         <>
//             {campos.map((campo, index) => {
//                 switch(campo.type){
//                     case 'input':
//                         return <Input key={index}  {...campo.props} onChange={handleChangeText}/>
//                     case 'combobox':
//                         return <Combobox key={index}  {...campo.props} onChange={handleChangeText}/>
//                 }
//             })}
            
//         </>
//     )
// }

// export default App