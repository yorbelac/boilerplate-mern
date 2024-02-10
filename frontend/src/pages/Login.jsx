//this page is called below the header if user or app navigates to /login
//it contains the login form and submits to the redux store state tree ( i think )

//useState and useEffect from react. Still not sure what useEffect does. useSelector accesses redux state, useDispatch accesses redux functions (reducers).
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//useNavigate can load urls
import { useNavigate } from 'react-router-dom'
//here's toast again but no css?
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
//imports login and reset functions from the authSlice
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {

  //new state for the login formData, an object with two key pairs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  //lets break those two key pairs into  variables. 
  //Really I did not realize that you could just refer to the key in an array and it will variable the value in this syntax. Useful but not intuitive at all.
  const { email, password } = formData

  //condense useThis into just this for navigate and dispatch
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //once again loading a pile of variables from the redux state.auth remember is useSelector((state)=>state.$). The user is the important one here.
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  //lets check these variables. If there is any error, say so.
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    //if there is already a user logged in, or if isSuccess (which triggers on successful login) is true, then just send me to the dashboard ('/')
    if (isSuccess || user) {
      navigate('/')
    }

    //now lets reset the state.auth to initialState
    dispatch(reset())

    //don't forget all your dependencies man there are a lot of them here. How do you decide what is a dependency? 
    //Is it just literally every variable called in the function? isLoading isn't in here, but... wow its never called within this useEffect
  }, [user, isError, isSuccess, message, navigate, dispatch])

  //this function allows typing in state associated form fields by instructing the state to update to what was typed when it is typed.
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  //when submitted (via ENTER or button press) the form below triggers this function.
  const onSubmit = (e) => {
    
    //do not reload the page
    e.preventDefault()

    //create userData object from the two form fields
    const userData = {
      email,
      password,
    }

    //login function is called from the authSlice and passed in the userData object with the form field results.
    dispatch(login(userData))
  }

  //there's isLoading. No useEffect down here? Really why not?
  if (isLoading) {
    return <Spinner />
  }

  //alright here's the ui
  return (
    <>

      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      {/* LOGIN FORM */}
      <section className='form'>
        <form onSubmit={onSubmit}>

          {/* EMAIL */}
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>

          {/* PASSWORD */}
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>

        </form>
      </section>
    </>
  )
}

export default Login
