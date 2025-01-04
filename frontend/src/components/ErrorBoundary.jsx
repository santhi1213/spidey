// ErrorBoundary.js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an external service or console
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Customize your fallback UI
      return (
        <div style={{ padding: "20px", textAlign: "center", background: "#f8d7da", color: "#721c24" }}>
          <h2>Oops! Something went wrong.</h2>
          <p>We encountered an error while rendering the chart. Please try again later.</p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
