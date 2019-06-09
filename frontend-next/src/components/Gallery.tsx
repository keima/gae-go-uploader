import * as React from "react"
import { useState } from "react"
import { Image } from "../models/Image"
import {
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  makeStyles,
  Snackbar,
  withWidth,
} from "@material-ui/core"
import { isWidthUp, WithWidth } from "@material-ui/core/withWidth"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "rgba(255,255,255,0.76)",
    },
  })
)

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
  const classes = useStyles()
  const [showToast, setShowToast] = useState(false)

  return (
    <div>
      <GridList cellHeight={250} cols={cols} spacing={8}>
        {props.images.map((image) => (
          <GridListTile
            key={image.id}
            cols={1}
            onClick={() => {
              window.open(image.url)
            }}
          >
            <img src={image.url} alt={image.fileName} />
            <GridListTileBar
              title={image.fileName}
              subtitle={image.createdAt}
              actionIcon={
                <IconButton
                  className={classes.icon}
                  onClick={async (event) => {
                    event.stopPropagation()
                    await navigator.clipboard.writeText(image.url)
                    setShowToast(true)
                  }}
                >
                  <Icon>assignment</Icon>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        message={"Copied successfully"}
      />
    </div>
  )
}

export default withWidth()(Gallery)
