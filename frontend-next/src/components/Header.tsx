import * as React from "react"
import { HideOnScroll } from "./util/HideOnScroll"
import { AppBar } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import { APP_NAME } from "../constants"
import Typography from "@material-ui/core/Typography"

export function Header() {
  return (
    <HideOnScroll effect="slide">
      <AppBar>
        <Toolbar>
          <Typography variant="h6">{APP_NAME}</Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}
