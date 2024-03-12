# U-CALC-LATER

This is a simple calculator web application built with HTML, CSS (SCSS), and TypeScript.

## Overview

This calculator app allows users to perform basic arithmetic operations such as addition, subtraction, multiplication, division and modulo. It provides a clean and intuitive user interface for performing calculations.

## Features

-   Addition (+)
-   Subtraction (-)
-   Multiplication (\*)
-   Division (/)
-   Modulo (%)
-   Decimal point input (.)
-   Clearing the display (CE)

## Installation

To run this calculator app locally, follow these steps:

-   Clone this repository to your local machine:
    -   `git clone https://github.com/samuelmbp/calculator`
-   Open the project directory in your code editor.
-   Run `npm install` in the root folder
-   Run `npm run dev` and open the browser to `http://localhost:5173/`

## Usage

Once the calculator app is open in your web browser, you can perform the following actions:

-   Addition, subtraction, multiplication, division and modulo operations.
-   Decimal point support for floating-point calculations.
-   Clear Entry (CE) functionality to reset the current input.
-   Responsive design for seamless use on various devices.

## Code Structure

The code is organized into different modules for better maintainability and readability:

-   `style.scss`: Contains styles for the calculator UI.
-   `functions/`: Contains TypeScript functions for handling different calculator operations:
    -   `handleNumberButtons`: Handles number button clicks.
    -   `handleDecimalButton`: Handles decimal button click.
    -   `handleOperatorButton`: Handles operator button clicks.
    -   `handleEqual`: Handles equal button click to perform calculation.
    -   `handleClearButton`: Handles clear button click to clear the display.

The main functionality of the calculator is implemented in `main.ts`, which handles event delegation to listen to button clicks and perform appropriate actions based on the user's input.
