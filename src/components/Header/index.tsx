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
  return (
    <Header>
      <button onClick={atualizarPlanilha}>
        Atualizar planilha
      </button>
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
    </Header>
  );
}