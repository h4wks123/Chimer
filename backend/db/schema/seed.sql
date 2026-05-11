-- INSERT INTO users (
--     id,
--     user_name,
--     user_email,
--     user_email_verified,
--     user_profile
-- )
-- VALUES
-- (
--     'FTKOGPccPSZwSqn48IFTLcV19q4oHZuX',
--     'hawks',
--     'hawks@example.com',
--     true,
--     'https://example.com/profiles/hawks.png'
-- ),
-- (
--     'WELnqN8OwRnXTu0U9bTi1Gm3eAiOq0O6',
--     'mercurial',
--     'mercurial@example.com',
--     true,
--     'https://example.com/profiles/mercurial.png'
-- );

-- INSERT INTO verifications (
--     id,
--     verification_identifier,
--     verification_value,
--     verification_expires_at
-- )
-- VALUES
-- (
--     'verification_01',
--     'hawks@example.com',
--     '123456',
--     CURRENT_TIMESTAMP + interval '15 minutes'
-- ),
-- (
--     'verification_02',
--     'mercurial@example.com',
--     '654321',
--     CURRENT_TIMESTAMP + interval '15 minutes'
-- );

-- INSERT INTO sessions (
--     id,
--     session_expires_at,
--     session_token,
--     session_updated_at,
--     ip_address,
--     user_agent,
--     user_id
-- )
-- VALUES
-- (
--     'session_01',
--     CURRENT_TIMESTAMP + interval '30 days',
--     'token_01',
--     CURRENT_TIMESTAMP,
--     '127.0.0.1',
--     'Mozilla/5.0',
--     'FTKOGPccPSZwSqn48IFTLcV19q4oHZuX'
-- ),
-- (
--     'session_02',
--     CURRENT_TIMESTAMP + interval '30 days',
--     'token_02',
--     CURRENT_TIMESTAMP,
--     '127.0.0.1',
--     'Mozilla/5.0',
--     'WELnqN8OwRnXTu0U9bTi1Gm3eAiOq0O6'
-- );

-- INSERT INTO accounts (
--     id,
--     account_secondary_id,
--     account_provider_id,
--     user_id,
--     account_access_token,
--     account_refresh_token,
--     account_scope,
--     account_created_at,
--     account_uploaded_at
-- )
-- VALUES
-- (
--     'account_01',
--     'google_01',
--     'google',
--     'FTKOGPccPSZwSqn48IFTLcV19q4oHZuX',
--     'access_token_01',
--     'refresh_token_01',
--     'openid profile email',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
-- ),
-- (
--     'account_02',
--     'google_02',
--     'google',
--     'WELnqN8OwRnXTu0U9bTi1Gm3eAiOq0O6',
--     'access_token_02',
--     'refresh_token_02',
--     'openid profile email',
--     CURRENT_TIMESTAMP,
--     CURRENT_TIMESTAMP
-- );

INSERT INTO friends (
    id,
    user_id,
    friend_of_user_id
)
VALUES
(
    'friend_01',
    'FTKOGPccPSZwSqn48IFTLcV19q4oHZuX',
    'WELnqN8OwRnXTu0U9bTi1Gm3eAiOq0O6'
),
(
    'friend_02',
    'WELnqN8OwRnXTu0U9bTi1Gm3eAiOq0O6',
    'FTKOGPccPSZwSqn48IFTLcV19q4oHZuX'
);

INSERT INTO chats (
    id,
    chat_name
)
VALUES
(
    'chat_01',
    'Direct Message'
);

INSERT INTO members (
    id,
    user_id,
    chat_id
)
VALUES
(
    'member_01',
    'FTKOGPccPSZwSqn48IFTLcV19q4oHZuX',
    'chat_01'
),
(
    'member_02',
    'WELnqN8OwRnXTu0U9bTi1Gm3eAiOq0O6',
    'chat_01'
);

INSERT INTO messages (
    id,
    user_id,
    chat_id,
    message_text,
    message_created_at
)
VALUES
(
    'message_01',
    'FTKOGPccPSZwSqn48IFTLcV19q4oHZuX',
    'chat_01',
    'Hello',
    CURRENT_TIMESTAMP
),
(
    'message_02',
    'WELnqN8OwRnXTu0U9bTi1Gm3eAiOq0O6',
    'chat_01',
    'Hi',
    CURRENT_TIMESTAMP
);