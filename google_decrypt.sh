#!/bin/sh

gpg --quiet \
--batch \
--yes \
--decrypt \
--passphrase="$GOOGLE_SECRET" \
--output $HOME/google.json google.json.gpg
