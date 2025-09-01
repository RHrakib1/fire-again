import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import auth from './Firebase.config'

export default function Login() {
    const [user, setuser] = useState()
    const [success, setsuccess] = useState('')
    const [error, seterror] = useState('')

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
                                    <input name='email' type="email" className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input name='password' type="password" className="input" placeholder="Password" />
                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <button className="btn btn-neutral mt-4">Login</button>
                                    {
                                        success && <p>{success}</p>
                                    }
                                    {
                                        error && <p>{error}</p>
                                    }
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
