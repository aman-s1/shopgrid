import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';
import { AuthContext } from '../../context/AuthContext';
import React from 'react';

// Mock the global fetch
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
            <AuthContext.Provider value={mockAuthContext as any}>
                {ui}
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

describe('Register Page', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    it('renders registration form', () => {
        renderWithProviders(<Register />);
        expect(screen.getByText(/Start Your Journey/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    });

    it('calls fetch and login on form submission', async () => {
        const mockUser = { id: '1', username: 'john', email: 'john@example.com', role: 'user' };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ user: mockUser }),
        });

        renderWithProviders(<Register />);

        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'john' } });
        fireEvent.change(screen.getByPlaceholderText(/Email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { name: 'password', value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { name: 'confirmPassword', value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/auth/register'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({
                        username: 'john',
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
});
