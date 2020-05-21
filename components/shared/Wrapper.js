import s from 'styled-components'

export const ArticleWrapper = s.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  ${({ centerText }) => centerText ? 'text-align: center;' : ''}

  img {
    text-align: center
  }
`

export const MultimediaArticleWrapper = s.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  position: relative;
`

export const UpdateWrapper = s.div`
  margin-top: 1rem;
  background: #F5F5F5;
  padding: 2rem;
  margin-bottom: 2rem;
`

export const NavbarWrapper = s.nav`
  font-size: 80%;
  font-family: 'Libre Franklin', sans-serif;
  position: fixed;
  z-index: 1;
`