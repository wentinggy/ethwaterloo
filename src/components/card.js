import { Card, CardMedia, CardContent, Typography } from "@mui/material"

export default function ValueCard({ title, value, graph, image }) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {value}
        </Typography>
        <CardMedia>
          {graph}
        </CardMedia>
        <CardMedia>
          {image}
        </CardMedia>
      </CardContent>
    </Card>
  )
}