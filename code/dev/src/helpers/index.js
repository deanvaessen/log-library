/*******************************
 * [_index.js]
 * index file for the helpers
 ******************************/

/**
* { Dependencies }
*/
import MutationHelpers from './mutation';

/**
* { Function }
*/
const index = (function () {

			/**
			* Support helpers for mutation
			*/
			const mutation = {
				typography : {
					capitaliseFirstLetter : function (input){
						return MutationHelpers.typography.capitaliseFirstLetter(input);
					},
					filterSpecificFirstChar : function (input, charFilter){
						return MutationHelpers.typography.filterSpecificFirstChar(input, charFilter);
					},
					filterSpecificLastChar : function (input, charFilter){
						return MutationHelpers.typography.filterSpecificLastChar(input, charFilter);
					},
					removeWhitespace : function (input){
						return MutationHelpers.typography.removeWhitespace(input);
					},
					removeWhitespaceDuplicate : function (input){
						return MutationHelpers.typography.removeWhitespaceDuplicate(input);
					},
					removeWhitespaceTrailing : function (input){
						return MutationHelpers.typography.removeWhitespaceTrailing(input);
					},
					removeWhitespaceTrailingLeading : function (input){
						return MutationHelpers.typography.removeWhitespaceTrailingLeading(input);
					}
				}
			};

			return {
				mutation : mutation
			};
})();


/**
 * Export
 */
module.exports = index;
