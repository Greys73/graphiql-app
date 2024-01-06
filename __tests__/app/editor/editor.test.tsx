import { render, screen } from '../../test-utils';
import { describe, expect, test, vi } from 'vitest';
import EditorPage from '@src/app/editor/components/EditorPage';

vi.mock('cm6-graphql', () => {
  return { graphql: () => ({ extension: [] }) };
});

vi.mock('@codemirror/lang-json', () => {
  return { json: () => ({ extension: [] }) };
});

describe('PlayGround tests', () => {
  test('is PlayGround displayed', () => {
    render(<EditorPage errorAuth={null} />);
    expect(screen.getByText(/PlayGround/i)).toBeInTheDocument();
  });
  test('is all CodeAreas on page', () => {
    render(<EditorPage errorAuth={null} />);
    expect(screen.getAllByRole('textbox').length).toBe(4);
  });
});
