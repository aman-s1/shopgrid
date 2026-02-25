import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import { AuthContext } from '../../context/AuthContext';
import React from 'react';

const mockAuthContext = {
    user: null,
    isAuthenticated: false,
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
};

const renderWithProviders = (ui: React.ReactElement, authValue: any = mockAuthContext) => {
    return render(
        <BrowserRouter>
            <AuthContext.Provider value={authValue as any}>
                {ui}
            </AuthContext.Provider>
        </BrowserRouter>
    );
};

// Mock AddProductForm so we don't need to test its implementation details here
jest.mock('../../components/AddProductForm', () => ({
    AddProductForm: () => <div data-testid="add-product-form">Add Product</div>
}));

describe('Home Page', () => {
    it('renders hero section and hides admin form for unauthenticated users', () => {
        renderWithProviders(<Home />);

        expect(screen.getByText(/Elevate Your/i)).toBeInTheDocument();
        expect(screen.getByText(/Start Shopping/i)).toBeInTheDocument();
        expect(screen.getByText(/View Features/i)).toBeInTheDocument();

        expect(screen.queryByTestId('add-product-form')).not.toBeInTheDocument();
    });

    it('renders hero section and hides admin form for regular users', () => {
        const regularUserAuth = {
            ...mockAuthContext,
            isAuthenticated: true,
            user: { id: '1', username: 'user', email: 'user@user.com', role: 'user' }
        };

        renderWithProviders(<Home />, regularUserAuth);

        expect(screen.getByText(/Elevate Your/i)).toBeInTheDocument();
        expect(screen.queryByTestId('add-product-form')).not.toBeInTheDocument();
    });

    it('renders admin form for admin users', () => {
        const adminUserAuth = {
            ...mockAuthContext,
            isAuthenticated: true,
            user: { id: '2', username: 'admin', email: 'admin@admin.com', role: 'admin' }
        };

        renderWithProviders(<Home />, adminUserAuth);

        expect(screen.getByText(/Elevate Your/i)).toBeInTheDocument();
        expect(screen.getByTestId('add-product-form')).toBeInTheDocument();
    });
});
