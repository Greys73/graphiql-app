import { render, screen } from '../test-utils';
import { describe, expect, test, vi } from 'vitest';
import { showErrorToast, showSuccessToast } from '@src/utils/toasts';
import { useToast } from '@chakra-ui/react';

const ErrorMessage = 'This is ErrorMessage';
const SuccessMessage = 'This is SuccessMessage';

export default function ToastTester() {
  const toast = useToast();
  showErrorToast(toast, ErrorMessage);
  showSuccessToast(toast, SuccessMessage);
  return <></>;
}

describe('Toasts tests', () => {
  test('is SuccessToast shown', () => {
    render(<ToastTester />);
    expect(screen.getByText(SuccessMessage)).toBeInTheDocument();
  });
  test('is ErrorToast shown', () => {
    render(<ToastTester />);
    expect(screen.getByText(ErrorMessage)).toBeInTheDocument();
  });
});
