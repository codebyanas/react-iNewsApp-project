import React from 'react'
import loading from './loading.gif'

export default function Spinner() {
  return (
    <div>
      <div className="text-center my-4">
        <img className="loading" src={loading} alt="loading" />
      </div>
    </div>
  )
}
