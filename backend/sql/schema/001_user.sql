-- +goose Up
CREATE TABLE "user" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id varchar(28) NOT NULL UNIQUE,
  email varchar(255) NOT NULL UNIQUE,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

-- +goose Down
DROP TABLE "user";
