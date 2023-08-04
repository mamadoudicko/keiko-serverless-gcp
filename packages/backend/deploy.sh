#!/bin/bash

while [[ $# -gt 0 ]]; do
    case "$1" in
    --function-name)
        FUNCTION_NAME="$2"
        shift 2
        ;;
    --runtime)
        RUNTIME="$2"
        shift 2
        ;;
    --trigger-type)
        TRIGGER_TYPE="$2"
        shift 2
        ;;
    *)
        echo "Unknown option: $1"
        exit 1
        ;;
    esac
done

# Check if FUNCTION_NAME is not provided
if [ -z "$FUNCTION_NAME" ]; then
    echo "Error: Function name is required."
    exit 1
fi

# Execute pnpm package
pnpm package

# Create a Bash script to generate package.json
cat <<EOF >dist/package.json
{
  "name": "project",
  "private": true,
  "version": "1.0.0",
  "main": "index.cjs"
}
EOF

# Deploy the function using Google Cloud Functions CLI
gcloud functions deploy "$FUNCTION_NAME" --runtime "$RUNTIME" --trigger-"$TRIGGER_TYPE" --allow-unauthenticated --source ./dist

#deploy from cli:
# pnpm run deploy --function-name hello2 --runtime nodejs16 --trigger-type http
