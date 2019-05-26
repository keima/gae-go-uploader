import * as React from "react"
import { useState } from "react"
import { Header } from "./components/Header"
import { CssBaseline, Toolbar } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Gallery from "./components/Gallery"
import { Image } from "./models/Image"
import makeStyles from "@material-ui/core/styles/makeStyles"
import createStyles from "@material-ui/core/styles/createStyles"

// const useStyles = makeStyles(
//   createStyles({
//     container: {
//       marginTop: 0,
//     },
//   })
// )

const App = () => {
  // const classes = useStyles()

  const images: Image[] = [
    {
      id: "0",
      url: "https://dummyimage.com/600x400/000/fff",
      fileName: "ぽぽぽ",
    },
    {
      id: "1",
      url: "https://dummyimage.com/600x400/fff/000",
    },
    {
      id: "2",
      url: "https://dummyimage.com/600x400/000/fff",
    },
    {
      id: "3",
      url: "https://dummyimage.com/600x400/000/fff",
    },
    {
      id: "4",
      url: "https://dummyimage.com/600x400/000/fff",
    },
  ]

  return (
    <>
      <CssBaseline />
      <Header />
      <Toolbar />
      <Container>
        <Gallery images={images} />
      </Container>
    </>
  )
}

export default App
