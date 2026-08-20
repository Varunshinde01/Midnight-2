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

import React, { useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { Box, Button, CardActions, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import BoardAddIcon from '@mui/icons-material/PostAddOutlined';
import CreateBoardIcon from '@mui/icons-material/AddCircleOutlined';
import JoinBoardIcon from '@mui/icons-material/AddLinkOutlined';
import { TextPromptDialog } from './TextPromptDialog';

/**
 * The props required by the {@link EmptyCardContent} component.
 *
 * @internal
 */
export interface EmptyCardContentProps {
  /** A callback that will be called to create a new bulletin board. */
  onCreateBoardCallback: () => void;
  /** A callback that will be called to join an existing bulletin board. */
  onJoinBoardCallback: (contractAddress: ContractAddress) => void;
}

/**
 * Used when there is no board deployment to render a UI allowing the user to join or deploy bulletin boards.
 *
 * @internal
 */
export const EmptyCardContent: React.FC<Readonly<EmptyCardContentProps>> = ({
  onCreateBoardCallback,
  onJoinBoardCallback,
}) => {
  const [textPromptOpen, setTextPromptOpen] = useState(false);

  return (
    <React.Fragment>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 3,
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(124, 92, 252, 0.12)',
            border: '1px solid rgba(124, 92, 252, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a78bfa',
            mb: 2,
          }}
        >
          <BoardAddIcon sx={{ fontSize: 28 }} />
        </Box>
        <Typography
          data-testid="board-posted-message"
          align="center"
          variant="h6"
          sx={{ fontSize: '16px', fontWeight: 700, mb: 0.5, color: '#e8e6f0' }}
        >
          Bulletin Board
        </Typography>
        <Typography
          align="center"
          variant="body2"
          sx={{ fontSize: '13px', color: '#8b87a0', maxWidth: 220, mb: 3 }}
        >
          Deploy a new bulletin board contract on Preprod or join an existing one.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
          <Button
            variant="contained"
            data-testid="board-deploy-btn"
            startIcon={<CreateBoardIcon />}
            onClick={onCreateBoardCallback}
            sx={{
              width: '100%',
              py: 1.2,
              fontSize: '13px',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #7c5cfc 0%, #2dd4bf 100%)',
              boxShadow: '0 0 20px rgba(124,92,252,0.25)',
            }}
          >
            Deploy New Board
          </Button>

          <Button
            variant="outlined"
            data-testid="board-join-btn"
            startIcon={<JoinBoardIcon />}
            onClick={() => setTextPromptOpen(true)}
            sx={{
              width: '100%',
              py: 1.2,
              fontSize: '13px',
              fontWeight: 600,
              borderColor: 'rgba(120, 100, 255, 0.25)',
              color: '#a78bfa',
              '&:hover': {
                borderColor: 'rgba(120, 100, 255, 0.5)',
                background: 'rgba(124, 92, 252, 0.1)',
              },
            }}
          >
            Join Board by Address
          </Button>
        </Box>
      </CardContent>

      <TextPromptDialog
        prompt="Enter 64-character contract address"
        isOpen={textPromptOpen}
        onCancel={() => {
          setTextPromptOpen(false);
        }}
        onSubmit={(text) => {
          setTextPromptOpen(false);
          onJoinBoardCallback(text);
        }}
      />
    </React.Fragment>
  );
};
