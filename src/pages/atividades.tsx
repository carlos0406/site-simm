import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { NewTransactionModal } from '../components/ModalCadastroPessoa'
import { api } from '../services/api'
import { Container, Listagem, PessoaLista } from '../styles/styles'
import {FiX} from 'react-icons/fi'
import {BsFillPersonFill} from 'react-icons/bs'
import { NewModalAtividade } from '../components/ModalCadastroAtividade'
import equipes from './equipes'
type Equipe = {
  id: number,	
  nome: string,
}
interface Atividade{
  id:number
  nome:string
  frente_de_montagem_id:number
}
interface PaginaPessoaProps{
    equipes:Equipe[]
    atividades:Atividade[]
}
export default function Home({atividades,equipes}:PaginaPessoaProps)  {

  const [pessoasFiltradas,setPessoasFiltradas] = useState(equipes)
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
    let newPessoas=[...atividades]
    newPessoas=newPessoas.filter(pessoa => pessoa.nome.toLowerCase().includes(filtro.toLowerCase()))
    if(codigoObra!==0){
      newPessoas=newPessoas.filter(pessoa => pessoa.frente_de_montagem_id===codigoObra)
    }
    setPessoasFiltradas(newPessoas)
  },[filtro,codigoObra])
  return (
  
    <Container>
       <NewModalAtividade isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseTransactionModal}
      tipoEnvio="pessoa"
      equipes={equipes}
      />
      
        <Listagem>
      <span className="cabecalho"> <h1>Atividades: </h1>
          <button onClick={handleOpenTransactionModal}>
            Abrir Tela De Cadastro
          </button>
      </span>
          <fieldset>
            <label htmlFor="">Nome:</label>
          <input type="text" value={filtro} onChange={e=>{setFiltro(e.target.value)}} />
          </fieldset>
          <fieldset>
            <label htmlFor="">Obra:  </label>
          <select id="obraa" value={codigoObra}  onChange={e => setCodigoObra(Number(e.target.value))} >
            <option value="0" selected>--SELECIONE--</option>
            {equipes.map((obra,index)=>{
              return( <option value={obra.id}  key={obra.id}>{obra.nome}</option>)
            })}
          </select>
          </fieldset>
          <div>
          {pessoasFiltradas.map(pessoa => {
            return(
              <PessoaLista key={pessoa.id} className="pessoaLista">
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
  const pessoas =await api.get('/atividade')
  const obras =await api.get('/equipe')
  return {
    props: {
      atividades:pessoas.data,
      equipes:obras.data
    }, // will be passed to the page component as props
  }
}