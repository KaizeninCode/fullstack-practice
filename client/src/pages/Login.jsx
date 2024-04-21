import React from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as yup from 'yup'

const Login = () => {
  const navigate = useNavigate()


  const formSchema = yup.object().shape({
    email: yup.string().email().required('Please enter an email')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    }, 
    validationSchema: formSchema,
    onSubmit: () => navigate('/')
  })

  const inputFields = [
    {
      name:'Email',
      id:'email'
    },
    {
      name:'Password',
      id:'password'
    }
    
  ]
  return (
    <section className='w-full min-h-screen'>
      <div>
        <h2 className='font-nunito text-5xl text-white text-center pt-24 mb-6'>Log In</h2>
        <form onSubmit={formik.handleSubmit} className='flex flex-col w-1/4 m-auto'>
         {inputFields.map(field =>(
              field.name === 'Password'?
              <>
                <label htmlFor={field.id} className='text-white font-nunito text-lg'>{field.name}</label>
                <input type="password" name={field.id} id={field.id} className='p-1 rounded-xl font-noto mb-5 focus:outline-none px-3' onChange={formik.handleChange}/>
              </>
              :
              <>
                <label htmlFor={field.id} key={field.id} className='text-white font-nunito text-lg'>{field.name}</label>
                <input type="text" name={field.id} id={field.id} className='p-1 rounded-xl font-noto mb-5 focus:outline-none px-3' onChange={formik.handleChange}/>
              </>
          ))}
          <button type="submit" className='p-1 text-white text-center font-noto text-lg border rounded-xl w-1/4 m-auto hover:bg-white hover:text-purple-500 hover:font-bold ease-in-out duration-500 mt-5'>Log In</button>
        </form>
      </div>
    </section>
  )
}

export default Login
