import Head from 'next/head'

const Header = () => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>COVID-19 | The Daily Pennsylvanian</title>
    <link rel="icon" href="favicon.png" />

    <meta property="og:title" content="COVID-19 | The Daily Pennsylvanian"/>
    <meta property="og:image" content="https://snworksceo.imgix.net/dpn/ffa1291a-df92-4ed0-8ce5-6ad3f04b082f.sized-1000x1000.png" />
    <meta property="og:description" content="Updates from Penn on the pandemic"/>
    <meta property="og:type" content="article" />
    <meta property="og:url" content="http://covid.thedp.com/"/>

    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="COVID-19 | The Daily Pennsylvanian"/>
    <meta name="twitter:image" content="https://snworksceo.imgix.net/dpn/ffa1291a-df92-4ed0-8ce5-6ad3f04b082f.sized-1000x1000.png" />
    <meta name="twitter:description" content="Updates from Penn on the pandemic"/>
    <meta name="twitter:url" content="http://covid.thedp.com/"/>
    <meta name="twitter:site" content="@dailypenn"/>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
  </Head>
)

export default Header