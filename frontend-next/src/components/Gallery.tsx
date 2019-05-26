import * as React from "react"
import { Image } from "../models/Image"
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  Snackbar,
  Theme,
  withWidth,
} from "@material-ui/core"
import { ReactElement, useState } from "react"
// import makeStyles from "@material-ui/core/styles/makeStyles"
// import createStyles from "@material-ui/core/styles/createStyles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import useTheme from "@material-ui/core/styles/useTheme"
import { isWidthUp, WithWidth } from "@material-ui/core/withWidth"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"
//
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     icon: {
//       color: "rgba(255, 255, 255, 0.54)",
//     },
//   })
// )

const GalleryItem = (props: { image: Image }) => {
  const { image } = props
  const [showToast, setShowToast] = useState(false)

  return (
    <GridListTile cols={1}>
      <img src={image.url} alt={image.fileName} />
      <GridListTileBar
        title={image.fileName}
        subtitle={image.createdAt}
        actionIcon={
          <IconButton
            onClick={async () => {
              await navigator.clipboard.writeText(image.url)
              setShowToast(true)
            }}
          >
            <Icon>assignment</Icon>
          </IconButton>
        }
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        message={"Copied successfully"}
      />
    </GridListTile>
  )
}

interface GalleryProps {
  images: Image[]
}

type Props = GalleryProps & WithWidth

const getGridListCols = (bp: Breakpoint) => {
  if (isWidthUp("xl", bp)) {
    return 6
  }

  if (isWidthUp("lg", bp)) {
    return 4
  }

  if (isWidthUp("md", bp)) {
    return 3
  }

  return 2
}

const Gallery = (props: Props) => {
  const width = props.width
  const cols = getGridListCols(width)

  const childElements = props.images.map((image) => (
    <GalleryItem image={image} key={image.id} />
  ))

  return (
    <GridList cellHeight={160} cols={cols}>
      {childElements}
    </GridList>
  )
}

export default withWidth()(Gallery)
