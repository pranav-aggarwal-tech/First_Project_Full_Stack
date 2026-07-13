import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HousePriceForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: "",
    bhk: "",
    area: "",
    bathrooms: ""
  });

  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
console.log("Event is ::::::::",event.target.name);
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    console.log("Sending Data:", formData);

    try {

      const res = await fetch( "http://localhost:5000/api/predict",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      console.log("Response Received:", data);

      setResponse(data);

      alert("Data Sent Successfully!");

    } catch (error) {

      console.log(error);

      alert("Error while sending data");

    }

  };

  return (

    <div className="container">

     <form onSubmit={handleSubmit}>

        <div className="grid">

          <div className="input-box">

            <label>LOCATION</label>

            <input
              type="text"
              name="location"
              placeholder="1st A block"
              value={formData.location}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <label>BHK</label>

            <input
              type="number"
              name="bhk"
              placeholder="Enter BHK"
              value={formData.bhk}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <label>AREA (sqft)</label>

            <input
              type="number"
              name="area"
              placeholder="Enter Area"
              value={formData.area}
              onChange={handleChange}
            />

          </div>

          <div className="input-box">

            <label>BATHROOMS</label>

            <input
              type="number"
              name="bathrooms"
              placeholder="Enter Bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
            />

          </div>

        </div>

        <button type="submit">
          ESTIMATE PRICE
        </button>

      </form>

      {response && (
    <div className="response">
        <h2>Estimated House Price</h2>

        <h1>
            ₹ {response.data.predictedPrice} Lakhs
        </h1>
    </div>
)}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: "20px",
  }}
>
  <button
    type="button"
    onClick={() => navigate("/db-entries")}
    style={{
      padding: "12px 30px",
      backgroundColor: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "0.3s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
  >
    View DB Entries
  </button>
</div>

    </div>

  );

}

export default HousePriceForm;