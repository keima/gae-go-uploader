import * as React from "react"
import {
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core"
import { FileExt } from "../models/FileExt"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    icon: {
      color: "rgba(255,255,255,0.8)",
    },
  })
)

interface Props {
  files: FileExt[]
  onRemove: (removed: File) => void
  onSubmit: (file: File) => void
}

export function UploadQueue({ files, onRemove, onSubmit }: Props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <GridList cols={2.5} className={classes.gridList}>
        {files.map((file) => (
          <GridListTile key={file.name} onClick={() => onSubmit(file)}>
            <img src={file.preview} alt={file.name} />
            <GridListTileBar
              title={file.name}
              subtitle={`${file.size} bytes`}
              titlePosition={"top"}
              actionIcon={
                <IconButton
                  className={classes.icon}
                  onClick={(event) => {
                    event.stopPropagation()
                    onRemove(file)
                  }}
                >
                  <Icon>close</Icon>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
