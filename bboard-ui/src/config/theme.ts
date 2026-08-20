// This file is part of midnightntwrk/example-bboard.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    allVariants: {
      color: '#e8e6f0',
    },
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      color: '#8b87a0',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none' as const,
      letterSpacing: '0.01em',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c5cfc',
      light: '#a78bfa',
      dark: '#5b3fd9',
    },
    secondary: {
      main: '#2dd4bf',
      light: '#5eead4',
      dark: '#14b8a6',
    },
    error: {
      main: '#f472b6',
    },
    warning: {
      main: '#fbbf24',
    },
    background: {
      default: '#06060f',
      paper: 'rgba(12, 12, 30, 0.65)',
    },
    text: {
      primary: '#e8e6f0',
      secondary: '#8b87a0',
      disabled: '#5a5670',
    },
    divider: 'rgba(120, 100, 255, 0.12)',
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#06060f',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(12, 12, 30, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(120, 100, 255, 0.12)',
          borderRadius: 20,
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          transition: 'border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: 'rgba(120, 100, 255, 0.35)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.5), 0 0 30px rgba(124,92,252,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none' as const,
          fontWeight: 600,
          padding: '10px 20px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7c5cfc 0%, #2dd4bf 100%)',
          boxShadow: '0 0 20px rgba(124,92,252,0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #8b6dff 0%, #3de0cb 100%)',
            boxShadow: '0 0 30px rgba(124,92,252,0.4)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#8b87a0',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            color: '#a78bfa',
            backgroundColor: 'rgba(124, 92, 252, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(6,6,15,0.6)',
            '& fieldset': {
              borderColor: 'rgba(120, 100, 255, 0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(120, 100, 255, 0.35)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7c5cfc',
              boxShadow: '0 0 0 3px rgba(124, 92, 252, 0.15)',
            },
          },
          '& .MuiInputBase-input': {
            color: '#e8e6f0',
            fontFamily: "'Inter', sans-serif",
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#5a5670',
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(6, 6, 15, 0.7)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(6, 6, 15, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(120, 100, 255, 0.08)',
          boxShadow: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(12, 12, 30, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(120, 100, 255, 0.15)',
          borderRadius: 20,
          boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(12, 12, 30, 0.95)',
          border: '1px solid rgba(120, 100, 255, 0.2)',
          borderRadius: 8,
          fontSize: '12px',
          fontWeight: 500,
          padding: '8px 12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(120, 100, 255, 0.08)',
        },
      },
    },
  },
});
