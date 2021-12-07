CREATE TABLE prescription (
  id BIGSERIAL PRIMARY KEY,
  doctor_id BIGINT REFERENCES user_account(id),
  patient_id BIGINT REFERENCES user_account(id),
   pharmacist_id BIGINT REFERENCES user_account(id),
  drug_id BIGINT REFERENCES drug(id),
  drug_data JSON,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);