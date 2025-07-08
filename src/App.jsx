import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}pokemon?limit=100000`)
      const json = await res.json();
      setNames(json);
      console.log(json);
    }
    fetchData();
  }, []);

  return (
    <>
      
    </>
  )
}

export default App
