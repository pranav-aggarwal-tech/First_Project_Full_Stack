import { useState } from 'react'

function Form(){
    const [formData, setFormData] = useState({
      Location:"",
      BHK:"",
      Area:"",
      Bathrooms:"",
})  
    const handleChange = (event) =>{
        event.preventDefault();
        console.log(event.target.value);
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData,[name]:value});
      console.log(formData);
    };
    const handleSubmit = async(event) =>{
          event.preventDefault();
          
          try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
           body:JSON.stringify(formData)
        

        }

          );
          const data = await res.json();  
          console.log(data);        
    }     
    catch (error) {
        console.log(error);
    }
};
    return(
<>
<form>
<label>Location</label>
<input type="text" name="Location" placeholder="A block" onChange={handleChange}></input>

 <label>BHK</label>
<input type="number" name="BHK" placeholder="A block" onChange={handleChange}></input>

<label>Area</label>
<input type="number" name="Area" placeholder="A block" onChange={handleChange}></input>

 <label>Bathrooms</label>
<input type="Number" name="Bathrooms" placeholder="A block" onChange={handleChange}></input>
<button type="submit">
    ESTIMATE PRICE 
 </button>
</form>

        </>
    );
}
export default Form;