import React from 'react'
import Test from '../components/Test'

const Remover = () => {
  return (<>
     <br/>
     <br/>
     <br/>
     <div style={{height:"100vh"}}>
     <Test/>
    <h1>Remover</h1>
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <input type="file" name="fileImg" id="fileImg" accept='image/*'/>
      </div>
    </div>
  </div>
    </div>
    </>
  )
}

export default Remover