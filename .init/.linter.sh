#!/bin/bash
cd /home/kavia/workspace/code-generation/tailwind-ui-clone-1854-1863/ui_library_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

