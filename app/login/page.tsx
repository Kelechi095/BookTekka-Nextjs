import React from 'react'
import Wrapper from '../components/Wrapper'
import FormWrapper from '../components/FormWrapper'
import { LoginForm } from './LoginForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Login = async () => {
  const currentUser = await getCurrentUser()
  return (
    <Wrapper>
        <FormWrapper>
            <LoginForm currentUser={currentUser}/>
        </FormWrapper>
    </Wrapper>
  )
}

export default Login