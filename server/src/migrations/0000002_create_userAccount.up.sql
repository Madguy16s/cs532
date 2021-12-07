CREATE TABLE user_account (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(128) UNIQUE,
  name VARCHAR(128),
  email_verified BOOLEAN DEFAULT FALSE,
  password VARCHAR(256),
  admin_access access_type DEFAULT 'ADMIN',
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE INDEX email_user_account_idx ON user_account (email);