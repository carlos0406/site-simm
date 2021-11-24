import { Header } from "./styles";
import Link from 'next/link'
import { api } from "../../services/api";
import { toast } from "react-toastify";
export function HeaderComponent() {
  async function atualizarPlanilha(){
   const {status}= await api.post('/registros',[]);
   if(status===201){
    toast.success(`Planilha atualizada com sucesso!`);
   }
  }

  async function inativarRegistros(){
   if(window.confirm('Deseja realmente excluir todos os registros?')){
    const {status,data}= await api.put('/inativar',{});
    if(status===200){
    //@ts-ignore
     toast.success(`${data.count}, registros excluidos`);
    }
   }
  }
  return (
    <Header>
      <button onClick={atualizarPlanilha} className="atualizar">
        Atualizar planilha
      </button>
      <a href="https://app-simm.herokuapp.com/download" className="baixar">
        Baixar planilha
      </a>
      <div>
      <img src="/logo.svg" alt="" />
      </div>
      <nav>
    <Link href="/">
      <a>Pessoas</a>
    </Link>
    <Link href="/obra">
      <a>Obras</a>
    </Link>
    <Link href="/equipes">
      <a>Equipes</a>
    </Link>
    <Link href="/atividades">
      <a>Atividades</a>
    </Link>
    <Link href="/bases">
      <a>Bases</a>
    </Link>
      </nav>
      <button onClick={inativarRegistros} className="excluir">
        Excluir registros
      </button>
    </Header>
  );
}