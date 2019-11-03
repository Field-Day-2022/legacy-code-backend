const fs = require('fs');
const jwt = require('jsonwebtoken');

const OPTIONS = {
  issuer: "FieldDat - Web",
  subject: "krshelle@asu.edu",
  audience: "fieldday.asu.edu",
  expiresIn: "15m",
  algorithm: "RS256"
};

const PAYLOAD = {
  policy: `
  "project":
    "\`/api/v2/project\` (GET, POST)
    \`/api/v2/project/:project_id\` (GET, PUT, DELETE)",
  "data_form":
    "\`/api/v2/data_form\` (GET, POST)
    \`/api/v2/data_form/:form_id\` (GET, PUT, DELETE)",
  "data_entry":
    "\`/api/v2/data_entry\` (GET, POST)
    \`/api/v2/data_entry/:session_id/:entry_id\` (GET, PUT, DELETE)",
  "session":
    "\`/api/v2/session\` (GET, POST)
    \`/api/v2/session/:session_id\` (GET, PUT, DELETE)",
  "answer_set":
    "\`/api/v2/answer_set\` (GET, POST)
    \`/api/v2/answer_set/:set_name\` (GET, PUT, DELETE)",
  "deleted_item":
    "\`/api/v2/deleted_item\` (GET, POST)
    \`/api/v2/deleted_item/:deleted_id\` (GET, PUT, DELETE)",
  "contributes_to":
    "\`/api/v2/contributes_to\` (GET, POST)
    \`/api/v2/contributes_to/:user_id/:project_id\` (GET, PUT, DELETE)",
  "belongs_to":
    "\`/api/v2/belongs_to\` (GET, POST)
    \`/api/v2/belongs_to/:form_id/:project_id\` (GET, PUT, DELETE)",
  `
};

class JWTToken {

  /**
   * Returns a token generated using the appropriate options and payload.
   * The token contains a payload of all the available endpoints the user
   * can access.
   *
   * @returns {undefined|*} The signed jwt token.
   */
  getJwtToken() {
    let privateKey = fs.readFileSync('./private.key', 'utf8');
    return jwt.sign(PAYLOAD, privateKey, OPTIONS);
  }

  /**
   * Verifies the passed JWT token.
   *
   * @param token
   * @returns {*} Whether or not the token is valid.
   */
  verifyJwtToken(token) {
    let publicKey = fs.readFileSync('./public.key', 'utf8');
    return jwt.verify(token, publicKey, OPTIONS);
  }

  /**
   * Handles the token post request by generating and returning a JWT token.
   *
   * @returns {*} The signed jwt token.
   */
  post() {
    return this.getJwtToken();
  }
}

module.exports = JWTToken;
