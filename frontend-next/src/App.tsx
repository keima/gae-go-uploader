import * as React from "react"
import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import {
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Gallery from "./components/Gallery"
import { Image } from "./models/Image"
import DropZone from "./components/DropZone"
import { ApiClient } from "./ApiClient"

const useStyles = makeStyles((theme: Theme) => createStyles({}))

const App = () => {
  const classes = useStyles()
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const images = await ApiClient.instance.images()
        setImages(images)
      } catch {
        // fallback (debug)
        setImages(require("./models/images.json"))
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <CssBaseline />
      <Header />
      <Toolbar />
      <Container>
        <DropZone>
          <Gallery images={images} />
        </DropZone>
      </Container>
    </>
  )
}

export default App
