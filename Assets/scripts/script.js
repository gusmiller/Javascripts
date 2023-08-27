/*!
  * Carleton Bootcamp - 2023
  * Copyright 2023 Gustavo Miller
  * Licensed under MIT 
  * Assignment - 03 Javascripts Password Generator
  */

// Global variables and constants, available to all methods.
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");
var displayParameters = document.querySelector("#parametersUsed");
var alertDelay = 250; // 250 milliseconds or .25 seconds

// Available characters for password generation
const regularCharacters = 'abcdefghijklmnopqrstuvwxyz'; // Use string.toUppercase() when required
const numericCharacters = "0123456789"
const specialCharacters = '!#$%&()*+,-.:;<=>?@[\]^_{|}';

var allowSpecial = false; //Allow special characters boolean value
var allowUpper = false; //Allow uppercase characters boolean value
var allowNumeric = false; //Allow numbers boolean value
var allowLower = true;//Allow lowercase characters boolean value

/**
 * Write password to the #password input. This is the initial trigger of the 
 * Password Generator. There is no parameter required. I have moved the Event 
 * Listener below this functions for readabilty purposes.
 */
function writePassword() {

  // Pass call to promptPasswordLenght method - validation is performed at this level. 
  // Method returns '0' as invalid entry, only when we have a valid entry we retrieve the rest.
  var passwordLength = promptPasswordLength();

  if (passwordLength > 0 || passwordLength != null) {

    // If the password length passed the we go to the second business requirement: 
    // include lowercase, uppercase, numeric, and/or special characters
    allowSpecial = specialCharactersAllowed();
    allowUpper = uppercaseCharecters();
    allowLower = lowercaseCharacters();
    allowNumeric = confirmNumbers();

    // Validate whether the user has NOT selected anything. Prompt user and cancel event
    if (allowSpecial == false && allowUpper == false && allowLower == false && allowNumeric == false) {
      return displayError("There is nothing to generate the password!");
    }

    // Free to generate the password!
    var password = generatePassword(passwordLength);

    // Validate whether final validation was successfull!
    if (password != null) {
      passwordText.value = password;
      displayParameters.removeAttribute("hidden");
      displayParameters.textContent = parametersUsed(passwordLength);
    }
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

/**
 * This method will prompt user for password length. It will return null when 
 * value is incorrect. Message is posted into the website interface
 * @returns valid numeric value
 */
function promptPasswordLength() {

  var pwdLength =
    prompt("Choose password length between 8 characters and no more than 128",
      "Enter Password Length");

  // User might cancel the process right off the bat. Validate if the response 
  // is null or entry is not a number.
  if (pwdLength == null || isNumber(pwdLength) == false) {
    displayError("Password length you must enter a numeric value, between 8 characters and no more than 128!");
    return null; // Invalidate process
  }

  pwdLength = Number(pwdLength);// Attempt to convert entry to an integer

  // Validation type was successfull. Validate now the business requirements.
  if (pwdLength < 8 || pwdLength > 128) {
    displayError("Invalid password length! Enter a number between 8 and 128.");
    return null; // Invalidate process
  }
  return pwdLength; // Return value selected
}

/**
 * This method will generate the password based on the parameters set by the user
 * Process will use a WHILE rather than a for loop; it loops the number of times specified
 * in the length 
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
  if (allowSpecial === true) { characters = characters.concat(specialCharacters); }
  if (allowNumeric == true) { characters = characters.concat(numericCharacters); }
  if (allowLower == true) { characters = characters.concat(regularCharacters); }
  if (allowUpper == true) { characters = characters.concat(regularCharacters.toUpperCase()); }

  let charCounter = 0; // Initialize the counter

  // Perform the algrithm as many times as specified in the length of the password
  while (charCounter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    charCounter += 1;
  }

  if (validateContainsSpecial(result) == false) {
    displayError("The password does not contain any special characters!");
    return null; // Invalidate process
  }

  return result;
}

/**
 * This method will use regular expressions to validate whether the password 
 * generated contains any of the special characters we have defined
 * @param {*} value 
 * @returns true/false
 */
function validateContainsSpecial(value) {
  var regexstring = "whatever";
  var regexp = new RegExp(regexstring, "gi");
  var str = "whateverTest";
  var str2 = str.replace(regexp, "other");

  var exp = new RegExp("/{" + specialCharacters + "}$/")
  var expressionValidate = new RegExp(`ReGeX${specialCharacters}ReGeX`);
  return value.match(expressionValidate) ? true : false;
}

/**
 * This method will present user with second business rules. include special characters
 * @returns (boolean) true/false
 */
function specialCharactersAllowed() {
  return confirm("Would you like to include Special characters?");
}

/**
 * This method will prompt user for confirmation whether to include or not numeric
 * values based on business rule
 * @returns (boolean) true/false
 */
function confirmNumbers() {
  return confirm("Would you like to include Numeric values?");
}

/**
 * This method will prompt user for confirmation whether to include or not uppercase
 * values based on business rule
 * @returns (boolean) true/false
 */
function uppercaseCharecters() {
  return confirm("Would you like to include Uppercase Characters?");
}

/**
 * This method will prompt user for confirmation whether to include or not lowercase
 * values based on business rule
 * @returns (boolean) true/false
 */
function lowercaseCharacters() {
  return confirm("Would you like to include Lowercase Characters?");
}

/**
 * Validate that string passed is a numeric value
 * @param {*} n - value to evaluate
 * @returns true/false
 */
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * This method will display and format the password text.
 * @param {*} value - Error string to display
 */
function displayError(value) {
  passwordText.value = value;
  passwordText.setAttribute("style", "color:red; font-size: 1.5em");

  setTimeout(function () {
    alert(value);
  }, alertDelay);

  clearError() // Clear messages area
}

/**
 * This method will clear the message, it will trigger at .25 seconds, 
 * giving time to DOM reset text and reset the styling.
 */
function clearError() {
  setTimeout(function () {
    passwordText.value = null;
    passwordText.setAttribute("style", "color:black; font-size: 1.2em");
    displayParameters.setAttribute("hidden", "");
  }, alertDelay);
}

/**
 * This method will build a string with the parameters selected by the user
 * in building password. The process extracts the last character in the 
 * string (should be a comma).
 * @returns string 
 */
function parametersUsed(value) {
  var results = "Password Criteria: " + value + " characters. Include: "
  if (allowSpecial == true) {
    results = results.concat("special characters, ")
  }
  if (allowLower == true) {
    results = results.concat("lower cases, ")
  }
  if (allowUpper == true) {
    results = results.concat("upper case, ")
  }
  if (allowNumeric == true) {
    results = results.concat("numbers, ")
  }

  return results.substring(0, results.length - 1);
}