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

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Header } from './Header';

/**
 * Provides the premium layout for the bulletin board application.
 *
 * @remarks
 * Features a sticky glassmorphism header, animated gradient background,
 * and a responsive centered content area with proper spacing.
 */
export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
      <Header />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 72px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 4, sm: 6 },
        }}
      >
        {/* Top gradient glow */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: 800,
            height: 300,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(124,92,252,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Content wrapper */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 1100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: 'center',
          py: 3,
          px: 2,
          borderTop: '1px solid rgba(120, 100, 255, 0.06)',
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: '12px', color: '#5a5670' }}
        >
          Built on{' '}
          <Typography
            component="a"
            href="https://midnight.network/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: '12px',
              color: '#7c5cfc',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Midnight Network
          </Typography>
          {' '}— Zero-knowledge privacy by design
        </Typography>
      </Box>
    </Box>
  );
};
