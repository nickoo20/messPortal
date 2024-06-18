import axios from 'axios';
import { useState } from 'react';

const GenerateBill = () => {
  const [month,setmonth]=useState('');
  const [year,setyear]=useState('');
  const [bill,setbill]=useState(null);
  const handleSubmit=async()=>{
    const res=await axios.get("http://localhost:8080/api/bills/studentbill", {withCredentials: true,
    params: {
      month,
      year
    },
  })
    console.log(res);
  }
  return(
    <div>
        <form onSubmit={handleSubmit}>

            <input name="month" value={month}
            placeholder="Enter month"
            type="number"
             onChange={(e)=>setmonth(e.target.value)}
            />

            <input name="year" value={year}
            placeholder="Enter year"
            type="number"
             onChange={(e)=>setyear(e.target.value)}
            />
            <button type="submit">Fetch</button>
        </form>
    </div>
  )
}

export default GenerateBill;