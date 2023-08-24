<p align="center">
    <img src="https://coursereport-production.imgix.net/uploads/school/logo/771/original/carleton-university-boot-camp-logo.png?w=72&h=72" height="250">
</p>

<p align="center">
    <a href="">
        <img alt="Carleton University" src="https://img.shields.io/static/v1.svg?label=bootcamp&message=Carleton&color=blue" /></a>
    <a href="" >
        <img alt="JavaScript - Functions" src="https://img.shields.io/static/v1.svg?label=JavaScripts&message=functions&color=red" /></a>
    <a href="" >
        <img alt="JavaScript - Prompts" src="https://img.shields.io/static/v1.svg?label=deployment&message=production&color=green" /></a>
</p>
<br/>

# Carleton University - Bootcamp

## Module 03 JavaScript: Password Generator

The challenge this week is to create an application that enables employees to generate random passwords based on criteria that they’ve selected. The generated password would be displayed on the web site (already provided).

<img src="./assets/img/PasswordGenerator.png" height="750">

## Business Requirements
The Password Generator should allow user to define some parameters that need to be taken into consideration. The JavaScript will take care to use selected parameters while creating the password. The prompts are as follow:

<ul>
<li><strong>Password Size</strong> - User is required to give a length of at least 8 characters and no more than 128 characters.</li>
<li><strong>Allow Special Characters</strong> - User will confirm whether or not to include lowercase, uppercase, numeric, and/or special characters.</li>
<li><strong>Error</strong> - Errors are prompted to the user. First t report the error and second tp ask if another attempt is required.</li>
</ul>

## Notes to consider
The Password Generator uses an algorithm to select a character in the building process. This is done as many times as specified in the Password Length.

> **Note**: Parameters required in the process are as follo:
>
> * Password Length - this is a numeric field.
>
> * Allow Special Characters - this is a boolean response.
>
> * Regular Characters: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
>
> * Special Characters: !#$%&()*+,-./:;<=>?@[\]^_{|} - Some characters have been removed.
>

- - -
© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved. Developed by Gustavo Miller
