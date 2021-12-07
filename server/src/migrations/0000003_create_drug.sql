CREATE TABLE drug (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(128) UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);