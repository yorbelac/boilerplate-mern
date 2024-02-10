//Header.js contains nav and login/register toggle

//modules/libraries
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

//pages/components/assets
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  //global state
  const { user } = useSelector((state) => state.auth)

  //onLogout triggers redux logout+reset and nav to index
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  return (

    <header className='header'>

      {/* Logo */}
      <div className='logo'>
        <Link to='/'>workpool.app</Link>
      </div>

      {/* navigation menu */}
      <ul>
        {user ? (
          // if user check succeeded and user exists in redux state show logout button (why button? The other two aren't buttons)
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          //if user check failed and no user in redux state show login and register. set in fragment so to be single element I guess is needed for ternary cases.
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>

    </header>
  )
}

export default Header
