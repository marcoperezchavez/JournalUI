import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import LoginComponent from '../components/Login';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('LoginComponent', () => {
    // ... other tests

    test('submits form with correct data', async () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <LoginComponent />
            </Router>
        );

        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ token: 'test-token' }),
        });
        global.fetch = mockFetch;

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => expect(history.location.pathname).toBe('/journal'));
        expect(localStorage.getItem('role')).toBe('admin');
        expect(localStorage.getItem('username')).toBe('testuser');
        expect(localStorage.getItem('password')).toBe('password123');

    });

    test('submits form with correct data User', async () => {
        const history = createMemoryHistory();
        render(
            <Router location={history.location} navigator={history}>
                <LoginComponent />
            </Router>
        );

        const mockFetch = vi.fn().mockResolvedValue({
            ok: false,
            json: () => Promise.resolve({ token: 'test-token' }),
        });
        global.fetch = mockFetch;

        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'user' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: '12121' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => expect(history.location.pathname).toBe('/journal'));
        expect(localStorage.getItem('role')).toBe('user');

    });
});