import { useState ,useEffect } from 'react'
import reactLogo from './assets/react.svg';
import { v4 as uuidv4 } from 'uuid';
import './App.css'

// components , props , passing the data from parent to child
// state manangment , useState , useEffect , how to fetch data from external API 
// we also learned about useContext and how to avoid prop drilling - (Global state thing)
// we learned about routing in React - react-router-dom
// we built a project with react - todo list application
// we learned about localstorage and how to store the data in localstorage
// we learned how internet works how your browser sends request to a server
// what is hosting?
// hosted our project on netlify and vercel





// Git - it is a version control system
// Github - it is a platform where we can store our code




// todo 
// - add to your todo list   
// - {  id: 1, title: 'todo 1', completed: false }
// - deleted text type ui 
// - update to your todo list
// - delete from your todo list

// - storing the data in local storage

// localstorage it stores - the data in key value pair
// "todo-data":""


// 1st load it printed the data and my application also got started
// todos got initialized with [] so useEffect set the localstorage with empty array 


// we got some error the reason was the localstorage was not able to get initial data
// - Netlify   we created a build by running the command npm run build
// - Vercel    we pushed our code to github then we connected our github account with vercel and its just single click deployment

function App() {
  const [todos, setTodos] = useState([])
  const [isLoad,setIsLoad] = useState(false);
  const [todo, setTodo] = useState(''); // input todo

  useEffect(()=>{
    const _todos = JSON.parse(localStorage.getItem('todos'));
    // todos we will get null inside the _todos 
    if(_todos!=null){
      setTodos(_todos);
    }
    setIsLoad(true);
    console.log(_todos);
  },[])

  useEffect(()=>{
    if(isLoad){
      console.log('todos', todos)
      localStorage.setItem('todos',JSON.stringify(todos))
    }
  }, [todos])

  return (
    <div className="App">
      <div className='text-3xl pb-4'>Todo List with React</div>
      <div>
        <div>
          <input className='py-[10px] pl-4 pr-14 rounded-l-md' type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} />
          <button onClick={()=>{
            setTodos((state)=>{
              return [...state, {
                id: uuidv4(),
                title: todo,
                completed: false
              }]
            })
            setTodo('')
          }
          }>
            Add Todo
          </button>
        </div>
        <div className='mt-4'>
          {todos?.map((t)=>{
            return (
              <div key={t.id} className='flex text-2xl justify-center items-center'>
                <div className='flex justify-center space-x-4 items-center'>
                  <input onClick={()=>setTodos((state)=>{
                    const newTodoData = state.map((_t)=>{
                      if(_t.id === t.id){
                        return {
                          ..._t,
                          completed: !_t.completed
                        }
                      }
                      return _t
                    })
                    return newTodoData
                  })} className='' type="checkbox" />
                  <div style={{
                    textDecoration: t.completed ? 'line-through' : 'none'
                  }}>
                    {t.title}
                  </div>
                  <div onClick={()=>setTodos((state)=>{
                    const newTodoData = state.filter((_t)=>{
                      return _t.id !== t.id
                    })
                    return newTodoData
                  })} className='text-sm cursor-pointer hover:bg-red-300 bg-red-200 px-2 py-1 rounded-sm text-black'>
                    Delete
                  </div>
                  <div onClick={
                    ()=>{
                      const newTitle = prompt('Update your todo')
                      setTodos((s)=>{
                        const newTodoList  = s.map((_t)=>{
                          if(_t.id==t.id){
                            return {
                              ..._t,
                              title: newTitle
                            }
                          }
                          return _t
                        })
                        return newTodoList
                      })
                    }
                  } className='text-sm cursor-pointer hover:bg-blue-300 bg-blue-200 px-2 py-1 rounded-sm text-black'>
                    Update
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
