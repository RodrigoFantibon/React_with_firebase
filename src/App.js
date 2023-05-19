import { db, auth } from './firebaseConnection';
import './app.css';
import { useState, useEffect } from 'react';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot, Firestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'


function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);
  const [idPost, setIdPost] = useState('');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState ([])

  useEffect(()=>{
    async function loadPost(){
      const unsub = onSnapshot(collection(db, "posts"), (Snapshot) =>{
        let listPost = []
        Snapshot.forEach((doc)=>{
          listPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
          })
        })
        setPosts(listPost)
      })
    }
    loadPost();
  }, [])

  async function handleAdd(){

  //ADICIONA UM REGISTRO NO BANCO, DENTRO DA COLLECTION POSTS NO DOCUMENTO 123456
  //  await setDoc(doc(db, "posts", "123456"),{
  //   titulo: titulo,
  //   autor: autor
  //  })
  //  .then(() => {
  //   console.log("Dados registrados com sucesso")
  //  })
  //  .catch((error)=> {
  //   console.log("Erro: ", error)
  //  })


  // //ADICIONA UM REGISTRO NO BANCO, DENTRO DA COLLECTION POSTS GERANDO UM "ID" ALEATORIO
    await addDoc(collection(db, "posts"),{
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log("Cadastrado com sucesso")
      setAutor('')
      setTitulo('')
    })
    .catch((error)=>{
      console.log("erro ao cadastrar: erro:", error)
    })
  }

  async function searchPost(){
   
    //BUSCA UM POST ESPECIFICO (Nesse caso ele busca na colecction posts, dentro do documento 12345)
    // const postRef = doc(db, "posts", "12345")

    // await getDoc(postRef)
    // .then((data)=>{
    //   console.log("test", data.data())
    //   // setAutor(data.data().autor)
    //   // setTitulo(data.data().titulo)
    // })
    // .catch((error)=>{
    //   console.log("erro ao buscar registro:", error)
    // })


    //Busca uma lista de registros no banco
    const postRef = collection(db, "posts")
    await getDocs(postRef)
    .then((data)=>{
      let lista = []
      data.forEach((doc)=>{
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })
      console.log("tetsttt", data)
      setPosts(lista)
    })
    .catch((error)=>{
      console.log("error", error)
    })
  }


  async function editPost(){
    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then((data)=>{
      setIdPost('')
      setAutor('')
      setTitulo('')
    })
    .catch((error)=>{
      console.log("erro ao atualizar registro", error)
    })
  }

 async function excluirPost(id){

    const docRef = doc(db, "posts", id)
    await deleteDoc(docRef)
    .then(()=>{
      console.log("post deletado com sucesso")
      alert("post deletado com sucesso!!!")
    })
  }

  async function newUser(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then((value)=>{
      console.log("Usuario cadastrado com sucesso")
      setEmail('')
      setSenha('')
    })
    .catch((error)=>{
      
      if(error.code === 'auth/weak-password'){
        alert("Senha muito fraca, use uma senha de pelo menos 6 digitos")
      }
      else if (error.code==='auth/email-alredy-in-use'){
        alert("Email já esta sendo usado no momento")
      }

    })
  }

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value)=>{
      console.log("logado com sucesso")
      setUserDetail({
        uid: value.user.id,
        email: value.user.email
      })
      setUser(true);
      console.log("info usuario", value.user)
      setEmail('')
      setSenha('')
    })
    .catch((error)=>{
      console.log("erro ao fazer login")
    })
  }

  async function fazerLogout(){
    await signOut(auth)
    setUser(false);
    setUserDetail({})
  }

  useEffect(() =>{
    async function checkLogin(){
      onAuthStateChanged(auth, (user)=>{
        if(user){
          console.log(user)
          setUser(true)
          setUserDetail({
            uid: user.uid,
            email: user.email
          })
        }
        else{
          setUser(false)
          setUserDetail({})
        }
      })
    }

    checkLogin();

  }, [])


  return (
    <div className="App">
      <h1>React + fireBase :D</h1> 

      { user && (

      <div>
        <strong> Seja Bem vindo </strong><br/>
        <span> ID: {userDetail.uid} - Email: {userDetail.email} </span>
        <br/><br/>
        <button onClick={fazerLogout}>Sair da conta</button>
        <br/><br/>
      </div>

      )}
      
      <div className='container'>
        <h1>USUARIOS</h1>
        <label> Email </label>
          <input
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          placeholder='Digite seu email'
          /> <br/>
        <label> Senha </label>
          <input
          value={senha}
          onChange={(e)=> setSenha(e.target.value)}
          placeholder='Informe sua senha'
          />
        <br/>

        <button onClick={logarUsuario}> Login </button>
        <br/>      
        <button onClick={newUser}> Cadastrar </button>

      </div>
      <br/><br/>
      <hr/>
      
      <div className='container'>
        <h1>POSTS</h1>
        <label> ID do post: </label>
        <input
        playceholder="digite o ID do post"
        value={idPost}
        onChange={(e) =>{
          setIdPost(e.target.value)
        }}
        />
      

        <label> Titulo: </label>
        <textarea
        type="text"
        playceholder="digite o titulo"
        value = {titulo}
        onChange={(e) => setTitulo(e.target.value)}
        />

        <label> Autor: </label>
        <input
        type="text"
        playceholder="autor do post"
        value = {autor}
        onChange={(e) => setAutor(e.target.value)}
        />
        <br/>
        <button onClick={handleAdd}>Cadastrar</button> <br/>
        <button onClick={searchPost}>Buscar posts</button>
        <br/>
        <button onClick={editPost}>atualizar post</button> 

        <ul>
          {posts.map((post)=>{
            return(
              <li key={post.id}>
                <strong>ID: {post.id} </strong> <br/>
                <span>titulo: {post.titulo}</span> <br/>
                <span>autor: {post.autor}</span> <br/>
                <button onClick={()=> excluirPost(post.id)}>Excluir</button> <br/><br/>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
