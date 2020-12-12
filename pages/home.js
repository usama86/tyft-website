import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import App from './../src/AdminPanel/App';
import { withRouter } from 'next/router'
function Home(props) {
  React.useEffect(()=>{
    props.router.query={};
    console.log(props.router)
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>TYFT Admin Panel</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
 
        <App {...props} />

    </div>
  )
}
export default withRouter(Home);