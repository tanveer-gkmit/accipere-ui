import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/login';
import { authService } from '../api/auth';

// Mock the auth service
vi.mock('../api/auth', () => ({
  authService: {
    login: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ========== POSITIVE TEST CASES ==========
  describe('Login Test Cases', () => {
    it('renders login form with all elements', () => {
      renderLogin();
      
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByText('Sign in to your Accipere account')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByText('Admin and company access only')).toBeInTheDocument();
    });

    it('successfully logs in with valid credentials', async () => {
      authService.login.mockResolvedValueOnce({
        access: 'mock-access-token',
        refresh: 'mock-refresh-token',
      });

      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith('test@example.com', 'Password123!');
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });
  });

  // ========== NEGATIVE TEST CASES ==========
  describe('Negative Test Cases', () => {
    it('shows error for invalid email format', async () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
      expect(authService.login).not.toHaveBeenCalled();
    });

    it('shows error for password without uppercase letter', async () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123!' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/Password must be at least 8 characters and include 1 uppercase letter/i)).toBeInTheDocument();
      expect(authService.login).not.toHaveBeenCalled();
    });

    it('shows error for password without number', async () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password!' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 symbol/i)).toBeInTheDocument();
      expect(authService.login).not.toHaveBeenCalled();
    });

    it('shows error for password without symbol', async () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 symbol/i)).toBeInTheDocument();
      expect(authService.login).not.toHaveBeenCalled();
    });

    it('shows error for password less than 8 characters', async () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Pass1!' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
      expect(authService.login).not.toHaveBeenCalled();
    });

    it('displays API error for invalid credentials', async () => {
      authService.login.mockResolvedValueOnce({
        non_field_errors: ['Invalid email or password.'],
      });

      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText('Invalid email or password.')).toBeInTheDocument();
    });

    it('displays generic error for network failure', async () => {
      authService.login.mockResolvedValueOnce(undefined);

      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText('An error occurred. Please try again.')).toBeInTheDocument();
    });

    it('does not submit form when email is empty', async () => {
      renderLogin();
      
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
      expect(authService.login).not.toHaveBeenCalled();
    });
  });

  // ========== EDGE TEST CASES ==========
  describe('Edge Test Cases', () => {

    it('disables submit button while loading', async () => {
      authService.login.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.click(submitButton);

      expect(await screen.findByRole('button', { name: /signing in/i })).toBeDisabled();
    });

    it('clears previous error when submitting again', async () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // First submission with invalid email
      fireEvent.change(emailInput, { target: { value: 'invalid' } });
      fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
      fireEvent.click(submitButton);

      expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();

      // Second submission with valid email but invalid password
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'weak' } });
      fireEvent.click(submitButton);

      // Old error should be gone, new error should appear
      expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      expect(await screen.findByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
    });
  });
});
