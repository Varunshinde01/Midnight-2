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

import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { MainLayout, Board } from './components';
import { useDeployedBoardContext, useWalletConnection } from './hooks';
import { type BoardDeployment } from './contexts';
import { type Observable } from 'rxjs';

/**
 * The root bulletin board application component.
 *
 * @remarks
 * Renders the primary application UI. When the Lace wallet is connected,
 * displays active bulletin boards and controls for deploying/joining boards.
 * When disconnected, displays an interactive landing hero with a connection prompt.
 */
const App: React.FC = () => {
  const boardApiProvider = useDeployedBoardContext();
  const { walletState, connect } = useWalletConnection();
  const [boardDeployments, setBoardDeployments] = useState<Array<Observable<BoardDeployment>>>([]);

  useEffect(() => {
    const subscription = boardApiProvider.boardDeployments$.subscribe(setBoardDeployments);

    return () => {
      subscription.unsubscribe();
    };
  }, [boardApiProvider]);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <MainLayout>
        {walletState.status !== 'connected' ? (
          /* Disconnected state hero banner */
          <Box
            className="mn-slide-up"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              py: { xs: 4, md: 8 },
              px: 2,
              maxWidth: 720,
            }}
          >
            {/* ZK Badge */}
            <Box className="mn-badge mn-badge-zk" sx={{ mb: 3 }}>
              <LockOutlinedIcon sx={{ fontSize: 14 }} />
              Zero-Knowledge Privacy Enabled
            </Box>

            {/* Hero Heading */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '32px', sm: '48px', md: '56px' },
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 2,
                background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #2dd4bf 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Private Bulletin Board on Midnight Preprod
            </Typography>

            {/* Hero Subtitle */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '15px', sm: '18px' },
                color: '#8b87a0',
                mb: 4,
                maxWidth: 580,
                lineHeight: 1.6,
              }}
            >
              Post messages and prove ownership using zero-knowledge proofs.
              Your local secret key never leaves the browser.
            </Typography>

            {/* Connect Wallet Call to Action */}
            <Button
              variant="contained"
              size="large"
              onClick={() => void connect()}
              disabled={walletState.status === 'connecting'}
              startIcon={<AccountBalanceWalletIcon />}
              sx={{
                py: 1.8,
                px: 4,
                fontSize: '16px',
                fontWeight: 700,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c5cfc 0%, #2dd4bf 100%)',
                boxShadow: '0 0 30px rgba(124,92,252,0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #8b6dff 0%, #3de0cb 100%)',
                  boxShadow: '0 0 45px rgba(124,92,252,0.5)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {walletState.status === 'connecting' ? 'Connecting to Lace...' : 'Connect Midnight Lace Wallet'}
            </Button>

            {walletState.status === 'error' && (
              <Typography
                variant="body2"
                sx={{ mt: 2, color: '#f472b6', fontSize: '13px' }}
              >
                {walletState.errorMessage || 'Failed to connect wallet. Please ensure Lace wallet extension is installed.'}
              </Typography>
            )}

            {/* Features summary grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 3,
                mt: 6,
                width: '100%',
              }}
            >
              <Card sx={{ p: 3, textAlign: 'left' }}>
                <Typography variant="h6" sx={{ fontSize: '15px', color: '#a78bfa', mb: 1 }}>
                  🔒 Private State
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '13px', color: '#8b87a0' }}>
                  Secret keys stay in your browser in-memory state store.
                </Typography>
              </Card>

              <Card sx={{ p: 3, textAlign: 'left' }}>
                <Typography variant="h6" sx={{ fontSize: '15px', color: '#2dd4bf', mb: 1 }}>
                  ⚡ ZK Circuits
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '13px', color: '#8b87a0' }}>
                  Executes Compact smart contract circuits (`post`, `takeDown`) with local proofs.
                </Typography>
              </Card>

              <Card sx={{ p: 3, textAlign: 'left' }}>
                <Typography variant="h6" sx={{ fontSize: '15px', color: '#f472b6', mb: 1 }}>
                  🌐 Preprod Network
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '13px', color: '#8b87a0' }}>
                  Deploys and queries contracts directly on Midnight Preprod network.
                </Typography>
              </Card>
            </Box>
          </Box>
        ) : (
          /* Connected state board view */
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {boardDeployments.map((boardDeployment, idx) => (
              <div data-testid={`board-${idx}`} key={`board-${idx}`}>
                <Board boardDeployment$={boardDeployment} />
              </div>
            ))}
            <div data-testid="board-start">
              <Board />
            </div>
          </Box>
        )}
      </MainLayout>
    </Box>
  );
};

export default App;
