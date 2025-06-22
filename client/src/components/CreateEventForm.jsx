function CreateEventForm({ onSubmit, onCancel, title, setTitle, location, setLocation, date, setDate, notes, setNotes }) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border" />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-2 border" />
      <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full p-2 border" />
      <textarea placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border" />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Create</button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
      </div>
    </form>
  );
}

export default CreateEventForm;
