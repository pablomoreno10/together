function TodoList({ todos, isCaptain, onDelete }) {
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
                    className="ml-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
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
