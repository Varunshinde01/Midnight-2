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

import { useCallback, useEffect, useState } from 'react';
import { useDeployedBoardContext } from './useDeployedBoardContext';
import { type WalletState } from '../contexts/BrowserDeployedBoardManager';

/**
 * A custom hook that provides wallet connection state and actions.
 *
 * @returns An object containing:
 * - `walletState` — The current wallet connection state (status, address, errorMessage).
 * - `connect` — A function to initiate wallet connection.
 * - `disconnect` — A function to disconnect the wallet.
 *
 * @remarks
 * This hook subscribes to the `walletState$` observable exposed by the
 * {@link DeployedBoardAPIProvider} and provides a reactive view of the
 * wallet connection lifecycle.
 */
export const useWalletConnection = () => {
  const boardApiProvider = useDeployedBoardContext();
  const [walletState, setWalletState] = useState<WalletState>({ status: 'disconnected' });

  useEffect(() => {
    const subscription = boardApiProvider.walletState$.subscribe(setWalletState);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardApiProvider]);

  const connect = useCallback(() => {
    return boardApiProvider.connect();
  }, [boardApiProvider]);

  const disconnect = useCallback(() => {
    boardApiProvider.disconnect();
  }, [boardApiProvider]);

  return {
    walletState,
    connect,
    disconnect,
  };
};
