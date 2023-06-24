import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Toolbar,
  Typography
} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import Web3 from 'web3';
import { fetchUserEthBalance } from '../api/data';

const pages = ['Borrow', 'Lend', 'Pools'];

export default function Navbar({ setAddress, setEthBalance, setError }) {
  const [search, setSearch] = useState('')
  const handleSearch = () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    if (web3.utils.isAddress(search)) {
      setAddress(search)
      fetchUserEthBalance(search, setEthBalance, setError)
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SPARKLER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-search">Search Address</InputLabel>
            <OutlinedInput
              id="outlined-adornment-search"
              type="text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleSearch}
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
              label="Search Address"
              value={search}
              onChange={e => setSearch(e.currentTarget.value)}
            />
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
