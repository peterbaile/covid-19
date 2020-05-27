import s from 'styled-components'

import { NavbarWrapper, NavText } from './shared'

const Image = s.img`
  max-height: 90px;

  @media (max-width: 768px) {
    max-height: 30px;
  }
`
const LeftUL = s.ul`
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`

const RightUL = s.ul`
  margin-left: 1rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const NavBar = () => {
  return (
    <NavbarWrapper
      class="navbar sticky-top navbar-expand-lg"
      style={{
        fontFamily: 'Libre Franklin',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 5px 6px #00000029',
        opacity: 1
      }}
    >
      <div className="navbar-collapse w-100 dual-collapse2 order-1 order-md-0 collapse">
        <LeftUL className="navbar-nav ml-auto text-center">
          <li className="nav-item active">
            <a className="nav-link" href="#latest"> <NavText> Latest Stories </NavText></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#latest"> <NavText> Live Update </NavText></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#news"> <NavText> News</NavText> </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#tracking"> <NavText> Tracking </NavText> </a>
          </li>
        </LeftUL>
      </div>
      <div className="mx-auto my-2 order-0 order-md-1 position-relative" style={{ textAlign: 'center' }}>
        <a className="mx-auto" href="https://www.thedp.com/">
          <Image src="/img/DP-Logo-Full.png" className="img-fluid" />
        </a>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target=".dual-collapse2" aria-expanded="false">
          <span className="navbar-toggler-icon"><img src="/icons/menu.svg" style={{ transform: 'translate(0, 0.2rem)' }} /></span>
        </button>
      </div>
      <div className="navbar-collapse w-100 dual-collapse2 order-2 order-md-2 collapse">
        <RightUL className="navbar-nav mr-auto text-center">
          {/* <li class="nav-item">
            <a class="nav-link" href="#timeline"> <NavText> Timeline </NavText> </a>
          </li> */}
          <li className="nav-item">
            <a className="nav-link" href="#opinion"><NavText> Opinion </NavText></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#34st"> <NavText> 34th Street </NavText> </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#sports"> <NavText> Sports </NavText> </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#multimedia"> <NavText> Multimedia </NavText></a>
          </li>
        </RightUL>
      </div>
    </NavbarWrapper>
  )
}

export default NavBar