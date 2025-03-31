import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  const toggleStatus = (task) => {
    const updatedStatus = !task.status;
    const config = {
      url: `/tasks/${task._id}`,
      method: "put",
      headers: { Authorization: authState.token },
      data: { status: updatedStatus },
    };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">
        {tasks.length !== 0 && <h2 className='my-2 ml-2 md:ml-0 text-xl'>Your tasks ({tasks.length})</h2>}
        
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (
              <div className='w-[600px] h-[300px] flex items-center justify-center gap-4'>
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2">
                  + Add new task
                </Link>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div key={task._id} className='bg-white my-4 p-4 text-gray-600 rounded-md shadow-md'>
                  <div className='flex items-center'>

                    <span className='font-medium'>Task #{index + 1}</span>

                    <Tooltip text="Toggle Completion" position="top">
                      <span 
                        className={`ml-4 cursor-pointer ${task.status ? 'text-green-600' : 'text-gray-400'}`} 
                        onClick={() => toggleStatus(task)}
                      >
                        <i className={`fa-solid fa-check-circle ${task.status ? '' : 'opacity-50'}`}></i>
                      </span>
                    </Tooltip>

                    <Tooltip text="Edit this task" position="top">
                      <Link to={`/tasks/${task._id}`} className='ml-auto mr-2 text-green-600 cursor-pointer'>
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text="Delete this task" position="top">
                      <span className='text-red-500 cursor-pointer' onClick={() => handleDelete(task._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>

                  </div>

                  <div className='whitespace-pre'>{task.description}</div>
                  
                  <div className='mt-2 text-sm text-gray-500'>
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    <span className={`ml-4 font-medium ${task.status ? 'text-green-500' : 'text-red-500'}`}>
                      {task.status ? 'Completed' : 'Pending'}
                    </span>
                    <span className={`ml-4 font-medium ${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                      Priority: {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
