import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { NewTransactionModal } from '../components/ModalCadastroPessoa'
import { api } from '../services/api'
import { Container, Listagem, PessoaLista } from '../styles/styles'
import {FiX} from 'react-icons/fi'
import {BsFillPersonFill} from 'react-icons/bs'
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
    pessoas:Pessoa[]
    obras:Obra[]
}
export default function Home({pessoas,obras}:PaginaPessoaProps)  {

  const [pessoasFiltradas,setPessoasFiltradas] = useState(pessoas)
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
    let newPessoas=[...pessoas]
    newPessoas=newPessoas.filter(pessoa => pessoa.nome.toLowerCase().includes(filtro.toLowerCase()))
    if(codigoObra!==0){
      newPessoas=newPessoas.filter(pessoa => pessoa.codigo_obra===codigoObra)
    }
    setPessoasFiltradas(newPessoas)
  },[filtro,codigoObra])
  return (
  
    <Container>
       <NewTransactionModal isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseTransactionModal}
      tipoEnvio="pessoa"
      obras={obras}
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
          <fieldset>
            <label htmlFor="">Obra:  </label>
          <select id="obraa" value={codigoObra}  onChange={e => setCodigoObra(Number(e.target.value))} >
            <option value="0" selected>--SELECIONE--</option>
            {obras.map((obra,index)=>{
              return( <option value={obra.codigo}  key={obra.codigo}>{obra.nome} - {obra.codigo}</option>)
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
  const pessoas =await api.get('/pessoa')
  const obras =await api.get('/obra')
  return {
    props: {
      pessoas:pessoas.data,
      obras:obras.data
    }, // will be passed to the page component as props
  }
}