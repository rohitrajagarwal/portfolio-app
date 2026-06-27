#!/bin/bash
# SSL certificate renewal script using Certbot + Let's Encrypt.
# Certbot only renews when the cert is within 30 days of expiry, so it is
# safe to run this script frequently (e.g. twice a day).

set -euo pipefail

LOG_FILE="/var/log/ssl-renewal.log"
DOMAIN="rohitrajagarwal.com"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

# Ensure the log file exists and is writable
touch "$LOG_FILE" 2>/dev/null || { echo "Cannot write to $LOG_FILE. Run as root or sudo."; exit 1; }

log "Starting SSL renewal check for $DOMAIN"

# Verify certbot is available
if ! command -v certbot &>/dev/null; then
    log "ERROR: certbot not found. Install with: sudo apt install certbot python3-certbot-nginx"
    exit 1
fi

# Verify nginx is available
if ! command -v nginx &>/dev/null; then
    log "ERROR: nginx not found."
    exit 1
fi

# Run renewal. Certbot exits 0 whether or not a cert was actually renewed.
# --nginx updates nginx config automatically and reloads nginx after renewal.
# --quiet suppresses output unless an error occurs.
if certbot renew --quiet --nginx --deploy-hook "nginx -s reload" 2>&1 | tee -a "$LOG_FILE"; then
    log "Renewal check completed successfully."
else
    log "ERROR: certbot renew failed (exit code $?)."
    exit 1
fi

# Print current expiry date for confirmation
EXPIRY=$(openssl s_client -connect "${DOMAIN}:443" -servername "$DOMAIN" \
    </dev/null 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null || true)
if [ -n "$EXPIRY" ]; then
    log "Current certificate expiry: $EXPIRY"
fi

log "Done."
