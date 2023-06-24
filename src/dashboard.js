import React, { useEffect, useState } from "react"
import { Container, Typography } from "@mui/material"

export default function Dashboard({ error, tokenBalance }) {
  const tokens = tokenBalance && tokenBalance.tokens.filter((token) => token.tokenInfo.symbol.length < 6)
  const totalEthValue = tokenBalance && tokenBalance.ETH.balance * tokenBalance.ETH.price.rate
  const totalTokensValue = 
    tokens && tokens
      .filter((token) => token.tokenInfo.price)
      .map((token, _) => (token.balance/(10 ** parseInt(token.tokenInfo.decimals)) * token.tokenInfo.price.rate))
      .reduce((a, b) => a + b)
  

  return (
    <>
      {!error && tokenBalance && (
        <Container>
          <Typography>Total fucking value: US$ {totalEthValue + totalTokensValue}</Typography>
          <Typography>Ethereum Balance: {tokenBalance.ETH.balance} ETH</Typography>
          {tokens.map((token, idx) => (
            <Typography key={idx}>{token.tokenInfo.name} Balance: {token.balance/(10 ** parseInt(token.tokenInfo.decimals))} {token.tokenInfo.symbol}</Typography>
          ))}
        </Container>
      )}
    </>
  )
}