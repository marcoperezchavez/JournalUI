import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'; // Importa useQuery
import JournalComponent from '../components/journal';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('react-query', async () => {
  const original = await vi.importActual<typeof import('react-query')>('react-query');
  return {
    ...original,
    useQuery: vi.fn(),
  };
});

const mockJournals = [
  {
    id: 1,
    author: 'John Doe',
    filePath: '/path/to/journal.pdf',
    publicationDate: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    author: 'Jane Smith',
    filePath: '/path/to/another_journal.txt',
    publicationDate: '2023-01-10T00:00:00.000Z',
  },
];

describe('JournalComponent', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    localStorage.clear();
    queryClient.clear();
  });

  const renderWithClient = (ui: React.ReactElement) => {
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
  };

  test('renders loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });
    renderWithClient(<JournalComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', async () => {
    const error = new Error('Network response was not ok');
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error,
    });
    renderWithClient(<JournalComponent />);
    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });

  test('renders journals for admin user', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockJournals,
    });
    localStorage.setItem('role', 'admin');
    renderWithClient(<JournalComponent />);

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('row').length).toBe(3); // 2 rows + header row
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /add new/i }).length).toBe(2);
    });
  });

  test('renders journals for non-admin user', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockJournals,
    });
    localStorage.setItem('role', 'user');
    renderWithClient(<JournalComponent />);
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('row').length).toBe(3); // 2 rows + header row
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /add new/i })).toBeNull();
    });
  });
});
