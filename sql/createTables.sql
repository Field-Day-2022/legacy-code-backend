CREATE TABLE IF NOT EXISTS User (
  user_id VARCHAR(40) PRIMARY KEY,
  password VARCHAR(40),
  access_level INTEGER NOT NULL,
  date_modified INTEGER
);

CREATE TABLE IF NOT EXISTS Project (
  project_id INTEGER PRIMARY KEY,
  project_name VARCHAR(40) NOT NULL,
  comments text,
  date_modified INTEGER
);

CREATE TABLE IF NOT EXISTS ContributesTo (
  user_id VARCHAR(40) NOT NULL,
  project_id INTEGER NOT NULL,
  date_modified INTEGER,
    PRIMARY KEY (user_id, project_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_id) REFERENCES Project(project_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS DataForm (
  form_id INTEGER PRIMARY KEY,
  form_name VARCHAR(40) NOT NULL,
  template_json text NOT NULL,
  date_modified INTEGER NOT NULL,
  is_session_form INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Session (
  session_id INTEGER PRIMARY KEY,
  session_json text NOT NULL,
  project_id INTEGER NOT NULL,
  date_modified INTEGER,
  form_id INTEGER NOT NULL,
  FOREIGN KEY (form_id) REFERENCES DataForm(form_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_id) REFERENCES Project(project_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS DataEntry (
  form_id INTEGER NOT NULL,
  session_id INTEGER NOT NULL,
  entry_id INTEGER,
  date_modified INTEGER,
  entry_json text NOT NULL,
  project_id INTEGER NOT NULL,
  PRIMARY KEY (session_id, entry_id),
  FOREIGN KEY (form_id) REFERENCES DataForm(form_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_id) REFERENCES Project(project_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (session_id) REFERENCES Session(session_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS AnswerSet (
  set_name VARCHAR(40) PRIMARY KEY,
  answers text NOT NULL,
  secondary_keys text,
  date_modified INTEGER
);

CREATE TABLE IF NOT EXISTS BelongsTo (
  form_id INTEGER NOT NULL,
  project_id INTEGER NOT NULL,
  date_modified INTEGER,
    PRIMARY KEY (form_id, project_id),
  FOREIGN KEY (form_id) REFERENCES DataForm(form_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_id) REFERENCES Project(project_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS DeletedItem (
  deleted_id INTEGER PRIMARY KEY,
  date_deleted INTEGER,
  table_name VARCHAR(40),
  item_json text
);

CREATE TABLE IF NOT EXISTS ServerInformation (
  server_name VARCHAR(100) PRIMARY KEY,
  server_url VARCHAR(100) NOT NULL,
  last_synced INTEGER,
  is_active INTEGER
);