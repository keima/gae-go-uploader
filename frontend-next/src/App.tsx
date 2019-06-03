import * as React from "react"
import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { CssBaseline, Toolbar } from "@material-ui/core"
import Container from "@material-ui/core/Container"
import Gallery from "./components/Gallery"
import { Image } from "./models/Image"

const App = () => {
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://keima-uploader.appspot.com/api/v1/images"
        )

        if (response.ok) {
          setImages(await response.json())
        }
      } catch {
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
        <Gallery images={images} />
      </Container>
    </>
  )
}

export default App
