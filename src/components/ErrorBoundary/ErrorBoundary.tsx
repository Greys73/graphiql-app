/* eslint-disable no-console */
import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = { children: JSX.Element[] | JSX.Element };
type State = { error: boolean };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
    this.setState({ error: true });
  }

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div className="errorBoundary">
          <div className="errorBoundary__header">
            Oops! Something went wrong...
          </div>
          <Link to="/">
            <button type="button">RESET</button>
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
