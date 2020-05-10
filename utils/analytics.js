import ReactGA from 'react-ga'

const trackingID = 'UA-707447-4'

export const initGA = () => {
  ReactGA.initialize(trackingID)
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}