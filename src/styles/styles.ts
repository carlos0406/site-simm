import styled from "styled-components"

export const Listagem=styled.div`
    width: 73rem;
    margin: 0 auto;
    display:flex;
    flex-direction:column;
    min-height: 100vh;
    span.cabecalho{
        display:flex;
        padding-top: 1rem;
        width: 90%;
        margin: 0 auto;
        justify-content: space-between;
        h1{
        text-align: center;
        padding:1rem 0 ;
        color: white;
        font-family: 'Inter', sans-serif;
        }
        button{
            background-color:#33CC95;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 1.5rem;
            padding: 0 0.5rem;
        }
    }
    div{
        display:flex;
        flex-direction: column;
    }
`
export const PessoaLista=styled.span`
    span{
        width: 50%;
        display:flex;
        align-items: center;
        svg{
            margin-right: 2rem;
        }
    }
    background:#fff;
    width: 90%;
    margin: 0 auto;
    border-bottom: 2px solid #707070;
    padding:3rem 0;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    button{
        margin-right: 1rem;
        border: none;
        background: transparent;
    }

`
export const Container=styled.div`
   fieldset {
    display: flex;
    margin-bottom: 2rem;
    border: none;
    font-size: 1.2rem;
    width: 90%;
    margin:0 auto;
    padding: 0.5rem 0;
    &>fieldset {
        margin-bottom: 1rem;
    }  
    input{
       margin-left:0.5rem; ;
       height: 2.5rem;
       font-size: 1.2rem;
       flex:7;
       color: #304030;
       text-align: center;
    }
    select{
       margin-left:1.25rem; ;
       height: 2.5rem;
       font-size: 1.2rem;
       flex:1;
       color: #304030;
       font-weight: bold;
       option{
          text-align: center;
       }
    }
    select,input{
        border-radius:0.75rem;
        border: none;
    }
    label{
        line-height: 2.5rem;
        color: white;
    }
 
   }
   select{
    height: 2.5rem;
    font-size: 1.2rem;
    margin-bottom: 2rem;
    option{
    height: 2.5rem;
    font-size: 1.2rem; 
    }
   }
`

export const Lista=styled.span`
    display:flex;
    flex-direction: column;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    background:#fff;
    width: 90%;
    margin: 0 auto 1rem auto ;
    border-bottom: 2px solid #707070;
    padding:3rem 0;
    span{
        width: 50%;
        display:flex;
        align-items: center;
        svg{
            margin-right: 2rem;
        }
    }
    div{
      span{
        width: 100%;
      }  
    }
    div.subLista{
        justify-content: space-between;
        align-items: center;
    }
    button{
        margin-right: 1rem;
        border: none;
        background: transparent;
        span{
            width: 100%;
        }
    
}
`