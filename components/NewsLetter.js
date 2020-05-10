import s from 'styled-components'

const Background = s.div`
  text-align: center;
  margin: 0 20% 0rem 20%;
  position: relative;
`

const CenteredDiv = s.div`
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
`

const Title = s.div`
  color: #283033;
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
`

const Subtext = s.div`
  color: #D12D4A;
  font-family: 'Libre Franklin', sans-serif;
  font-size: 1rem;
`

const Input = s.input`
  margin-top: 2rem;
  border: 1px solid #D12D4A;
  color: #D12D4A;
  padding: 1.5rem;
  height: 0.5rem;
  width: 100%;

  ::placeholder {
    color: #D12D4A;
  }

  :focus {
    outline: none;
  }
`

const NewsLetter = () => {
  return (
    <Background> 
      <img src="/img/newsletter.png" className="img-fluid"/>
      <CenteredDiv>
        <Title>Join our newsletter</Title>
        <Subtext>Daily updates, directly to your inbox.</Subtext>
        <Input placeholder="Enter your email address"/>
      </CenteredDiv>
      
    </Background>
  )
}

export default NewsLetter