-- +goose Up
CREATE TABLE comment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES "user"(id),
  post_id uuid NOT NULL REFERENCES post(id),
  content text NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  deleted_at timestamp
);

-- +goose Down
DROP TABLE comment;
