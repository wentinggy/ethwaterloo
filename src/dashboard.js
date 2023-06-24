import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"

export default function Dashboard({ error, ethBalance, tokenBalance }) {

  return (
    <>
      {!error && (
        <Box>
          <Typography>Eth Balance: {ethBalance} eth</Typography>
          <Typography>Token Balance: {ethBalance}</Typography>
        </Box>
      )}
    </>
  )
}