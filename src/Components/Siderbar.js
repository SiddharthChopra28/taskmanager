import React from 'react'
import withAuthentication from '../utils/withAuthentication'

 function Siderbar() {
  return (
    <div className='sidebar'>Siderbar</div>
  )
}

export default withAuthentication(Siderbar)