import React from 'react';

export default function Loadingspinner() {
  return (
    <div className='container-fluid'>
      <div className='row' style={{'height': '100vh'}}>
        <div className='col align-self-start'></div>
          <div className='col align-self-center'>
            <div className='col-sm'>
              <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                Loading...
              </button>
            </div>
          </div>
        <div className='col align-self-end'></div>
      </div>
    </div>
  );
}