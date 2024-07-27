import React from 'react'

function addSaleHeader() {
  return (
    
    <div className="dashboard-content-wrap">
      <div className="dashboard-bread dashboard--bread dashboard-bread-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="breadcrumb-content">
                <div className="section-heading">
                  <h2 className="sec__title font-size-30 text-white">add Sale</h2>
                </div>
              </div>{/* end breadcrumb-content */}
            </div>{/* end col-lg-6 */}
            <div className="col-lg-6">
              <div className="breadcrumb-list text-right">
                <ul className="list-items">
                  <li><a href="/" className="text-white">Home</a></li>
                  <li>Dashboard</li>
                  <li>Sales</li>
                </ul>
              </div>{/* end breadcrumb-list */}
            </div>{/* end col-lg-6 */}
          </div>{/* end row */}
        </div>
      </div>{/* end dashboard-bread */}
      </div>

  )
}

export default addSaleHeader