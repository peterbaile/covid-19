import s from 'styled-components'

export const StyledLink = s.a`
  color: #000000 !important;
  text-decoration: none !important;
`

export const NavText = s.text`
  font-size: 80%;
  font-family: 'Libre Franklin', sans-serif;
  color: #283033;
`

export const AbstractText = s.div`
  margin-top: 0.5rem;
  color: ${({ color = '#707070' }) => color};
  font-family: 'Georgia', serif;
`

export const HeadlineText = s.h4`
  margin-top: 0.5rem;
  color: ${({ color = '#283033' }) => color};
  font-family: 'Playfair Display', serif;
`

export const Title = s.div`
  border-left: 12px solid #D12D4A;
  padding: 0rem 1rem;
  text-align: left;
  font-size: 30px;
  font-family: 'Libre Franklin', sans-serif;
  font-weight: 900;
  letter-spacing: 0px;
  color: #283033;
  opacity: 1;
`

export const TimestampText = s.div`
  margin-top: 0.5rem;
  color: #696969	;
  font-family: 'Georgia', serif;
`