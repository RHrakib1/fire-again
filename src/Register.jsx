import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import auth from './Firebase.config'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


export default function Register() {

    const provider = new GoogleAuthProvider()
    const [user, setuser] = useState()
    const [success, setsuccess] = useState('')
    const [error, seterror] = useState('')
    const [showpassword, setshowpassword] = useState(false)


    //provider on google
    const googleAuth = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                setuser(result.user)
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const googlesignout = () => {
        signOut(auth)
            .then(result => {
                setuser(result)
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // provider on simpleuser

    const hendlesubmit = e => {
        e.preventDefault()
        const sub = e.target
        const email = sub.email.value
        const password = sub.password.value
        const terams = sub.terams.checked
        const obj = { email, password, terams }
        console.log(obj)

        if (password.length < 6) {
            seterror('Password should be at least 6 characters')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            seterror('please enter a minimun 1 largest alfabat')
            return
        }
        else if (!terams) {
            seterror('please accept our condition')
            return
        }

        seterror('')
        setsuccess('')


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setuser(result.user)
                console.log(result.user)
                seterror('')
                setsuccess('you have successfully register by agun')
            })
            .catch(error => {
                console.log(error.message)
                seterror(error.message)
                setsuccess('')
            })
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register hare</h1>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={hendlesubmit}>
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input name='email' type="email" className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <div className='relative'>
                                        <input name='password' type={showpassword ? 'text' : 'password'} className="input" placeholder="Password" />
                                        <span className='absolute top-3 right-5.5 cursor-pointer' onClick={() => setshowpassword(!showpassword)}>{showpassword ? <FaEye /> : <FaEyeSlash />}</span><br /><br />
                                        <input type="checkbox" name='terams' id="terms" />
                                        <label className="ml-2">Accept our trems and condition</label>
                                    </div>

                                    <button type='submit' className="btn btn-neutral mt-4">Register</button>
                                    <button onClick={googleAuth} className="btn btn-neutral mt-4">Google With Regisster</button>
                                    <button onClick={googlesignout} className="btn btn-neutral mt-4">Google singout</button>
                                    {
                                        success && <p className='text-green-600 text-sm'>{success}</p>
                                    }
                                    {
                                        error && <p className='text-red-600'>{error}</p>
                                    }
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div>
                        {
                            user && <div>
                                <h2>Name: {user.displayName}</h2>
                                <h4>Email: {user.email}</h4>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
