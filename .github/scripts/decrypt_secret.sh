#!/bin/sh

mkdir $HOME/secrets

gpg --quiet \
--batch \
--yes \
--decrypt \
--passphrase="$GOOGLE_SECRET" \
--output $HOME/secrets/google.json google.json.gpg
