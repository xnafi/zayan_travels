import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      include: [
        '**/components/site/ContactForm.{ts,tsx}',
        '**/components/ui/Button.{ts,tsx}',
        '**/components/ui/Input.{ts,tsx}',
        '**/lib/validations/*.schema.{ts,tsx}'
      ],
      exclude: ['**/*.test.{ts,tsx}', '**/node_modules/**', 'tests/**'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60
      }
    }
  }
})