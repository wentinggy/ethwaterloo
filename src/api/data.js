import axios from "axios"

const ETH_DECIMAL = 1000000000000000000

export function fetchUserEthBalance(address, setUserEthBalance, setError) {
  axios.get(
    `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=K61238HM8XT4DNHR8H9GBQ3PQXVE87WFI9`
  )
  .then(r => setUserEthBalance(parseInt(r.data.result)/ETH_DECIMAL))
  .catch(e => setError(e.message))
}
  

export function fetchUserTokenBalance(address, setUserTokenBalance, setError) {
  axios.get(
    `https://api.etherscan.io/api?module=account&action=addresstokenbalance&address=${address}&page=1&offset=100&apikey=K61238HM8XT4DNHR8H9GBQ3PQXVE87WFI9`
  )
  .then(r => setUserTokenBalance(r.data.result))
  .catch(e => setError(e.message))
}
