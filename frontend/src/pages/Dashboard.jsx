//Dashboard (logged-in base)

//modules/libraries
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//pages/components
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'

//redux global state
import { getGoals, reset } from '../features/goals/goalSlice'

//component
function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //redux/global state
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  useEffect(() => {

    if (isError) { //isError from state.goals
      console.log(message)
    }

    if (!user) { //validate user or nav to login
      navigate('/login')
    }

    //get user's goals
    dispatch(getGoals())

    return () => { //goalSlice.reset() on component unmount
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) { //goals.isLoading ? Spinner
    return <Spinner />
  }

  //ui
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
