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

import React, { type PropsWithChildren, createContext, useMemo } from 'react';
import { type DeployedBoardAPIProvider, BrowserDeployedBoardManager } from './BrowserDeployedBoardManager';
import { type Logger } from 'pino';

/**
 * Encapsulates a deployed boards provider as a context object.
 */
export const DeployedBoardContext = createContext<DeployedBoardAPIProvider | undefined>(undefined);

/**
 * The props required by the {@link DeployedBoardProvider} component.
 */
export type DeployedBoardProviderProps = PropsWithChildren<{
  /** The `pino` logger to use. */
  logger: Logger;
}>;

/**
 * A React component that sets a new {@link BrowserDeployedBoardManager} object as the currently
 * in-scope deployed board provider.
 *
 * @remarks Uses `useMemo` to ensure a stable reference across re-renders.
 */
export const DeployedBoardProvider: React.FC<Readonly<DeployedBoardProviderProps>> = ({ logger, children }) => {
  const manager = useMemo(() => new BrowserDeployedBoardManager(logger), [logger]);

  return (
    <DeployedBoardContext.Provider value={manager}>
      {children}
    </DeployedBoardContext.Provider>
  );
};
