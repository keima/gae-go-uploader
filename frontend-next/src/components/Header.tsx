import {HideOnScroll} from "./util/HideOnScroll"
import {AppBar} from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import {APP_NAME} from "../constants"
import Typography from "@material-ui/core/Typography"
import * as React from "react"

export function Header() {

    return (
        <HideOnScroll>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6">
                        {APP_NAME}
                    </Typography>
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    )
}