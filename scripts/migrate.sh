#!/bin/sh

npm run sequelize -- db:migrate --env test --config config/migration.js
