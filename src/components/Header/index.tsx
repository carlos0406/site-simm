import { Header } from "./styles";
import Link from 'next/link'
export function HeaderComponent() {
  return (
    <Header>
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