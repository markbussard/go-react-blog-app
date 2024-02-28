-- +goose Up
CREATE TABLE "like" (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES "user"(id),
  post_id uuid NOT NULL REFERENCES post(id),
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

-- +goose Down
DROP TABLE "like";
