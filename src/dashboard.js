import React, { useEffect, useState } from "react";
import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import ValueCard from "./components/card";
import WebGraph from "./components/demographic/WebGraph";
import PieChart from "./components/demographic/PieChart";

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
    title: `${token.tokenInfo.name.toUpperCase().substring(0, 22)} BALANCE`,
    value: `${(token.balance/(10 ** parseInt(token.tokenInfo.decimals))).toFixed(6)} ${token.tokenInfo.symbol}`
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
  const tokenTransfers = macroScore && [
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
              <Grid key={idx} item xs={4}>
                <ValueCard title={item.title} value={item.value} />
              </Grid>
            ))}
          </Grid>
          <Grid container wrap="no-wrap" spacing={2} sx={{ pb: 2, overflow: 'scroll' }}>
            {balances.map((item, idx) => (
              <Grid key={idx} item xs={3}>
                <ValueCard title={item.title} value={item.value} />
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
              <Grid key={idx} item xs={4}>
                <ValueCard title={item.title} value={item.value} graph={<WebGraph width={340} height={340} data={[1, 2, 3, 4, 5, 6, 7]} />} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {!error && transfers && macroScore && (
        <Box sx={{ pt: 2 }}>
          <Typography variant="h5" sx={{ mr: 1 }}>Transfers</Typography>
          <Grid container spacing={2} sx={{ py: 2 }}>
            {tokenTransfers.map((item, idx) => (
              <Grid item xs={4}>
                <ValueCard key={idx} title={item.title} value={item.value} graph={<PieChart width={340} height={340} />} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {error && <Typography>{error}</Typography>}
    </Container>
  )
}
