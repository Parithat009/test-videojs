#!/usr/bin/env bash
set -Ex

function apply_path {

    echo "Check that we have NEXT_PUBLIC_URL vars"
    test -n "$NEXT_PUBLIC_URL"

    find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_URL#$NEXT_PUBLIC_URL#g"
    find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_NEXT_PUBLIC_ENV#$NEXT_PUBLIC_ENV#g"
}

apply_path
echo "Starting Nextjs"
exec "$@"