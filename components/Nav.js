import { NavbarWrapper, NavText } from './shared'

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
      <div class="navbar-collapse w-100 dual-collapse2 order-1 order-md-0 collapse">
          <ul class="navbar-nav ml-auto text-center">
            <li class="nav-item active">
              <a class="nav-link" href="#latest"> <NavText> Latest Stories </NavText></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#latest"> <NavText> Live Update </NavText></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#news"> <NavText> News</NavText> </a>
            </li>
          </ul>
      </div>
      <div class="mx-auto my-2 order-0 order-md-1 position-relative" style={{ textAlign: 'center' }}>
        <a class="mx-auto" href="#">
          <img src="/img/DP-Logo-Full.png" className="img-fluid" style={{ width: '50%' }} />
        </a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target=".dual-collapse2" aria-expanded="false">
          <span className="navbar-toggler-icon"><img src="/icons/menu.svg" style={{ transform: 'translate(0, 0.2rem)' }} /></span>
        </button>
      </div>
      <div class="navbar-collapse w-100 dual-collapse2 order-2 order-md-2 collapse">
        <ul class="navbar-nav mr-auto text-center">
          {/* <li class="nav-item">
            <a class="nav-link" href="#timeline"> <NavText> Timeline </NavText> </a>
          </li> */}
          <li class="nav-item">
            <a class="nav-link" href="#opinion"><NavText> Opinion </NavText></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#34st"> <NavText> 34th Street </NavText> </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#multimedia"> <NavText> Multimedia </NavText></a>
          </li>
        </ul>
      </div>
    </NavbarWrapper>
  )
}

export default NavBar