import React, { useEffect, useState } from "react"
import { Box, Chip, Container, Grid, Typography } from "@mui/material"
import ValueCard from "./components/card"

export default function Dashboard({ error, tokenBalance, transfers, macroScore, address }) {
  const tokens = tokenBalance && tokenBalance.tokens && tokenBalance.tokens.filter((token) => token.tokenInfo.symbol.length < 6)
  const totalEthValue = tokenBalance && tokenBalance.ETH.balance * tokenBalance.ETH.price.rate
  const totalTokensValue = tokens 
    ? tokens
      .filter((token) => token.tokenInfo.price)
      .map((token, _) => (token.balance/(10 ** parseInt(token.tokenInfo.decimals)) * token.tokenInfo.price.rate))
      .reduce((a, b) => a + b)
    : 0
  const overview = tokenBalance && [
    {
      title: 'TOTAL WALLET VALUE',
      value: `US$ ${(totalEthValue + totalTokensValue).toFixed(2)}`
    },
    {
      title: 'ETHEREUM BALANCE',
      value: `${tokenBalance.ETH.balance} ETH`
    }
  ]
  const balances = tokens && tokens.map((token, _) => ({
    title: `${token.tokenInfo.name.toUpperCase()} BALANCE`,
    value: `${token.balance/(10 ** parseInt(token.tokenInfo.decimals))} ${token.tokenInfo.symbol}`
  }))
  const risk = macroScore && [
    {
      title: 'WALLET RISK SCORE',
      value: `${macroScore.score}`
    },
    {
      title: 'PROBABILITY OF LIQUIDATION',
      value: `${macroScore.probability_of_liquidation}`
    }
  ]
  const tokenTransfers = transfers && [
    {
      title: 'INFLOW TOKEN COMPOSITION',
      value: `${macroScore.score}`
    },
    {
      title: 'OUTFLOW TOKEN COMPOSITION',
      value: `${macroScore.probability_of_liquidation}`
    }
  ]
  const colors = {
    HIGH_RISK: 'error',
    MEDIUM_RISK: 'warning',
    LOW_RISK: 'success',
    VERY_LOW_RISK: 'success'
  }
  
  const inflowAssetsSum = transfers && transfers.result && transfers.result
  .filter((transfer) => transfer.to === address.toLowerCase())
  .reduce((acc, item) => {
    const { tokenSymbol, value, tokenDecimal } = item;
    acc[tokenSymbol] = (acc[tokenSymbol] || 0) + parseInt(value, 10) / (10 ** tokenDecimal);
    return acc;
  }, {});
  const outflowAssetsSum = transfers && transfers.result && transfers.result
  .filter((transfer) => transfer.from === address.toLowerCase())
  .reduce((acc, item) => {
    const { tokenSymbol, value, tokenDecimal } = item;
    acc[tokenSymbol] = (acc[tokenSymbol] || 0) + parseInt(value, 10) / (10 ** tokenDecimal);
    return acc;
  }, {});
  
  console.log(inflowAssetsSum)
  console.log(outflowAssetsSum)
  return (
    <Container sx={{ pt: 4 }}>
      {address && <Typography variant="h5"><b>Address </b> {address}</Typography>}
      {!error && tokenBalance && (
        <Box sx={{ pt: 2 }}>
          <Typography variant="h5">Assets</Typography>
          <Grid container spacing={2} sx={{ py: 2 }}>
            {overview.map((item, idx) => (
              <Grid item xs={4}>
                <ValueCard key={idx} title={item.title} value={item.value} />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} sx={{ pb: 2 }}>
            {balances.map((item, idx) => (
              <Grid item xs={3}>
                <ValueCard key={idx} title={item.title} value={item.value} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {!error && macroScore && (
        <Box sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h5" sx={{ mr: 1 }}>Wallet Health</Typography>
            <Chip label={macroScore.risk_level.split('_').join(' ')} color={colors[macroScore.risk_level]} />
          </Box>
          <Grid container spacing={2} sx={{ py: 2 }}>
            {risk.map((item, idx) => (
              <Grid item xs={4}>
                <ValueCard key={idx} title={item.title} value={item.value} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {!error && transfers && (
        <Box sx={{ pt: 2 }}>
          <Typography variant="h5" sx={{ mr: 1 }}>Transfers</Typography>
          <Grid container spacing={2} sx={{ py: 2 }}>
            {tokenTransfers.map((item, idx) => (
              <Grid item xs={4}>
                <ValueCard key={idx} title={item.title} value={item.value} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {error && <Typography>{error}</Typography>}
    </Container>
  )
}