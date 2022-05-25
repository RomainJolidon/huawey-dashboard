CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    pseudo text NOT NULL,
    email text NOT NULL,
    "password" text NOT NULL,
    CONSTRAINT user_serial_unique UNIQUE (email)
);

CREATE TYPE app_theme AS ENUM ('dark', 'light');

CREATE TABLE user_preferences (
    user_id uuid NOT NULL REFERENCES users(id),
    theme app_theme NOT NULL DEFAULT 'light'
);
