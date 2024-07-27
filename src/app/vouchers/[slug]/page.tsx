import React from 'react'

function page({ params }) {
  return (
    <div><center>Vouchers : { params.slug }</center></div>
  )
}

export default page