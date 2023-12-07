import Link from 'next/link';
import { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode[] | ReactNode };
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
        <>
          <h1>Oops! Something went wrong...</h1>
          <Link href='/'>
            <button type='button'>RESET</button>
          </Link>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
