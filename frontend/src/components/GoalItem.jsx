//GoalItem displays a single item

//modules/libraries
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

//component
function GoalItem({ goal }) {

  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US',{day:'2-digit', month: 'short', year:'numeric'})}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>X</button>
    </div>
  )
}

export default GoalItem
