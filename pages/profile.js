import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import App from './../src/AdminPanel/App';
export default function Profile() {
  return (
    <React.Fragment>
      <Head>
        <title>TYFT Admin Panelss</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
 
        <App/>

    </React.Fragment>
  )
}
