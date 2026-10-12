CREATE TABLE records (
  pk TEXT NOT NULL,
  sk TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 0 CHECK (version >= 0),
  document TEXT NOT NULL CHECK (json_valid(document)),
  PRIMARY KEY (pk, sk)
) WITHOUT ROWID;
