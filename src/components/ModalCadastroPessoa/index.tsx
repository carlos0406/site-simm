import Modal from 'react-modal'
import { Container, RadioBox, TransactionTypeContainer } from './styles'
import { FormEvent, useState } from 'react'
import { api } from '../../services/api'
import { toast } from 'react-toastify';
type NewTransactionModalProps={
  isOpen: boolean
  onRequestClose:()=>void
  tipoEnvio:string
  obras:Obra[]
}
interface Obra{
  codigo:number
  nome:string
}

export function NewTransactionModal ({ isOpen, onRequestClose,tipoEnvio,obras}:NewTransactionModalProps) {
  const [nome, setNome] = useState('')
  const [codigoObra,setCodigoObra]=useState(0)
  async function handleCreateNewTransaction (event:FormEvent) {
    const erros=[]
    event.preventDefault()
    const obj={
      nome,
      codigo_obra:codigoObra,
    }

    if(!nome){
      erros.push('Nome é obrigatório')
    }
    if(!codigoObra){
      erros.push('Obra é obrigatório')
    }
   
    if(erros.length > 0){
      let errosString="";
      for(let i=0;i<erros.length;i++){
        errosString+=erros[i]+ ','
      }
      toast.error(errosString)
      return
    }else{
    const {status}=await api.post(tipoEnvio,obj)
    if(status===201){
      toast.success('Cadastro realizado com sucesso')
    }
    }
    setNome('')
    setCodigoObra(0)
    onRequestClose();
  }
  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button type="button"
         onClick={onRequestClose}
         className="react-modal-close"
         >
          <img src="/close.svg" alt="Fechar modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastro de {tipoEnvio}</h2>
          <input type="text"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <select id="obraa" value={codigoObra}  onChange={e => setCodigoObra(Number(e.target.value))} >
            <option value="0" selected disabled >--SELECIONE--</option>
            {obras.map((obra,index)=>{
              return( <option value={obra.codigo}  key={obra.codigo}>{obra.nome} - {obra.codigo}</option>)
            })}
          </select>
          <button type="submit">
            Cadastrar
          </button>
        </Container>
      </Modal>
  )
}
