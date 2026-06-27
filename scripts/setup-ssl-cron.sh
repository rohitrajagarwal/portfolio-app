#!/bin/bash
# One-time setup: installs a cron job that runs renew-ssl.sh twice a day.
# Run this once on the EC2 server as root (or with sudo).
# Usage: sudo bash scripts/setup-ssl-cron.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RENEW_SCRIPT="$SCRIPT_DIR/renew-ssl.sh"
CRON_FILE="/etc/cron.d/ssl-renewal"

# Verify the renewal script exists and is executable
if [ ! -f "$RENEW_SCRIPT" ]; then
    echo "ERROR: renew-ssl.sh not found at $RENEW_SCRIPT"
    exit 1
fi
chmod +x "$RENEW_SCRIPT"

# Write the cron job: runs at 03:00 and 15:00 every day.
# Staggered times avoid the Let's Encrypt rate-limit window that runs at midnight.
cat > "$CRON_FILE" <<EOF
# SSL certificate auto-renewal — runs twice daily
# Certbot only renews when expiry is within 30 days, so frequent runs are safe.
0 3,15 * * * root $RENEW_SCRIPT
EOF

chmod 644 "$CRON_FILE"
echo "Cron job installed at $CRON_FILE"
echo "Schedule: 03:00 and 15:00 daily (server local time)"
echo ""
echo "To verify: crontab -l  OR  cat $CRON_FILE"
echo "To run a manual test now: sudo bash $RENEW_SCRIPT"
