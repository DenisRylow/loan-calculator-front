const validateInterestRate = (min, max) => (value) => {
    var re = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (!re.test(value)) {
        return false;
    }
    return (value <= max) && (min <= value);
}

const validateLoanSum = (minSum, maxSum) => (value) => {
    var re = /^[0-9]+$/;
    if (!re.test(value)) {
        return false;
    }
    return (value <= maxSum) && (minSum <= value);
}

export {validateInterestRate, validateLoanSum};