/*******************************
 * [_mutation.js]
 * Define the helper function for misc. mutatation here
 ******************************/

/**
 * { Dependencies }
 */

 /**
 * { Function }
 */
 const index = (function () {

	/**
	 * { Typography }
	 * Support helpers for typography
	*/
	const typography = {

		// Support to capitalise a result
		capitaliseFirstLetter : function (input) {
			return input.charAt(0).toUpperCase() + input.slice(1);
		},

		removeWhitespace : function (input) {
			return input.replace(/\s/g, '');
		},

		removeWhitespaceDuplicate : function (input) {
			return input.replace(/\s+/g, ' ');
		},

		removeWhitespaceTrailing : function (input) {
			return input.replace(/((\s*\S+)*)\s*/, '$1');
		},

		removeWhitespaceTrailingLeading : function (input) {
			console.log(input);
			return input.replace(/\s*((\S+\s*)*)/, '$1');
		}
	};

	return {
		typography : typography
	};
 })();


 /**
  * Export
  */
 module.exports = index;
