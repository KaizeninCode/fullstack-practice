import React, { useEffect, useState } from 'react'

const Home = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:5555/users')
        .then(r => r.json())
        .then(data => setUsers(data))
    }, [])

  return (
    <section className='w-full min-h-screen'>
      <h1 className='font-nunito text-7xl text-center text-white font-extrabold pt-5'>SAMPLE FULLSTACK PROJECT</h1>
      <div className='w-3/5 flex flex-wrap  justify-center gap-10 m-auto'>    
          {users.map(u => (
            <div className='w-[80%] border flex items-center justify-start text-left' key={u.id}>
                <h3 className='font-noto text-xl text-white mb-2 ml-6 mr-auto'>{u.name}</h3>
                <p className='font-nunito text-sm mr-8 text-white hover:text-lime-400'>{u.email}</p>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Home
