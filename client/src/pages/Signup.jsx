import React from 'react'
import { useNavigate } from 'react-router'
import { useFormik } from 'formik'
import * as yup from 'yup'

const Signup = () => {
  const navigate = useNavigate()


  const formSchema = yup.object().shape({
    name: yup.string().required('Please enter a name'),
    email: yup.string().email().required('Please enter an email')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    }, 
    validationSchema: formSchema,
    onSubmit: values => {
      fetch('http://localhost:5555/users', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(values)
      })
      .then(() => navigate('/login'))
    }
  })

  const inputFields = [
    {
      name:'Name',
      id:'name'
    },
    {
      name:'Email',
      id:'email'
    },
    {
      name:'Password',
      id:'password'
    },
    {
      name:'Confirm Password',
      id:'confirm_password'
    },
  ]
  return (
    <section className='w-full min-h-screen'>
      <div className='m-auto'>
        <h2 className='font-nunito text-5xl text-white text-center pt-16 mb-6'>Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className='flex flex-col w-1/4 m-auto'>
          {inputFields.map(field =>(
            field.name === 'Password' || field.name === 'Confirm Password'?
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
          <button type="submit" className='p-1 text-white text-center font-noto text-lg border rounded-xl w-1/4 m-auto hover:bg-white hover:text-purple-500 hover:font-bold ease-in-out duration-500 mt-5'>Sign Up</button>
        </form>
      </div>
    </section>
  )
}

export default Signup
