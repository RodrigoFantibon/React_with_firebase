import { db } from './firebaseConnection';
import './app.css';
import { useState, useEffect } from 'react';
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';


function App() {

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([])
  const [idPost, setIdPost] = useState('')

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


  return (
    <div className="App">
      <h1>Aprendendo React + fireBase :D</h1>
      <div className='container'>
          

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

          <button onClick={handleAdd}>Cadastrar</button>
          <button onClick={searchPost}>Buscar posts</button>
          <br/>
          <button onClick={editPost}>atualizar post</button> 

          <ul>
            {posts.map((post)=>{
              return(
                <li key={post.id}>
                  <strong>ID: {post.id} </strong> <br/>
                  <span>titulo: {post.titulo}</span> <br/>
                  <span>autor: {post.autor}</span> 
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
