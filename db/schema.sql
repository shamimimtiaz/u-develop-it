/*This will drop/delete the tables every time you run the migration script, thus ensuring you're starting with a clean slate.*/
-- to track down when parties/candidates/voters/votes registered
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS voters;
DROP TABLE IF EXISTS votes;


CREATE TABLE parties (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT
);

CREATE TABLE candidates (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  industry_connected BOOLEAN NOT NULL,
  party_id INTEGER UNSIGNED, /* unsigned meaning it can't be a negative number.*/
  CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL
/*constraint allows us to flag the party_id field as an official foreign key and tells SQL which table and field it references.
it references the id field in the parties table. This ensures that no id can be inserted into the candidates table if it doesn't also exist in the parties table.
if a party is deleted we added ON DELETE SET NULL to tell SQL to set a candidate's party_id field to NULL if the corresponding row in parties is ever deleted.*/

);

CREATE TABLE voters (
  id INTEGER PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votes (
  id INTEGER PRIMARY KEY,
  voter_id INTEGER UNSIGNED NOT NULL,
  candidate_id INTEGER UNSIGNED NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  /*constraint, uc_voter, signifies that the values inserted into the voter_id field must be unique. */
  CONSTRAINT uc_voter UNIQUE (voter_id),
  /*With ON DELETE CASCADE, deleting the reference key will also delete the entire row from this table. */
  CONSTRAINT fk_voter FOREIGN KEY (voter_id) REFERENCES voters(id) ON DELETE CASCADE,
  CONSTRAINT fk_candidate FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

