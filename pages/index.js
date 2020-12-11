import React from 'react';
import { withRouter } from 'next/router'
function Home(props) {
  React.useEffect(()=>{
    props.router.push('/login');
  },[])
  return (
  <React.Fragment>
  </React.Fragment>
 
  )
}
export default withRouter(Home);