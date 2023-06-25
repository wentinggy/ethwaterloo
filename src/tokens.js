import React, { useEffect } from "react"
import { init } from "@airstack/airstack-react"
import { useQuery } from "@airstack/airstack-react"
import { Box, Grid, Card, CardContent, Typography } from "@mui/material"
import moment from "moment"

init("598406f101364281b160f60f0761fe96")

export default function Tokens({ address }) {
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
    <Box>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!data || !data.Wallet || !data.Wallet.tokenBalances ? (
        <p>Please enter a valid wallet ID</p>
      ) : (
        <Box>
          <Grid wrap="no-wrap" container spacing={2} sx={{ py: 2, overflow: 'scroll' }}>
            {data.Wallet.tokenBalances.map((token, index) => {
              if (token.tokenType === "ERC20") {
                return null // DON'T WANT ERC20 tokens
              }
              return (
                <Grid item xs={12} sm={6} md={4} key={index} sx={{ minWidth: 430, maxWidth: 430 }}>
                  <Card sx={{ height: "400px" }}>
                    <CardContent>
                      <Typography variant="body1" component="p">
                        Token Address:
                        <span style={{ wordBreak: "break-word" }}>{token.tokenAddress}</span>
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
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img
                              src={token.tokenNfts.contentValue.image.original}
                              alt={`NFT`}
                              style={{ maxWidth: "100%", maxHeight: "200px" }}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          <Typography variant="h6">Events</Typography>
          <Grid wrap="no-wrap" container spacing={2} sx={{ py: 2, overflow: 'scroll' }}>
            {data.Wallet.poaps && data.Wallet.poaps.map((poap, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ minWidth: 430, maxWidth: 430 }}>
                <Card sx={{ height: "500px" }}>
                  <CardContent>
                    <Typography variant="h6" component="h2">
                      Event {index + 1}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Event Name: {poap.poapEvent.eventName}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Event ID: {poap.poapEvent.eventId}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Start Date - End Date: {moment(poap.poapEvent.startDate).format("DD/MMM/YYYY")} -
                      {moment(poap.poapEvent.endDate).format("DD/MMM/YYYY")}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Country, City: {poap.poapEvent.country}, {poap.poapEvent.city}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Description: {poap.poapEvent.description}
                    </Typography>
                    {poap.poapEvent.contentValue && poap.poapEvent.contentValue.image && (
                      <div>
                        <Typography variant="body1" component="p">
                          Event Image:
                        </Typography>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <img
                            src={poap.poapEvent.contentValue.image.original}
                            alt={`Event ${index + 1}`}
                            style={{ maxWidth: "100%", maxHeight: "150px" }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>  
  )
}
