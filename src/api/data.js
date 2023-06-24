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