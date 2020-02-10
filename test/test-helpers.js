/* eslint-disable indent */
'use strict';
function makeClimbsArray() {
	return [
		{
			id: 1,
			name: 'First test climb!',
			location: 'First location',
			grade: 'V1',
			type: 'Boulder',
			rating: 5,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
		},
		{
			id: 2,
			name: 'Second test climb!',
			location: 'Second location',
			grade: 'V6',
			type: 'Boulder',
			rating: 4,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
		},
		{
			id: 3,
			name: 'Third test climb!',
			location: 'third location',
			grade: '5.12a',
			type: 'Sport',
			rating: 3,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
		},
		{
			id: 4,
			name: 'Fourth test climb!',
			location: 'fourth location',
			grade: '5.9+',
			type: 'Traditional',
			rating: 3,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
		}
	];
}

module.exports = { makeClimbsArray };
