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
import { AppBar, Box, Button, Tooltip, Typography } from '@mui/material';
import { useWalletConnection } from '../../hooks';

/**
 * Premium application header with wallet connection controls and network badge.
 *
 * @remarks
 * Displays the Midnight logo, a Preprod network badge, and a wallet connect/disconnect
 * button with animated status indicator showing the current connection state.
 */
export const Header: React.FC = () => {
  const { walletState, connect, disconnect } = useWalletConnection();

  const statusClass =
    walletState.status === 'connected'
      ? 'mn-pulse-connected'
      : walletState.status === 'connecting'
        ? 'mn-pulse-connecting'
        : walletState.status === 'error'
          ? 'mn-pulse-error'
          : 'mn-pulse-disconnected';

  const handleWalletAction = () => {
    if (walletState.status === 'connected') {
      disconnect();
    } else if (walletState.status !== 'connecting') {
      void connect();
    }
  };

  return (
    <AppBar
      position="sticky"
      data-testid="header"
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, sm: 4, md: 6 },
        py: 1.5,
        zIndex: 1100,
      }}
    >
      {/* Left: Logo + Title */}
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
        data-testid="header-logo"
      >
        <img src="/midnight-logo.png" alt="Midnight Network" height={40} style={{ opacity: 0.9 }} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              fontSize: '16px',
              background: 'linear-gradient(135deg, #e8e6f0 0%, #8b87a0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2,
            }}
          >
            Bulletin Board
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: '11px', color: '#5a5670', lineHeight: 1 }}
          >
            Zero-Knowledge DApp
          </Typography>
        </Box>
      </Box>

      {/* Right: Network badge + Wallet button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Network badge */}
        <Box className="mn-badge mn-badge-network" sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#7c5cfc',
            }}
          />
          Preprod
        </Box>

        {/* ZK badge */}
        <Box className="mn-badge mn-badge-zk" sx={{ display: { xs: 'none', lg: 'flex' } }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          ZK Protected
        </Box>

        {/* Wallet button */}
        <Tooltip
          title={
            walletState.status === 'connected'
              ? `Connected: ${walletState.address}\nClick to disconnect`
              : walletState.status === 'error'
                ? walletState.errorMessage || 'Connection failed'
                : walletState.status === 'connecting'
                  ? 'Connecting to Lace...'
                  : 'Connect Lace wallet'
          }
        >
          <Button
            id="wallet-connect-btn"
            data-testid="wallet-connect-btn"
            onClick={handleWalletAction}
            disabled={walletState.status === 'connecting'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2.5,
              py: 1,
              borderRadius: '10px',
              border: '1px solid',
              borderColor:
                walletState.status === 'connected'
                  ? 'rgba(45, 212, 191, 0.3)'
                  : walletState.status === 'error'
                    ? 'rgba(244, 114, 182, 0.3)'
                    : 'rgba(120, 100, 255, 0.2)',
              background:
                walletState.status === 'connected'
                  ? 'rgba(45, 212, 191, 0.08)'
                  : walletState.status === 'error'
                    ? 'rgba(244, 114, 182, 0.08)'
                    : 'rgba(120, 100, 255, 0.08)',
              color:
                walletState.status === 'connected'
                  ? '#2dd4bf'
                  : walletState.status === 'error'
                    ? '#f472b6'
                    : '#e8e6f0',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '13px',
              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor:
                  walletState.status === 'connected'
                    ? 'rgba(45, 212, 191, 0.5)'
                    : 'rgba(120, 100, 255, 0.4)',
                background:
                  walletState.status === 'connected'
                    ? 'rgba(45, 212, 191, 0.12)'
                    : 'rgba(120, 100, 255, 0.12)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            {walletState.status === 'connecting' ? (
              <Box className="mn-spinner" sx={{ width: 16, height: 16 }} />
            ) : (
              <Box className={`mn-pulse ${statusClass}`} />
            )}
            {walletState.status === 'connected'
              ? walletState.address
              : walletState.status === 'connecting'
                ? 'Connecting...'
                : walletState.status === 'error'
                  ? 'Retry'
                  : 'Connect Wallet'}
          </Button>
        </Tooltip>
      </Box>
    </AppBar>
  );
};
