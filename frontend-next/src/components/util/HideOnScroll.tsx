import {ReactElement} from "react"
import {Slide} from "@material-ui/core"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import * as React from "react"

type Props = {
    children: ReactElement
}

export function HideOnScroll(props: Props) {
    const { children } = props
    const trigger = useScrollTrigger()

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}
