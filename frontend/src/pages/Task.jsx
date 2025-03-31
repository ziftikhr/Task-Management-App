import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Input, { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {
  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
    dueDate: "",
    status: false,
    priority: "medium"
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({
          description: data.task.description,
          dueDate: data.task.dueDate.split("T")[0], // Formatting for date input
          status: data.task.status,
          priority: data.task.priority
        });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      description: task.description,
      dueDate: task.dueDate.split("T")[0], // Reset formatted date
      status: task.status,
      priority: task.priority
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = {
      url: mode === "add" ? "/tasks" : `/tasks/${taskId}`,
      method: mode === "add" ? "post" : "put",
      data: formData,
      headers: { Authorization: authState.token }
    };

    fetchData(config).then(() => navigate("/"));
  };

  const fieldError = field => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <>
      <MainLayout>
        <form className='m-auto my-16 max-w-[600px] bg-white p-8 border-2 shadow-md rounded-md'>
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className='text-center mb-4'>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>

              {/* Description Field */}
              <div className="mb-4">
                <label htmlFor="description">Description</label>
                <Textarea name="description" id="description" value={formData.description} placeholder="Write here.." onChange={handleChange} />
                {fieldError("description")}
              </div>

              {/* Due Date Field */}
              <div className="mb-4">
                <label htmlFor="dueDate">Due Date</label>
                <Input type="date" name="dueDate" id="dueDate" value={formData.dueDate} onChange={handleChange} />
                {fieldError("dueDate")}
              </div>

              {/* Priority Field */}
              <div className="mb-4">
                <label htmlFor="priority">Priority</label>
                <select name="priority" id="priority" value={formData.priority} onChange={handleChange} className="block w-full p-2 border rounded">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {fieldError("priority")}
              </div>

              {/* Status Field */}
              <div className="mb-4 flex items-center">
                <input type="checkbox" name="status" id="status" checked={formData.status} onChange={handleChange} className="mr-2" />
                <label htmlFor="status">Mark as Completed</label>
              </div>

              {/* Buttons */}
              <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>
                {mode === "add" ? "Add Task" : "Update Task"}
              </button>
              <button className='ml-4 bg-red-500 text-white px-4 py-2 font-medium' onClick={() => navigate("/")}>Cancel</button>
              {mode === "update" && (
                <button className='ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600' onClick={handleReset}>
                  Reset
                </button>
              )}
            </>
          )}
        </form>
      </MainLayout>
    </>
  );
};

export default Task;
