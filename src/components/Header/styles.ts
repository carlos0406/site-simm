import styled from 'styled-components';

export const Header = styled.header`
  div {
    width: 1180px;
    margin:0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: 10rem;
    }
   
    padding: 1rem 0;
  }
  border-bottom: 2px solid #707070;
  background-color: #f0f0f0;
  width: 100%;
 nav{
  display: flex;
  justify-content: space-between;
  width: 1180px;
  margin: 0 auto;
  a{
    text-decoration: none;
    color: #0e2f4f;
  }
 }
`