import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthContext } from '../../context/AuthContext';
import React from 'react';

global.fetch = jest.fn() as jest.Mock;

const mockAuthContext = {
  user: null,
  isAuthenticated: false,
  loading: false,
  login: jest.fn(),
  logout: jest.fn(),
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider
        value={
          mockAuthContext as unknown as React.ComponentProps<
            typeof AuthContext.Provider
          >['value']
        }
      >
        {ui}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    mockAuthContext.login.mockClear();
  });

  it('renders login form', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('calls fetch and login on form submission', async () => {
    const mockUser = {
      id: '1',
      username: 'john',
      email: 'john@example.com',
      role: 'user',
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Email address/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { name: 'password', value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            email: 'john@example.com',
            password: 'password123',
          }),
        })
      );
    });

    await waitFor(() => {
      expect(mockAuthContext.login).toHaveBeenCalledWith(mockUser);
    });
  });

  it('displays error message on failed login', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Email address/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { name: 'password', value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });

    expect(mockAuthContext.login).not.toHaveBeenCalled();
  });
});
