import { useEffect, useState } from "react";

function DBentries() {

  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    fetch("http://localhost:5000/api/entries")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEntries(data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `http://localhost:5000/api/entries/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await res.json();

      if (data.success) {
        loadEntries();
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditData(entry);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {

    try {

      const res = await fetch(
        `http://localhost:5000/api/entries/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editData)
        }
      );

      const data = await res.json();

      if (data.success) {
        setEditingId(null);
        loadEntries();
      }

    } catch (err) {
      console.log(err);
    }

  };

  return (

    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >
        DB Entries
      </h1>

      {entries.map((entry) => (

        <div
          key={entry._id}
          className="entry-card"
          style={{
            position: "relative",
            background: "white",
            padding: "20px",
            marginBottom: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,.15)"
          }}
        >

          <div className="actions">

            <button
              onClick={() => handleEdit(entry)}
            >
              Modify
            </button>

            <button
              onClick={() => handleDelete(entry._id)}
            >
              Delete
            </button>

          </div>

          {editingId === entry._id ? (

            <>

              <input
                name="location"
                value={editData.location}
                onChange={handleChange}
              />

              <input
                name="bhk"
                value={editData.bhk}
                onChange={handleChange}
              />

              <input
                name="area"
                value={editData.area}
                onChange={handleChange}
              />

              <input
                name="bathrooms"
                value={editData.bathrooms}
                onChange={handleChange}
              />

              <input
                name="predictedPrice"
                value={editData.predictedPrice}
                onChange={handleChange}
              />

              <br /><br />

              <button onClick={handleSave}>
                Save
              </button>

              <button
                onClick={() => setEditingId(null)}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>

            </>

          ) : (

            <>

              <h3>{entry.location}</h3>

              <p><b>BHK:</b> {entry.bhk}</p>

              <p><b>Area:</b> {entry.area} sqft</p>

              <p><b>Bathrooms:</b> {entry.bathrooms}</p>

              <p><b>Price:</b> ₹ {entry.predictedPrice} Lakhs</p>

            </>

          )}

        </div>

      ))}

    </div>

  );

}

export default DBEntries;