import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { Container, Lista, Listagem, PessoaLista } from '../styles/styles'
import {FiX} from 'react-icons/fi'
import {BsFillPersonFill} from 'react-icons/bs'
import {AiOutlineTeam} from 'react-icons/ai'
import { NewModal } from '../components/ModalCadastro2'
interface Atividade{
  id: number,
  nome: string
  frente_de_montagem_id:number; 
}
interface Equipe {
  id: number,
  nome: string
  atividades: Atividade[] 
} 
interface PaginaPessoaProps{
    equipes:Equipe[]
   
}
export default function Home({equipes}:PaginaPessoaProps)  {

  const [equipesFiltradas,setEquipesFiltradas] = useState(equipes)
  const [filtro,setFiltro]=useState('')
  const [isNewTransactionModalOpen,setIsNewTransactionModalOpen]=useState(false)
  const [codigoObra,setCodigoObra]=useState(0)
  function handleOpenTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }
  function handleCloseTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }
  useEffect(()=>{   
    let newEquipes=[...equipes]
    newEquipes=newEquipes.filter(pessoa => pessoa.nome.toLowerCase().includes(filtro.toLowerCase()));
    setEquipesFiltradas(newEquipes)
  },[filtro])
  return (
  
    <Container>
       <NewModal isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseTransactionModal}
      tipoEnvio="equipe"
      />
      
        <Listagem>
      <span className="cabecalho"> <h1>Pessoas: </h1>
          <button onClick={handleOpenTransactionModal}>
            Abrir Tela De Cadastro
          </button>
      </span>
          <fieldset>
            <label htmlFor="">Nome:</label>
          <input type="text" value={filtro} onChange={e=>{setFiltro(e.target.value)}} />
          </fieldset>
          
          <div>
          {equipesFiltradas.map(pessoa => {
            return(
              <Lista key={pessoa.id} className="pessoaLista">
                <div >
                  <span>
                  <span>
                  <AiOutlineTeam size={30}/> {pessoa.nome}
                  </span>

                  <button>
                    <FiX size={30}/>
                  </button>  
                  </span>
                </div>
                <div className="subLista">
                  <h3>Atividades Relacionadas:</h3>
                  <ul>
                  {pessoa.atividades.map(atividade => {
                    return(
                      <li key={atividade.id}>{atividade.nome}</li>
                    )
                  })}
                  </ul>
                </div>
              </Lista>
            )
          })}
          </div>
        </Listagem>
    </Container>
  )
}

export const getServerSideProps:GetServerSideProps=async (context) =>{
  const equipe =await api.get('/equipe')
  return {
    props: {
     equipes:equipe.data
    }, // will be passed to the page component as props
  }
}