function TodoList({ todos, isCaptain, onDelete, toggleTodoCompletion, userId  }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
      {Array.isArray(todos) && todos.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {todos.map((todo) => (
            <li key={todo._id}>
              <p className="font-medium">{todo.title}</p>
              {todo.description && (
                <p className="text-sm text-gray-600">{todo.description}</p>
              )}
                {todo.dueDate && (
                    <p className="text-sm text-gray-500">
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </p>
                )}
                {isCaptain && (
                  <button
                    onClick={() => onDelete(todo._id)}
                    className="ml-2 text-wine hover:text-espresso text-sm"
                  >
                    Delete
                  </button>
                )}
              <button
              onClick={() => toggleTodoCompletion(todo._id)}
              className={`ml-2 text-sm ${
                todo.completedBy?.some(user => user._id === userId)
                  ? 'text-pewter'
                  : 'text-gray-500'
                } hover:text-wine`}
              >
                {todo.completedBy?.some(user => user._id === userId)
                  ? 'Mark Incomplete'
                  : 'Mark Complete'}
              </button>

              {Array.isArray(todo.completedBy) && todo.completedBy.length > 0 && (
                <p className="text-xs text-gray-500">
                  Completed by: {todo.completedBy.map(user => user.name).join(', ')}
                </p>
              )}
                
            </li>
          ))}
        </ul>
      ) : (
        <p>No to-dos available for now.</p>
      )}
    </div>
  );
}

export default TodoList;
