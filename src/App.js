import React, { useEffect, useState } from "react"
import Navbar from "./components/navbar"
import Dashboard from "./dashboard"
import { init } from "@airstack/airstack-react"
import { useQuery } from "@airstack/airstack-react"
import { Card, CardContent, Typography } from "@mui/material"

init("598406f101364281b160f60f0761fe96")

const MyComponent = ({ address }) => {
  const query = `
  query WalletQuery {
    Wallet(input: { identity: "${address}", blockchain: ethereum }) {
      socials {
        dappName
        profileName
        profileCreatedAtBlockTimestamp
        userAssociatedAddresses
      }
      tokenBalances {
        tokenAddress
        amount
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              original
            }
          }
          token {
            name
          }
        }
      }
      poaps {
        id
        chainId
        blockchain
        dappName
        dappSlug
        dappVersion
        eventId
        owner {
          identity
        }
        createdAtBlockTimestamp
        createdAtBlockNumber
        tokenId
        tokenAddress
        tokenUri
        poapEvent {
          id
          chainId
          blockchain
          dappName
          dappSlug
          dappVersion
          eventId
          metadata
          contentType
          contentValue {
            image {
              original
            }
          }
          eventName
          description
          country
          city
          startDate
          endDate
          isVirtualEvent
          eventURL
        }
      }
    }
  }
  `

  const { data, loading, error } = useQuery(query)

  useEffect(() => {
    if (data && data.Wallet && data.Wallet.tokenBalances) {
      // Filtering the token balances to find the entries with NFT image URL links
      const tokenNfts = data.Wallet.tokenBalances
        .filter((token) => token.tokenNfts && token.tokenNfts.contentValue.image)
        .map((token) => token.tokenNfts.contentValue.image.original)

      Promise.all(tokenNfts.map(fetchImage)).then((images) => {
        console.log("Fetched images:", images)
      })
    }
  }, [data])

  // Getting the image URL
  const fetchImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl)
      if (response.ok) {
        const tempImage = await response.blob()
        const tempImageUrl = URL.createObjectURL(tempImage)
        return tempImageUrl
      } else {
        console.error("Failed to fetch NFT image from URL:", response.status, response.statusText)
        return null
      }
    } catch (error) {
      console.error("Error while trying to fetch the NFT image:", error.message)
      return null
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!data || !data.Wallet || !data.Wallet.tokenBalances ? (
        <p>Please enter a valid wallet ID</p>
      ) : (
        //trying to make the cards at the centre of the page
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {data.Wallet.tokenBalances.map((token, index) => (
              <Card
                key={index}
                style={{
                  width: "calc(45% - 5px)",
                  margin: "15px",
                  marginBottom: "10px"
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Token {index + 1}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Token Address: {token.tokenAddress}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Amount: {token.amount}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Token ID: {token.tokenId}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Token Type: {token.tokenType}
                  </Typography>
                  {token.tokenNfts && token.tokenNfts.contentValue.image && (
                    <div>
                      <Typography variant="body1" component="p">
                        Token NFT Name: {token.tokenNfts.token.name}
                      </Typography>
                      <img
                        src={token.tokenNfts.contentValue.image.original}
                        alt={`NFT ${index + 1}`}
                        style={{ maxWidth: "100%", maxHeight: "400px" }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [address, setAddress] = useState("")
  const [tokenBalance, setTokenBalance] = useState(undefined)
  const [transfers, setTransfers] = useState(undefined)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    setAddress(e.target.value)
  }

  useEffect(() => {
    console.log(transfers)
  }, [transfers])

  return (
    <div>
      <Navbar
        setAddress={setAddress}
        setError={setError}
        setTokenBalance={setTokenBalance}
        setTransfers={setTransfers}
      />
      <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
        <input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter wallet ID"
          style={{ width: "300px", height: "40px", fontSize: "16px" }}
        />
      </div>
      <MyComponent address={address} />
      <Dashboard error={error} tokenBalance={tokenBalance} />
    </div>
  )
}
