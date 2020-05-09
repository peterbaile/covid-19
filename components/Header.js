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
    <link rel="stylesheet" href="" type="text/css"/>
    {/* <script src="https://kit.fontawesome.com/667baf96e0.js" crossorigin="anonymous"></script> */}
  </Head>
)

export default Header