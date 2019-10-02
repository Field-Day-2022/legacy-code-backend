const lizardFixture = require('./lizardFixture');
const fishFixture = require('./fishFixture');
const animalSessionFixture = require('./animalSessionFixture');
const locationSetFixture = require('./locationSetFixture');
const locationSetNoSecondaryFixture = require('./locationSetFixtureNoSecondary');
const formBuilder = require('../scripts/formBuilder');

module.exports.dataFormFixtures = {
  lizard: {
    fixture: lizardFixture,
    form: formBuilder.createDataForm(lizardFixture),
    screenName: 'Lizard',
    slug: 'lizard',
    id: 'lizard',
  },
  fish: {
    fixture: fishFixture,
    form: formBuilder.createDataForm(fishFixture),
    screenName: 'Fish',
    slug: 'fish',
    id: 'fish',
  },
};

module.exports.sessionFormFixtures = {
  animalSession: {
    fixture: animalSessionFixture,
    form: formBuilder.createSessionForm(animalSessionFixture),
    screenName: 'Animal Session',
    slug: 'animal-session',
    id: 'animalsession',
  },
};

module.exports.answerSetFixtures = {
  locationSet: {
    set: locationSetFixture,
    name: 'Location Answer Set',
    secondaryFields: ['lat', 'lon'],
    id: 'locationSet',
  },
  locationSetNoSecondary: {
    set: locationSetNoSecondaryFixture,
    name: 'Location Answer Set No Secondary',
    secondaryFields: null,
    id: 'locationSetNoSecondary',
  },
};
