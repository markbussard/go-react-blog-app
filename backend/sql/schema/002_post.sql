-- +goose Up
CREATE TYPE post_status AS ENUM (
  'DRAFT',
  'PUBLISHED'
);

CREATE TYPE post_tag AS ENUM (
  'TECHNOLOGY',
  'SCIENCE',
  'PROGRAMMING'
);

CREATE TABLE post (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES "user"(id),
  slug VARCHAR(88) NOT NULL UNIQUE,
  title varchar(75) NOT NULL,
  subtitle varchar(175) NOT NULL,
  tags post_tag[],
  body text NOT NULL,
  status post_status NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  deleted_at timestamp
);

-- +goose Down
DROP TABLE post;
