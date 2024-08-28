import React from 'react'
import Auth from '../../components/Auth/Auth'

export default function Login() {
  return (
    <div>
        <Auth
            comp="Login"
            bgColor="var(--color-bg-auth)"
            btnColor="var(--color-btn-auth)"
        ></Auth>
    </div>
  )
}
