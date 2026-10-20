#!/usr/bin/env bash
set -euo pipefail
# Relative assets work both at /mythras-tools/ and on a custom domain.
# Optional: ./build.sh /mythras-tools/
node scripts/build-pages.cjs "${1:-./}"
