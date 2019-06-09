import * as React from "react"
import { ReactNode, useState } from "react"
import { useDropzone } from "react-dropzone"
import { createStyles, Fab, Icon, makeStyles, Theme } from "@material-ui/core"
import { HideOnScroll } from "./util/HideOnScroll"
import { FileExt, HasPreview } from "../models/FileExt"
import { UploadQueue } from "./UploadQueue"
import { ApiClient } from "../ApiClient"

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    overlay: {
      zIndex: 9999,
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    dropZone: {
      backgroundColor: "rgba(117,117,117,0.35)",
      borderWidth: theme.spacing(3),
      borderColor: "rgba(117,117,117,0.8)",
      borderStyle: "solid",
      "& p": {
        color: "white",
        textShadow: "0 1px 0 #000000",
        fontWeight: "bold",
        fontSize: "larger",
      },
    },
    showQueue: {
      backgroundColor: "rgba(117,117,117,0.35)",
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
})

interface Props {
  children: ReactNode
}

export default function DropZone({ children }: Props) {
  const classes = useStyles()
  const [files, setFiles] = useState<FileExt[]>([])
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign<File, HasPreview>(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
    accept: "image/*",
    multiple: true,
    noClick: true,
    noKeyboard: true,
  })

  const removeAction = (removed: File) => {
    setFiles(files.filter((f) => f.name !== removed.name))
  }

  const submitAction = async (file: File) => {
    try {
      await ApiClient.instance.uploadImage(file)
      removeAction(file)
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
      {isDragActive && (
        <div className={`${classes.overlay} ${classes.dropZone}`}>
          <p>画像をドロップしてアップロード…</p>
        </div>
      )}
      {files.length > 0 && (
        <div className={`${classes.overlay} ${classes.showQueue}`}>
          <UploadQueue
            files={files}
            onRemove={(removed) => removeAction(removed)}
            onSubmit={(file) => submitAction(file)}
          />
        </div>
      )}
      <HideOnScroll effect="zoom">
        <Fab color="primary" className={classes.fab} onClick={open}>
          <Icon>cloud_upload</Icon>
        </Fab>
      </HideOnScroll>
    </div>
  )
}
