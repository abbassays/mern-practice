import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const onSubmit = () => { }
    const onChange = (event) => {
        setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const { email, password } = formData

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and Set Goals</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit} >
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block' >Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login