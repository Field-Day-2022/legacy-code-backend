/*
 * File: DataAccessObject-mysql.js
 * Version: 1.01
 * Date: 2020-03-07
 * Description: Outline for the lizard data form.
 */

module.exports = `Lizard Form
Date|DATE
SessionId|NUMBER
Species|TEXT_FIELD|identifying
Location|COMBO_BOXES|Site 1,Site 2,Site 3,Site 4|identifying
Clip Code|TEXT_FIELD|unique
Body Length|NUMBER|required
Tail Length|NUMBER|required
Capture Time|DATE|required
Notes|TEXT_AREA`;
