/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
import { join } from 'path';
import { copyFiles } from './copy-files';
import { updatePackageVersion } from './package-versions';

import { buildConfig } from './build-config';
import { generateDocs } from './generate-docs';

const { packagesDir, outputDir, projectDir } = buildConfig;

/**
 * Copies different output files into a folder structure that follows the `angular/angular`
 * release folder structure. The output will also contain a README and the according package.json
 * file. Additionally the package will be Closure Compiler and AOT compatible.
 */
export function composeRelease(packageName: string): void {
   // To avoid refactoring of the project the package egeo will map to the source path `lib/`.
   const sourcePath = join(packagesDir, packageName === 'egeo' ? 'lib' : packageName);
   const releasePath = join(outputDir, packageName);

   copyFiles(projectDir, 'LICENSE', releasePath);
   copyFiles(packagesDir, 'README.md', releasePath);

   if (packageName !== 'egeo') {
      copyFiles(sourcePath, 'package.json', releasePath);
   } else {
      copyFiles(projectDir, 'CHANGELOG.md', releasePath);
      generateDocs(sourcePath, '**/README.md', releasePath);
   }

   updatePackageVersion(releasePath);
}
