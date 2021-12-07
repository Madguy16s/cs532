CREATE OR REPLACE FUNCTION sync_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE counts (
  table_name VARCHAR(32) PRIMARY KEY,
  count BIGINT DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE TRIGGER update_counts_updated_at BEFORE UPDATE ON counts FOR EACH ROW EXECUTE PROCEDURE sync_updated_at_column();

CREATE TYPE access_type AS ENUM ('ADMIN', 'PATIENT', 'DOCTOR', 'LAB_TECH', 'PHARMACIST');