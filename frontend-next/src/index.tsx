import * as React from "react";
import {render} from "react-dom";
import App from "./App";

const rootEl = document.getElementById("example")

render(
    <App/>,
    rootEl
)

if (module.hot) {
    module.hot.accept('./App', () => {
        render(
            <App/>,
            rootEl
        )
    })
}
