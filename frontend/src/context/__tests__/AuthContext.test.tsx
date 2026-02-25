import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
global.fetch = jest.fn() as jest.Mock;

const TestComponent = () => {
  const { user, isAuthenticated, loading, login, logout } = useAuth();

  if (loading) return <div>Loading Auth...</div>;

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Logged In' : 'Logged Out'}
      </div>
      {user && <div data-testid="user-email">{user.email}</div>}

      <button
        onClick={() =>
          login({
            id: '1',
            username: 'test',
            email: 'test@example.com',
            role: 'user',
          })
        }
      >
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    localStorage.clear();
  });

  it('shows loading initially and verifies session if token exists', async () => {
    localStorage.setItem('token', 'fake-token');

    const mockUser = {
      id: '1',
      username: 'test',
      email: 'test@example.com',
      role: 'user',
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Loading Auth...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading Auth...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Logged In');
    expect(screen.getByTestId('user-email')).toHaveTextContent(
      'test@example.com'
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/me'),
      expect.any(Object)
    );
  });

  it('sets state to logged out if no token exists', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading Auth...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Logged Out');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('handles login action correctly', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading Auth...')).not.toBeInTheDocument();
    });

    act(() => {
      screen.getByText('Login').click();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Logged In');
    expect(screen.getByTestId('user-email')).toHaveTextContent(
      'test@example.com'
    );
    expect(JSON.parse(localStorage.getItem('user') || '{}')).toMatchObject({
      email: 'test@example.com',
    });
  });

  it('handles logout action correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    localStorage.setItem(
      'user',
      JSON.stringify({ id: '1', email: 'test@example.com' })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading Auth...')).not.toBeInTheDocument();
    });

    act(() => {
      screen.getByText('Login').click();
    });

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Logged In');

    act(() => {
      screen.getByText('Logout').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Logged Out');
    });

    expect(localStorage.getItem('user')).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/logout'),
      expect.any(Object)
    );
  });
});
