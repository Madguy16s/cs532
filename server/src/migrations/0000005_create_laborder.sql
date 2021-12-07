CREATE TABLE laborder(
  id BIGSERIAL PRIMARY KEY,
  doctor_id BIGINT REFERENCES user_account(id),
  labtech_id BIGINT REFERENCES user_account(id),
  patient_id BIGINT REFERENCES user_account(id),
  lab_id BIGINT REFERENCES drug(id),
  lab_data JSON,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);