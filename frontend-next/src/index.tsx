import * as React from "react"
import { render } from "react-dom"
import App from "./App"
import { queryClipboardPermission } from "./queryClipboardPermission"

const rootEl = document.getElementById("example")

render(<App />, rootEl)

if (module.hot) {
  module.hot.accept("./App", () => {
    render(<App />, rootEl)
  })
}

queryClipboardPermission()
