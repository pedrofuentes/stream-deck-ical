import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import replace from '@rollup/plugin-replace';

const isProduction = process.env.NODE_ENV === 'production';
const isDebugMode = process.env.STREAMDECK_DEBUG === '1' || process.env.STREAMDECK_DEBUG === 'true';
const outputDir = isProduction ? 'release/com.pedrofuentes.ical.sdPlugin' : 'dist/com.pedrofuentes.ical.sdPlugin';

// Main plugin build (Node.js runtime)
const pluginConfig = {
  input: 'src/plugin.ts',
  output: {
    file: `${outputDir}/bin/plugin.js`,
    format: 'cjs',
    sourcemap: !isProduction,
    exports: 'auto'
  },
  external: [],
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
        'process.env.STREAMDECK_DEBUG': JSON.stringify(isDebugMode ? '1' : '0')
      }
    }),
    json(),
    resolve({
      preferBuiltins: true,
      exportConditions: ['node']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      sourceMap: !isProduction
    }),
    copy({
      targets: [
        { src: 'manifest.json', dest: outputDir },
        { src: 'assets', dest: outputDir },
        { src: 'bin-package.json', dest: `${outputDir}/bin`, rename: 'package.json' }
      ]
    })
  ]
};

// Property Inspector build (browser environment)
const piConfig = {
  input: 'pi/pi.js',
  output: {
    file: `${outputDir}/pi/pi.js`,
    format: 'iife',
    name: 'PI',
    sourcemap: !isProduction,
    footer: 'window.connectElgatoStreamDeckSocket = PI.connectElgatoStreamDeckSocket;'
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs(),
    copy({
      targets: [
        { src: 'pi/pi.html', dest: outputDir },
        { src: 'pi/setup.html', dest: outputDir },
        { src: 'pi/css', dest: outputDir }
      ]
    })
  ]
};

// Setup build (browser environment)
const setupConfig = {
  input: 'pi/setup.js',
  output: {
    file: `${outputDir}/pi/setup.js`,
    format: 'iife',
    sourcemap: !isProduction
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs()
  ]
};

export default [pluginConfig, piConfig, setupConfig];
