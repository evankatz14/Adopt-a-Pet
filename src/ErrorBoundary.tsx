import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

export default class ErrorBoundary extends Component<{
  children: ReactElement;
}> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // typically would log this to some kind of error tracking service
    console.error("ErrorBoundary component caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with the listing.{" "}
          <Link to="/">Click here to go back to the home page</Link>
        </h2>
      );
    }

    return this.props.children;
  }
}
