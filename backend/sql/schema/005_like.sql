-- +goose Up
CREATE TYPE likeable_type AS ENUM (
  'POST',
  'COMMENT'
);

CREATE TABLE "like" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES "user"(id),
  likeable_id uuid NOT NULL,
  likeable_type likeable_type NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

-- +goose Down
DROP TABLE "like";
