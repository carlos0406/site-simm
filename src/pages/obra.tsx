import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { NewTransactionModal } from '../components/ModalCadastroPessoa'
import { api } from '../services/api'
import { Container, Listagem, PessoaLista } from '../styles/styles'
import {FiX} from 'react-icons/fi'
import {BsFillPersonFill} from 'react-icons/bs'
import { NewModalObra } from '../components/ModalCadastroObra'
type Pessoa = {
  id: number,	
  nome: string,
  codigo_obra:number
}
interface Obra{
  codigo:number
  nome:string
}
interface PaginaPessoaProps{
    obras:Obra[]
}
export default function Home({obras}:PaginaPessoaProps)  {

  const [pessoasFiltradas,setPessoasFiltradas] = useState(obras)
  const [filtro,setFiltro]=useState('')
  const [isNewTransactionModalOpen,setIsNewTransactionModalOpen]=useState(false)
  function handleOpenTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }
  function handleCloseTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }
  useEffect(()=>{   
    let newPessoas=[...obras]
    newPessoas=newPessoas.filter(pessoa => pessoa.nome.toLowerCase().includes(filtro.toLowerCase()))
    setPessoasFiltradas(newPessoas)
  },[filtro])
  return (
  
    <Container>
       <NewModalObra isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseTransactionModal}
      />
      
        <Listagem>
      <span className="cabecalho"> <h1>Obra: </h1>
          <button onClick={handleOpenTransactionModal}>
            Abrir Tela De Cadastro
          </button>
      </span>
          <fieldset>
            <label htmlFor="">Nome:</label>
          <input type="text" value={filtro} onChange={e=>{setFiltro(e.target.value)}} />
          </fieldset>
          <div>
          {pessoasFiltradas.map(pessoa => {
            return(
              <PessoaLista key={pessoa.codigo} className="pessoaLista">
                <span>
                <BsFillPersonFill size={30}/> {pessoa.nome}
                </span>

                <button>
                  <FiX size={30}/>
                </button>
              </PessoaLista>
            )
          })}
          </div>
        </Listagem>
    </Container>
  )
}

export const getServerSideProps:GetServerSideProps=async (context) =>{
  const obras =await api.get('/obra')
  return {
    props: {
      obras:obras.data
    }, // will be passed to the page component as props
  }
}