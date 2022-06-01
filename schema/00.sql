CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    "password" text NOT NULL,
    CONSTRAINT user_email_unique UNIQUE (email)
);

CREATE TYPE app_theme AS ENUM ('dark', 'light');

CREATE TABLE user_preferences (
    user_id uuid UNIQUE NOT NULL REFERENCES users(id),
    theme app_theme NOT NULL DEFAULT 'light'
);
