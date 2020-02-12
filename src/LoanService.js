import axios from 'axios';
import {loanBackUrl} from './config.js';

const loadLoan = () => {
    console.log("Getting loan info from backend.");
    return axios.get(loanBackUrl + "/loans/available", 
        {'headers': {'Accept': 'application/json'}}
    );
}

const getSchedule = (loan, interest, term) => {
    const data = {
        interestRateInBasisPoints: interest,
        loanTerm: term,
        loanedSum: loan
    };
    console.log("Retrieving loan schedule from backend.");
    return axios.put(loanBackUrl + "/calculator/loans/annuity", 
        data,
        {'headers': {'Accept': 'application/json'}}
    );
}


 export {loadLoan, getSchedule};