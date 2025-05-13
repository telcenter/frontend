import { Button } from "antd"
import { useState } from "react"

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button onClick={() => setCount(x => x+1)}>Hello {count}</Button>
    </>
  )
}

export default Home;
