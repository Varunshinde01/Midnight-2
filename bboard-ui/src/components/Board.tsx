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

import React, { useCallback, useEffect, useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  Backdrop,
  Box,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
  TextField,
  Tooltip,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import WriteIcon from '@mui/icons-material/EditNoteOutlined';
import CopyIcon from '@mui/icons-material/ContentPasteOutlined';
import StopIcon from '@mui/icons-material/HighlightOffOutlined';
import KeyIcon from '@mui/icons-material/VpnKeyOutlined';
import SecurityIcon from '@mui/icons-material/SecurityOutlined';
import { type BBoardDerivedState, type DeployedBBoardAPI } from '../../../api/src/index';
import { useDeployedBoardContext } from '../hooks';
import { type BoardDeployment } from '../contexts';
import { type Observable } from 'rxjs';
import { State } from '../../../contract/src/index';
import { EmptyCardContent } from './Board.EmptyCardContent';

/** The props required by the {@link Board} component. */
export interface BoardProps {
  /** The observable bulletin board deployment. */
  boardDeployment$?: Observable<BoardDeployment>;
}

/**
 * Provides the UI for a deployed bulletin board contract; allowing messages to be posted or removed
 * following the rules enforced by the underlying Compact contract.
 */
export const Board: React.FC<Readonly<BoardProps>> = ({ boardDeployment$ }) => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployment, setBoardDeployment] = useState<BoardDeployment>();
  const [deployedBoardAPI, setDeployedBoardAPI] = useState<DeployedBBoardAPI>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [boardState, setBoardState] = useState<BBoardDerivedState>();
  const [messagePrompt, setMessagePrompt] = useState<string>('');
  const [isWorking, setIsWorking] = useState(!!boardDeployment$);
  const [copied, setCopied] = useState(false);

  const onCreateBoard = useCallback(() => boardApiProvider.resolve(), [boardApiProvider]);
  const onJoinBoard = useCallback(
    (contractAddress: ContractAddress) => boardApiProvider.resolve(contractAddress),
    [boardApiProvider],
  );

  const onPostMessage = useCallback(async () => {
    if (!messagePrompt) {
      return;
    }

    try {
      if (deployedBoardAPI) {
        setIsWorking(true);
        await deployedBoardAPI.post(messagePrompt);
        setMessagePrompt('');
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI, setErrorMessage, setIsWorking, messagePrompt]);

  const onDeleteMessage = useCallback(async () => {
    try {
      if (deployedBoardAPI) {
        setIsWorking(true);
        await deployedBoardAPI.takeDown();
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI, setErrorMessage, setIsWorking]);

  const onCopyContractAddress = useCallback(async () => {
    if (deployedBoardAPI) {
      await navigator.clipboard.writeText(deployedBoardAPI.deployedContractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [deployedBoardAPI]);

  useEffect(() => {
    if (!boardDeployment$) {
      return;
    }

    const subscription = boardDeployment$.subscribe(setBoardDeployment);

    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment$]);

  useEffect(() => {
    if (!boardDeployment) {
      return;
    }
    if (boardDeployment.status === 'in-progress') {
      return;
    }

    setIsWorking(false);

    if (boardDeployment.status === 'failed') {
      setErrorMessage(
        boardDeployment.error.message.length ? boardDeployment.error.message : 'Encountered an unexpected error.',
      );
      return;
    }

    setDeployedBoardAPI(boardDeployment.api);
    const subscription = boardDeployment.api.state$.subscribe(setBoardState);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment, setIsWorking, setErrorMessage, setDeployedBoardAPI]);

  return (
    <Card
      className="mn-glass mn-fade-in"
      sx={{
        position: 'relative',
        width: 340,
        minHeight: 380,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {!boardDeployment$ && (
        <EmptyCardContent onCreateBoardCallback={onCreateBoard} onJoinBoardCallback={onJoinBoard} />
      )}

      {boardDeployment$ && (
        <React.Fragment>
          {/* ZK Proof / Network processing backdrop */}
          <Backdrop
            sx={{
              position: 'absolute',
              color: '#a78bfa',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              flexDirection: 'column',
              gap: 2,
              p: 3,
              textAlign: 'center',
            }}
            open={isWorking}
          >
            <CircularProgress data-testid="board-working-indicator" color="inherit" size={44} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#e8e6f0' }}>
              Generating ZK Proof & Submitting...
            </Typography>
            <Typography variant="caption" sx={{ color: '#8b87a0', maxWidth: 220 }}>
              Executing Compact circuit locally in client browser
            </Typography>
          </Backdrop>

          {/* Error backdrop */}
          <Backdrop
            sx={{
              position: 'absolute',
              color: '#f472b6',
              zIndex: (theme) => theme.zIndex.drawer + 2,
              flexDirection: 'column',
              gap: 1.5,
              p: 3,
              textAlign: 'center',
            }}
            open={!!errorMessage}
            onClick={() => setErrorMessage(undefined)}
          >
            <StopIcon fontSize="large" />
            <Typography variant="body2" component="div" data-testid="board-error-message" sx={{ color: '#f472b6' }}>
              {errorMessage}
            </Typography>
            <Typography variant="caption" sx={{ color: '#8b87a0' }}>
              Click anywhere to dismiss
            </Typography>
          </Backdrop>

          {/* Card Header */}
          <CardHeader
            avatar={
              boardState ? (
                boardState.state === State.VACANT || (boardState.state === State.OCCUPIED && boardState.isOwner) ? (
                  <Tooltip title="Unlocked — You hold the private key for this message">
                    <LockOpenIcon data-testid="post-unlocked-icon" sx={{ color: '#2dd4bf' }} />
                  </Tooltip>
                ) : (
                  <Tooltip title="Locked — Posted by another private key owner">
                    <LockIcon data-testid="post-locked-icon" sx={{ color: '#f472b6' }} />
                  </Tooltip>
                )
              ) : (
                <Skeleton variant="circular" width={24} height={24} />
              )
            }
            titleTypographyProps={{
              color: 'textPrimary',
              fontWeight: 700,
              fontSize: '14px',
            }}
            title={toShortFormatContractAddress(deployedBoardAPI?.deployedContractAddress) ?? 'Deploying...'}
            subheader={
              boardState ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.2 }}>
                  <SecurityIcon sx={{ fontSize: 11, color: '#2dd4bf' }} />
                  <Typography variant="caption" sx={{ fontSize: '10px', color: '#2dd4bf', fontWeight: 600 }}>
                    {boardState.state === State.OCCUPIED
                      ? boardState.isOwner
                        ? 'Your Post (ZK Proven)'
                        : 'Occupied Board'
                      : 'Vacant Board'}
                  </Typography>
                </Box>
              ) : null
            }
            action={
              deployedBoardAPI?.deployedContractAddress ? (
                <Tooltip title={copied ? 'Copied!' : 'Copy full contract address'}>
                  <IconButton title="Copy contract address" onClick={onCopyContractAddress} size="small">
                    <CopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Skeleton variant="circular" width={20} height={20} />
              )
            }
            sx={{ pb: 1, borderBottom: '1px solid rgba(120,100,255,0.08)' }}
          />

          {/* Card Content */}
          <CardContent sx={{ flexGrow: 1, py: 2 }}>
            {boardState ? (
              boardState.state === State.OCCUPIED ? (
                <Box
                  sx={{
                    minHeight: 140,
                    p: 2,
                    borderRadius: '10px',
                    background: 'rgba(6, 6, 15, 0.5)',
                    border: '1px solid rgba(120, 100, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    data-testid="board-posted-message"
                    variant="body1"
                    sx={{
                      fontSize: '14px',
                      color: '#e8e6f0',
                      wordBreak: 'break-word',
                      lineHeight: 1.6,
                    }}
                  >
                    "{boardState.message}"
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 2 }}>
                    <KeyIcon sx={{ fontSize: 12, color: boardState.isOwner ? '#2dd4bf' : '#8b87a0' }} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '11px',
                        color: boardState.isOwner ? '#2dd4bf' : '#8b87a0',
                        fontWeight: 500,
                      }}
                    >
                      {boardState.isOwner
                        ? 'Verified Author: Secret Key Matches'
                        : 'Private Owner PK Hash Verified'}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <TextField
                  id="message-prompt"
                  data-testid="board-message-prompt"
                  variant="outlined"
                  fullWidth
                  multiline
                  minRows={5}
                  maxRows={5}
                  placeholder="Type a message to post to the board via ZK circuit..."
                  size="small"
                  value={messagePrompt}
                  onChange={(e) => setMessagePrompt(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '13px',
                    },
                  }}
                />
              )
            ) : (
              <Skeleton variant="rectangular" width="100%" height={140} sx={{ borderRadius: 2 }} />
            )}
          </CardContent>

          {/* Card Actions */}
          <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: 'space-between' }}>
            {deployedBoardAPI ? (
              <React.Fragment>
                <Tooltip title="Post message via ZK proof">
                  <span>
                    <IconButton
                      title="Post message"
                      data-testid="board-post-message-btn"
                      disabled={boardState?.state === State.OCCUPIED || !messagePrompt.trim().length}
                      onClick={onPostMessage}
                      sx={{
                        background:
                          boardState?.state === State.VACANT && messagePrompt.trim().length
                            ? 'linear-gradient(135deg, #7c5cfc 0%, #2dd4bf 100%)'
                            : 'rgba(120, 100, 255, 0.1)',
                        color:
                          boardState?.state === State.VACANT && messagePrompt.trim().length
                            ? '#fff'
                            : '#8b87a0',
                        borderRadius: '8px',
                        px: 2,
                        py: 0.8,
                        fontSize: '12px',
                        fontWeight: 600,
                        gap: 1,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #8b6dff 0%, #3de0cb 100%)',
                        },
                      }}
                    >
                      <WriteIcon fontSize="small" />
                      Post
                    </IconButton>
                  </span>
                </Tooltip>

                <Tooltip
                  title={
                    boardState?.state === State.VACANT
                      ? 'Board is currently vacant'
                      : boardState?.isOwner
                        ? 'Take down message (Authorized by ZK proof)'
                        : 'Only the original post author can take down this message'
                  }
                >
                  <span>
                    <IconButton
                      title="Take down message"
                      data-testid="board-take-down-message-btn"
                      disabled={
                        boardState?.state === State.VACANT ||
                        (boardState?.state === State.OCCUPIED && !boardState.isOwner)
                      }
                      onClick={onDeleteMessage}
                      sx={{
                        background:
                          boardState?.state === State.OCCUPIED && boardState.isOwner
                            ? 'rgba(244, 114, 182, 0.15)'
                            : 'rgba(120, 100, 255, 0.05)',
                        color:
                          boardState?.state === State.OCCUPIED && boardState.isOwner
                            ? '#f472b6'
                            : '#5a5670',
                        border: '1px solid',
                        borderColor:
                          boardState?.state === State.OCCUPIED && boardState.isOwner
                            ? 'rgba(244, 114, 182, 0.3)'
                            : 'transparent',
                        borderRadius: '8px',
                        px: 2,
                        py: 0.8,
                        fontSize: '12px',
                        fontWeight: 600,
                        gap: 1,
                        '&:hover': {
                          background: 'rgba(244, 114, 182, 0.25)',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                      Take Down
                    </IconButton>
                  </span>
                </Tooltip>
              </React.Fragment>
            ) : (
              <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 1 }} />
            )}
          </CardActions>
        </React.Fragment>
      )}
    </Card>
  );
};

/** @internal */
const toShortFormatContractAddress = (contractAddress: ContractAddress | undefined): React.ReactElement | undefined =>
  contractAddress ? (
    <span data-testid="board-address" className="mn-mono">
      0x{contractAddress.substring(0, 6)}...{contractAddress.substring(contractAddress.length - 6)}
    </span>
  ) : undefined;
