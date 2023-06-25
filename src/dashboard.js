import React, { useEffect, useState } from "react"
import { Container, Typography } from "@mui/material"

export default function Dashboard({ error, tokenBalance, transfers, macroScore }) {
  const tokens = tokenBalance && tokenBalance.tokens && tokenBalance.tokens.filter((token) => token.tokenInfo.symbol.length < 6)
  const totalEthValue = tokenBalance && tokenBalance.ETH.balance * tokenBalance.ETH.price.rate
  const totalTokensValue = tokens 
    ? tokens
      .filter((token) => token.tokenInfo.price)
      .map((token, _) => (token.balance/(10 ** parseInt(token.tokenInfo.decimals)) * token.tokenInfo.price.rate))
      .reduce((a, b) => a + b)
    : 0
  

  return (
    <>
      {!error && tokenBalance && (
        <Container>
          <Typography>Total fucking value: US$ {totalEthValue + totalTokensValue}</Typography>
          <Typography>Ethereum Balance: {tokenBalance.ETH.balance} ETH</Typography>
          {tokens && tokens.map((token, idx) => (
            <Typography key={idx}>{token.tokenInfo.name} Balance: {token.balance/(10 ** parseInt(token.tokenInfo.decimals))} {token.tokenInfo.symbol}</Typography>
          ))}
        </Container>
      )}
      {!error && macroScore && (
        <Container>
          <Typography>Wallet Risk Score: {macroScore.score}</Typography>
          <Typography>Wallet Risk Level: {macroScore.risk_level.split('_').join(' ')}</Typography>
          <Typography>Wallet Probability of Liquidation: {macroScore.probability_of_liquidation}</Typography>
        </Container>
      )}
      {error && <Typography>{error}</Typography>}
    </>
  )
}