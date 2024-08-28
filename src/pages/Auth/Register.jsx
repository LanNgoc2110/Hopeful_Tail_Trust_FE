import React from 'react'
import Auth from '../../components/Auth/Auth'

export default function Register() {
  return (
    <div>
        <Auth
            comp="Register"
            bgColor="var(--color-bg-auth)"
            btnColor="var(--color-btn-auth)"
        ></Auth>
    </div>
  )
}
