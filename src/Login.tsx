'use client'

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Mail, 
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const FormContainer = styled(Paper)`
  padding: 32px;
  max-width: 400px;
  margin: 40px auto;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
  height: 48px;
  font-size: 16px;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 5s ease infinite;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #FE6B8B;
    }
  }
  & .MuiInputLabel-root.Mui-focused {
    color: #FE6B8B;
  }
`;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Login attempt with:', { email, password });
      
      if (email !== 'user@example.com' || password !== 'password123') {
        throw new Error('Invalid email or password');
      }

      alert('Login successful!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
        Welcome Back
      </Typography>
      <Typography variant="body1" gutterBottom align="center" sx={{ color: '#666', marginBottom: '24px' }}>
        Please enter your details to log in
      </Typography>
      <Form onSubmit={handleSubmit} data-cy="login-form">
        <StyledTextField
          label="Email"
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required
          fullWidth
          data-cy="email-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail size={20} color="#999" />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          required
          fullWidth
          data-cy="password-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={20} color="#999" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  data-cy="toggle-password-button"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          data-cy="submit-button"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
          ) : (
            'Log In'
          )}
        </SubmitButton>
      </Form>
      {error && (
        <Box mt={2} color="error.main" data-cy="error-message" textAlign="center">
          {error}
        </Box>
      )}
    </FormContainer>
  );
}