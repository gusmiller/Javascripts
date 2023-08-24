// Assignment Code
var generateBtn = document.querySelector("#generate");
// Returns the first #passwod element. We move out to make it available globally
var passwordText = document.querySelector("#password");
var allowSpecial = false;

// Available characters for password generation
const regularCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const specialCharacters = '!#$%&()*+,-./:;<=>?@[\]^_{|}';

// Write password to the #password input
function writePassword() {

  // Pass call to promptPasswordLenght method - validation is performed
  // at this level. Method returns '0' as invalid entry
  var passwordLength = promptPasswordLength();

  if (passwordLength != 0) {
    var password = generatePassword(passwordLength);
    passwordText.value = password;
  }

}

/**
 * This method will prompt user for password length and validate the information
 * entered. It will return '0' when value is incorrect. Message is posted into
 * the website interface
 * @returns valid numeric value
 */
function promptPasswordLength() {
  let pwdLength =
    prompt("Choose password length between 8 characters and no more than 128",
      "Enter Password Length");

  // Validate the variable type. User may cancel.
  if (typeof pwdLength !== 'string') {
    displayError("Invalid type! Enter a number value between 8 and 128.");
    pwdLength = 0; // Invalidate process
    return pwdLength; // Terminate flow
  }

  // Validation type was successfull. Validate now the business requirements.
  if (pwdLength < 8 || pwdLength > 128) {
    displayError("Invalid password length! Enter a number between 8 and 128.");
    pwdLength = 0; // Invalidate process
  }

  passwordText.value = 'Your Secure Password';
  passwordText.setAttribute("style", "color:black; font-size: 1.2em");

  // Second business requirement: include lowercase, uppercase, numeric, 
  // and/or special characters
  confirmSpecialCharacters();

  return pwdLength; // Return value selected
}

/**
 * This method will present user with second business rules. include uppercase, 
 * // numeric, lowercase, and/or special characters
 * @returns (boolean) true/false
 */
function confirmSpecialCharacters() {

  allowSpecial = confirm("Would you like to include lowercase, uppercase, numeric, and/or special characters")
  return false;
}

/**
 * This method will generate the password based on the parameters set by the user
 * It may of may not require special characters. Process will use a while rather than a for loop;
 * looping the number of times 
 * @param {*} length - length of he string
 * @returns (string) - new password
 */
function generatePassword(length) {

  let result = ''; // Variable that will return the password

  // Instantiate the available characters to use. In this case as default we need the 
  // alphabet characters.
  var characters = regularCharacters;

  // Validate user has selected the Special Characters or not. In case true then we 
  // concatenate the special characters.
  if (allowSpecial === true) {
    characters = characters.concat(specialCharacters);
  }

  // We now have the characters that will be involved in the process.
  console.log(characters);

  let charCounter = 0; // Initialize the counter

  // Perform the algrithm as many times as specified in the length of the password
  while (charCounter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    charCounter += 1;
  }

  return result;
}

/**
 * This method will display and format the password text.
 * @param {*} value - Error string to display
 */
function displayError(value) {
  passwordText.value = value;
  passwordText.setAttribute("style", "color:red; font-size: 1.5em");
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
