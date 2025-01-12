import { useEffect, useState } from 'react'
import './App.css'
import { db } from './firebase'
import { collection, doc, getDocs, deleteDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";

function App() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const fetchTasks = async () => {
    const collectionRef = collection(db, 'tasks');
    const querySnapshot = await getDocs(collectionRef);

    const tasks = querySnapshot.docs.map((task) => ({
      id: task.id,
      ...task.data()
    }))
    setTasks(tasks)
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {

    const docRef = doc(db, 'tasks', id)
    await deleteDoc(docRef)

    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id))
  }

  const addTask = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, 'tasks');
    await addDoc(collectionRef, {
      title: title,
      body: body,
      status: 'pending'
    })
    setTitle('')
    setBody('')
    alert('Task added')
  }

  const handleStatus = async (id) => {
    try {
      const itemRef = doc(db, 'tasks', id);
      const currentTask = await getDoc(itemRef);
      const currentStatus = currentTask.data().status;
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

      await updateDoc(itemRef, {
        status: newStatus,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className="formStyle">
        <h3>ADD TASK</h3>
        <form onSubmit={addTask}>
          <input type="text" name="title" id="title" placeholder="Title" value={title} required onChange={(e) => setTitle(e.target.value)} />
          <textarea name="description" id="description" placeholder="Description" value={body} required onChange={(e) => setBody(e.target.value)}></textarea>
          <button type="submit" onClick={() => { setTimeout(() => { window.location.reload() }, 1500) }}>ADD</button>
        </form>
      </div>

        {
          tasks.map((task) => (
            <div key={task.id} className="displayContainer">
              <h3><u>TASK</u></h3>
              <div>
                <b>Title : </b>{task.title}
              </div>
              <div>
                <b>Description : </b>{task.body}
              </div>
              <div >
                <b>Status : </b>
                <button onClick={() => {handleStatus(task.id)}}>
                  {task.status}
                </button>
              </div>
              <br></br>
              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>

          )) 
        }
      
      
    </>
  )
}

export default App