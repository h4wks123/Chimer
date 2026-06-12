CREATE DATABASE chimer;

CREATE TABLE users (
    id text not null primary key, 
    user_name text not null, 
    user_email text not null unique, 
    user_email_verified boolean not null, 
    user_profile text, 
    user_created_at timestamptz default CURRENT_TIMESTAMP not null, 
    user_updated_at timestamptz default CURRENT_TIMESTAMP not null
);

CREATE TABLE sessions (
    id text not null primary key, 
    session_expires_at timestamptz not null, 
    session_token text not null unique, 
    session_created_at timestamptz default CURRENT_TIMESTAMP not null, 
    session_updated_at timestamptz not null, 
    ip_address text, 
    user_agent text, 
    user_id text not null references users(id) on delete cascade
);

CREATE TABLE accounts (
    id text not null primary key, 
    account_secondary_id text not null, 
    account_provider_id text not null, 
    user_id text not null references users(id) on delete cascade, 
    account_access_token text, 
    account_refresh_token text, 
    account_id_token text, 
    account_access_token_expires_at timestamptz, 
    account_refresh_token_expires_at timestamptz, 
    account_scope text, 
    account_password text, 
    account_created_at timestamptz default CURRENT_TIMESTAMP not null, 
    account_uploaded_at timestamptz not null
);

CREATE TABLE verifications (
    id text not null primary key, 
    verification_identifier text not null, 
    verification_value text not null, 
    verification_expires_at timestamptz not null, 
    verification_created_at timestamptz default CURRENT_TIMESTAMP not null, 
    verification_updated_at timestamptz default CURRENT_TIMESTAMP not null
);

CREATE TABLE friends (
    id text not null primary key,
    user_id text not null references users(id) on delete cascade, 
    friend_of_user_id text not null references users(id) on delete cascade, 
    friend_created_at timestamptz default CURRENT_TIMESTAMP not null
);

CREATE TABLE messages (
    id text not null primary key,
    user_id text not null references users(id) on delete cascade, 
    sender_id text not null references users(id) on delete cascade, 
    message_text text not null,
    message_created_at timestamptz default CURRENT_TIMESTAMP not null
);

CREATE INDEX sessions_user_id_idx on sessions(id);

CREATE INDEX accounts_user_id_idx on accounts(id);

CREATE INDEX verifications_verification_identifier_idx on verifications(verification_identifier);