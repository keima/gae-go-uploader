import * as React from "react"
import { ReactElement } from "react"
import { Slide, Zoom } from "@material-ui/core"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"

interface Props {
  effect: "slide" | "zoom"
  children: ReactElement
}

export function HideOnScroll(props: Props) {
  const { children } = props
  const trigger = useScrollTrigger()

  switch (props.effect) {
    case "slide":
      return (
        <Slide appear={false} direction="down" in={!trigger}>
          {children}
        </Slide>
      )
    case "zoom":
      return <Zoom in={!trigger}>{children}</Zoom>
  }
}
