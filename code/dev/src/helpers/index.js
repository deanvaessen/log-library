/*******************************
 * [_index.js]
 * index file for the helpers
 ******************************/

/**
* { Dependencies }
*/
//import translateNumberHelper from './translateNumber';
/*import loggerHelpers from './logger';*/
import MutationHelpers from './mutation';

/**
* { Function }
*/
const index = (function () {

			/**
			* Support helpers for translation
			*/
/*			const translation = {
				number : function (input, callback) {
					translateNumberHelper(input, callback);
				}
			};*/

			/**
			* Logger
			*/
/*			const logger = function (input, callback) {
				loggerHelpers(input, callback);
			};*/

			/**
			* Support helpers for mutation
			*/
			const mutation = {
				typography : {
					capitaliseFirstLetter : function (input){
						return MutationHelpers.typography.capitaliseFirstLetter(input);
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
				//translation : translation,
				//logger : logger,
				mutation : mutation
			};
})();


/**
 * Export
 */
module.exports = index;
