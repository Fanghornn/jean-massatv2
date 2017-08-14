#!/bin/sh
certbot renew --pre-hook "service nginx stop" --post-hook "service nginx start"
