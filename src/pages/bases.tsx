import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { NewTransactionModal } from '../components/ModalCadastroPessoa'
import { api } from '../services/api'
import { Container, Listagem, PessoaLista } from '../styles/styles'
import {FiX} from 'react-icons/fi'
import {BsFillPersonFill} from 'react-icons/bs'
import { toast } from 'react-toastify'
import { useRouter } from 'next/dist/client/router'
type Base = {
  id: number,	
  nome: string,
  codigo_obra:number
}
interface Obra{
  codigo:number
  nome:string
}
interface PaginaPessoaProps{
    bases:Base[]
    obras:Obra[]
}
export default function Bases({bases,obras}:PaginaPessoaProps)  {
  const router = useRouter();
  const [basesFiltradas,setBasesFiltradas] = useState(bases)
  const [filtro,setFiltro]=useState('')
  const [isNewTransactionModalOpen,setIsNewTransactionModalOpen]=useState(false)
  const [codigoObra,setCodigoObra]=useState(0)
  function handleOpenTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }
  function handleCloseTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }
  async function remover(id:number) {
    if(window.confirm('Deseja realmente remover esta equipe?')){
      const {status}=await api.delete(`/base/${id}`)
      if(status===204){
        toast.success('equipe removida com sucesso!')
        router.reload();
      }else{
        toast.error('Erro ao tentar deletar, a equipe está sendo usada em alguma atividade')
      }
    }
  }
  useEffect(()=>{   
    let newBases=[...bases]
    newBases=newBases.filter(base => base.nome.toLowerCase().includes(filtro.toLowerCase()))
    if(codigoObra!==0){
      newBases=newBases.filter(base => base.codigo_obra===codigoObra)
    }
    setBasesFiltradas(newBases)
  },[filtro,codigoObra])
  return (
  
    <Container>
       <NewTransactionModal isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseTransactionModal}
      tipoEnvio="base"
      obras={obras}
      />
        <Listagem>
      <span className="cabecalho"> <h1>Bases:</h1>
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
          {basesFiltradas.map(pessoa => {
            return(
              <PessoaLista key={pessoa.id} className="pessoaLista">
                <span>
                <BsFillPersonFill size={30}/> {pessoa.nome}
                </span>

                <button onClick={() => remover(pessoa.id)}>
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
  const bases =await api.get('/base') 
  const obras =await api.get('/obra')
  return {
    props: {
      bases:bases.data,
      obras:obras.data
    }, // will be passed to the page component as props
  }
}