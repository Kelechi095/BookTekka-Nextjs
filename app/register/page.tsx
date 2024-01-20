import React from 'react'
import Wrapper from '../components/Wrapper'
import FormWrapper from '../components/FormWrapper'
import RegisterForm from './RegisterForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Register = async () => {
  const currentUser = await getCurrentUser()
  return (
    <Wrapper>
        <FormWrapper>
            <RegisterForm currentUser={currentUser}/>
        </FormWrapper>
    </Wrapper>
  )
}

export default Register