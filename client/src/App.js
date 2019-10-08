import React, { useReducer } from 'react'
import './App.css'

const ADD_TODO = 'ADD_TODO'
const MARK_TODO = 'MARK_TODO'
const DELETE_COMPLETED_TODOS = 'DELETE_TODOS'

const initialState = [
  { id: 1, task: 'write code', completed: false },
  { id: 2, task: 'buy groceries', completed: false },
  { id: 3, task: 'buy laptop', completed: false }
]

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload]
    case MARK_TODO:
      console.log(action.payload)
      return state.map(todo => {
        if (todo.id !== action.payload.id) return todo
        return {
          id: todo.id,
          task: todo.task,
          complete: action.payload.isComplete
        }
      })
    case DELETE_COMPLETED_TODOS:
      return state.filter(todo => todo.completed === false)
    default:
      return state
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(reducer, initialState)

  const markTodo = (id, isComplete) => () => {
    dispatch({
      type: MARK_TODO,
      payload: { id, isComplete }
    })
  }

  const addTodo = e => {
    e.preventDefault()
    const newTodo = e.target.elements[0].value
    dispatch({
      type: ADD_TODO,
      payload: {
        id: Date.now(),
        task: newTodo,
        completed: false
      }
    })
  }

  const deleteCompleted = () => {
    dispatch({ type: DELETE_COMPLETED_TODOS })
  }

  return (
    <div className='App'>
      <h1>Todo app</h1>
      <ul>
        {todos.map(todo => (
          <div
            key={todo.id}
            className={todo.complete ? 'completed' : 'not-completed'}
          >
            <li>
              {todo.task}{' '}
              <span>
                <button onClick={markTodo(todo.id, true)}>Mark complete</button>
                <button onClick={markTodo(todo.id, false)}>
                  Mark incomplete
                </button>
              </span>
            </li>
          </div>
        ))}
      </ul>
      <form onSubmit={addTodo}>
        <input type='text' />
        <button>Add Todo</button>
      </form>
      <button onClick={deleteCompleted}>Delete Completed</button>
    </div>
  )
}

export default App
