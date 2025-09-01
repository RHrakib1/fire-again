import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import auth from './Firebase.config'
import { Link } from 'react-router-dom'

export default function Login() {
    const [user, setuser] = useState()
    const [success, setsuccess] = useState('')
    const [error, seterror] = useState('')
    const emailref = useRef(null)

    const hendleloginform = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)


        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setuser(result.user)
                seterror('')
                setsuccess('you have successfully Login our fire')
            })
            .catch(error => {
                console.log(error)
                seterror(error.message)
                setsuccess('')
            })


    }

    const hendleforgetpassword = () => {

        const email = emailref.current.value
        if (!email) {
            console.log('send email', email)
            return
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('please check your email then reset password')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={hendleloginform}>
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input
                                        name='email'
                                        type="email"
                                        className="input"
                                        placeholder="Email"
                                        ref={emailref}
                                    />
                                    <label className="label">Password</label>
                                    <input name='password' type="password" className="input" placeholder="Password" />
                                    <div><a onClick={hendleforgetpassword} className="link link-hover">Forgot password?</a></div>
                                    <button className="btn btn-neutral mt-4">Login</button>
                                    {
                                        success && <p className='text-green-600 text-sm'>{success}</p>
                                    }
                                    {
                                        error && <p className='text-red-600'>{error}</p>
                                    }
                                    <p>New to our website? Please <Link className='underline font-semibold' to='/register'>Register now</Link></p>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
