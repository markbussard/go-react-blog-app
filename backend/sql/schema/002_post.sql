-- +goose Up
CREATE TYPE post_status AS ENUM (
  'DRAFT',
  'PUBLISHED'
);

CREATE TABLE post (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES "user"(id),
  title varchar(255) NOT NULL,
  body text NOT NULL,
  status post_status NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  deleted_at timestamp
);

-- +goose Down
DROP TABLE post;
