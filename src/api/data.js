import axios from "axios"

export function fetchUserTokenBalance(address, setUserTokenBalance, setError) {
  axios.get(
    `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-vbqVb-TifsdCd-b7JWA`
  )
    .then(r => setUserTokenBalance(r.data))
    .catch(e => setError(e.message))
}

export function fetchUserTransfers(address, setUserTransfers, setError) {
  axios.get(
    `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&apikey=K61238HM8XT4DNHR8H9GBQ3PQXVE87WFI9`
  )
    .then(r => setUserTransfers(r.data))
    .catch(e => setError(e.message))
}

export function fetchMacroScore(address, setMacroScore, setError) {
  const config = {
    headers: { 
      Authorization: 'Bearer SFMyNTY.g2gDbQAAACQ5NWFiOGM1MC1jMGI2LTRhMTEtYjAxYS1iYTgzZGE2MDM3YWNuBgCvT8TviAFiAAFRgA.z0ykesrdpu8li9UqUH52K-_jB4c9Ud2NwjIE07SGZfk'
    }
  }
  axios.post(`https://api.spectral.finance/api/v1/addresses/${address}/calculate_score`, '', config)
    .catch(e => setError(e.message))
  axios.get(`https://api.spectral.finance/api/v1/addresses/${address}`, config)
    .then(r => setMacroScore(r.data))
    .catch(e => setError(e.message))
}