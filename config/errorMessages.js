/**
 * List of all standard error messages with error codes
 */

 const errorMessages = [
     { ErrorCode: 800, ErrorMessage: 'There was an unexpected error.' },     
     { ErrorCode: 101, ErrorMessage: 'Please enter first name.' },
     { ErrorCode: 102, ErrorMessage: 'Please enter last name.' },
     { ErrorCode: 103, ErrorMessage: 'Please enter Email ID.' },
     { ErrorCode: 104, ErrorMessage: 'Please enter a valid Email ID.' },
     { ErrorCode: 105, ErrorMessage: 'Please enter a password.' },
     { ErrorCode: 106, ErrorMessage: 'Please enter a valid city.' },
     { ErrorCode: 107, ErrorMessage: 'An user with the same email already exists.' },
     { ErrorCode: 998, ErrorMessage: 'Invalid params - per_page & page are collectively required.' },
     
     { ErrorCode: 601, ErrorMessage: 'User not found.' },
     { ErrorCode: 602, ErrorMessage: 'Incorrect password.' },

     { ErrorCode: 160, ErrorMessage: 'Please enter category name.' }
 ]

 /**
  * Get error message from error code
  * @param {number} errorCode
  */
module.exports = function GetErrorMessage(errorCode) {
    var pickedError = errorMessages.find(a => a.ErrorCode === errorCode);
    if(pickedError) {
        return pickedError.ErrorMessage;
    }
    else {
        return 'Unexpected error.';
    }
 }