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
      <h1 className='font-nunito xl:text-7xl md:text-4xl lg:text-6xl text-2xl text-center text-white font-extrabold pt-5'>SKITTLES</h1>
      <hr />
      <div className='lg:w-3/5 w-full flex flex-wrap  justify-center gap-10 m-auto'>    
          {users.map(u => (
            <div className='lg:w-[80%] w-full flex items-center justify-start text-left max-sm:flex-col max-md:m-auto' key={u.id}>
                <h3 className='font-noto lg:text-xl text-md text-white mb-2 ml-6 mr-auto max-md:text-center font-bold'>{u.name}</h3>
                <p className='font-nunito text-sm max-md:hidden mr-8 text-white hover:text-lime-400'>{u.email}</p>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Home
