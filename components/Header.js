import Head from 'next/head'

const Header = () => (
  <Head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>COVID-19 | The Daily Pennsylvanian</title>
    {/* <link rel="icon" href="/favicon.ico" /> */}

    <meta property="og:title" content="COVID-19 | The Daily Pennsylvanian"/>
    {/* <meta property="og:image" content="https://snworksceo.imgix.net/dpn/9ae93a96-5757-4a4c-b43e-299c186a6f92.sized-1000x1000.png" /> */}
    {/* <meta property="og:description" content="Your guide to living at Penn"/> */}
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://thedp-covid-19.herokuapp.com/"/>

    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="COVID-19 | The Daily Pennsylvanian"/>
    {/* <meta name="twitter:image" content="https://snworksceo.imgix.net/dpn/9ae93a96-5757-4a4c-b43e-299c186a6f92.sized-1000x1000.png" /> */}
    {/* <meta name="twitter:description" content="Your guide to living at Penn"/> */}
    <meta name="twitter:url" content="https://thedp-covid-19.herokuapp.com/"/>
    <meta name="twitter:site" content="@dailypenn"/>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </Head>
)

export default Header