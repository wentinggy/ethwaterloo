import React, { useEffect, useState } from "react"
import Navbar from "./components/navbar"
import { Box } from "@mui/material"
import Dashboard from "./dashboard"

export default function App() {
  const [address, setAddress] = useState('')
  const [ethBalance, setEthBalance] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log(ethBalance)
  }, [ethBalance])

  return (
    <Box>
      <Navbar setAddress={setAddress} setEthBalance={setEthBalance} setError={setError} />
      <Dashboard error={error} ethBalance={ethBalance} />
    </Box>
  )
}
