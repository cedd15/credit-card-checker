// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

//This function checks if the card entered is valid
function validateCred(array) {
    //we make sure the user enters array
    if (!Array.isArray(array)) {
        return 'You should give an array of to this function';
    }
    //checks if all elements are numbers
    const allNumbers = array.every(element => typeof element === 'number');
    if (!allNumbers) {
        return 'All elements of the array should be numbers';
    }
    //removes the last digit of the array
    const lastDigit = array.pop();
    //reverse the remaining elements of the array
    const reversedArray = array.reverse();
    //loops through the array by odd number
    for (let i = 1; i < reversedArray.length; i += 2) {
        //doubles the element
        reversedArray[i] *= 2;
        //if the doubled element exceed 9, it will be subtracted by 9
        if (reversedArray[i] > 9) {
            reversedArray[i] -= 9;
        }
    }
    //adds all elements in the reversedArray including the last digit
    let total = reversedArray.reduce((accumulator, currentVal) => accumulator + currentVal, lastDigit)
    //this tells us whether the card is valid or not
    return total % 2 === 0 ? true : false;
}

//This returns all invalid cards that we find in the nested array
function findInvalidCards(nestedArray) {
    const listOfInvalid = nestedArray.filter(element => !validateCred(element));
    return listOfInvalid;
}

let allInvalidCardNumbers = findInvalidCards(batch);
//console.log(allInvalidCardNumbers);

//This function needs all invalid card numbers to find out which company issued these invalid numbers
function idInvalidCardCompanies(nestedArray) {
    const arrayOfCompanies = [];
    nestedArray.forEach(element => {
        //element.shift() here means we need to obtain the first digit of the array
        switch(element.shift()) {
            //if the first digit is 3, it's from Amex and so on ...
            case 3:
                element = 'Amex';
                arrayOfCompanies.push(element);
                break;
            case 4:
                element = 'Visa';
                arrayOfCompanies.push(element);
                break;
            case 5:
                element = 'Mastercard';
                arrayOfCompanies.push(element);
                break;
            case 6:
                element = 'Discover';
                arrayOfCompanies.push(element);
                break;
            default:
                element = 'Company not found';
                break;
        }
    })
    return arrayOfCompanies;
}

console.log(idInvalidCardCompanies(allInvalidCardNumbers));
//returns ['Amex', 'Amex', 'Visa']
//means there are two invalid AMEX cards and one invalid VISA card