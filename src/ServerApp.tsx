import {
  RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export default function render(
  url: string,
  options?: RenderToPipeableStreamOptions,
) {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    options,
  );

  return stream;
}
