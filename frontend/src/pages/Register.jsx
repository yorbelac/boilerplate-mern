//largely the same as the login form here, but with some additional fields, and dispatches the register reducer instead of the login reducer
//am i saying that right?

//useState you know well, useEffect is apparently so be able to trigger logic after the render, not resulting from an action? I think. https://reactjs.org/docs/hooks-effect.html
import { useState, useEffect } from 'react'
//useSelector retrieves data from redux store states. useDispatch calls functions from redux reducers
import { useSelector, useDispatch } from 'react-redux'
//useNavigate calls urls
import { useNavigate } from 'react-router-dom'
//pretty error ui
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
//authSlice contains our login and registration reducers, bring't in register and reset
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

//allocate a new state for the formData, as an object with four key pairs. Its a function, so it isn't called until the form is submitted
function Register() {

  //new state for the form data set to object with four keypairs, one for each form element
  //these are made 'settable' by onChange down below
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  //destructure the formData into four variables. These are null until submitted right?
  const { name, email, password, password2 } = formData

  //nav and dispatch reporting in
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //gather and variable all relevant elements of the state.auth from the store.
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  //here we go with the post render effects.
  useEffect(() => {
    //if isError = TRUE then say so
    if (isError) {
      toast.error(message)
    }

    //if isSuccess or user is found send to the dashboard
    if (isSuccess || user) {
      navigate('/')
    }

    //but if neither of those is true then reset state.auth to initialState.
    dispatch(reset())

    //include dependent variables, maybe its... trigger this useEffect if these variables change? Documentation said that useEffects were /always/ triggered after DOM update.
  }, [user, isError, isSuccess, message, navigate, dispatch])

  // update formData to what is being typed when it is being typed
  // this works by setFormData (which is an object) being set to spread across (leave alone) all values not specifically addressed using (prevState)
  // and then by setting only the form value for the changing element, identified by e.target.name (event target)'s value.
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  //form submission
  const onSubmit = (e) => {
    
    //dont relaod the page
    e.preventDefault()

    //if the two password fields do not match, say so
    if (password !== password2) {
      //oh its toast, nice. It actually looks great when it pops up. What a useful little utility. Stuff like this really excites me. Building a big
      //library of modules that extend functionality in beautiful ways and just make things more easy and automatic. I mean glory glory.
      toast.error('Passwords do not match')
    } else {
      //all good? create userData object with the first three form fields.
      const userData = {
        name,
        email,
        password,
      }

      //send the userData object to the authSlice.register
      dispatch(register(userData))

    }
  }

  //hi lonely little loading spinner. Wonder why you aren't inside the useEffect
  if (isLoading) {
    return <Spinner />
  }

  //maybe its because it returns a component, so it sits down here with the other return.
  //then honestly is useEffect really necessary then!? If it still works?
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
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

export default Register
