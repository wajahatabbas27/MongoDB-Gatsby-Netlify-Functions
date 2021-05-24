import React, { useEffect, useState } from 'react'

const Index = () => {

  const [myData, setData] = useState({ name: "", age: 0 });

  useEffect(() => {
    (async () => {
      console.log("useEffect Called");
      const response = await fetch(`/.netlify/functions/hello`);
      const data = await response.json();
      setData(data);
      console.log("Data =", JSON.stringify(data));
    })();
  }, []);

  return (
    <div>
      <div>Hello world with Gatsby from Netlify!</div>
      <div>{myData.name}</div>
      <div>{myData.age}</div>
    </div>
  )
}

export default Index
