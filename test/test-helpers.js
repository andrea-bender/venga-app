/* eslint-disable indent */
'use strict';
function makeClimbsArray() {
	return [
		{
			id: 1,
			name: 'First test climb!',
			location: 'First location',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
			grade: 'V1',
			type: 'Boulder',
			rating: 5
		},
		{
			id: 2,
			name: 'Second test climb!',
			location: 'Second location',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
			grade: 'V6',
			type: 'Boulder',
			rating: 4
		},
		{
			id: 3,
			name: 'Third test climb!',
			location: 'third location',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
			grade: '5.12a',
			type: 'Sport',
			rating: 3
		},
		{
			id: 4,
			name: 'fourth test climb!',
			location: 'fourth location',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
			grade: '5.9',
			type: 'Traditional',
			rating: 4
		}
	];
}

module.exports = { makeClimbsArray };
