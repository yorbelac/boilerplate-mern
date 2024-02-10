//GoalForm (simple form)

//modules/libraries
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

//component
function GoalForm() {

  const dispatch = useDispatch()

  //state
  const [text, setText] = useState('')

  //submit goal form
  const onSubmit = (e) => {    
    e.preventDefault() //prevent page reload    
    dispatch(createGoal({ text })) //redux create goal
    setText('') //clear state.text
  }

  //ui
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>

        {/* TEXT */}
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            //enables state update when typing
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>

      </form>
    </section>
  )
}

export default GoalForm
