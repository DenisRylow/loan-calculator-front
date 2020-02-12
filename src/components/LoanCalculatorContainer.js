import React from 'react';
import LoanCalculatorView from './LoanCalculatorView';
import {loadLoan, getSchedule} from '../LoanService';
import {validateInterestRate, validateLoanSum} from '../ValidationService.js';

class LoanCalculatorContainer extends React.Component {
    state = {
        loaded: false,
        data: {},
        formValues: {selectedTerm: null, interestRate: null, loanSum: null},
        formValidationErrors: {interestRateValid: false, loanSumValid: false},
        loanValidationFunc: null,
        interestValidationFunc: null,
    }

    constructor(props, context) {
        super(props, context);       
        this.onTermSelect = this.onTermSelect.bind(this);
        this.onInterestInput = this.onInterestInput.bind(this);
        this.onLoanSumChange = this.onLoanSumChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        const loadFunc = ({data}) => {
            const processedData = { 
                ...data,
                maxLoanInterestRate: data.maxLoanInterestRate/100,
                minLoanInterestRate: data.minLoanInterestRate/100,
                defaultLoanInterestRate: data.defaultLoanInterestRate/100,
            };
            console.log('Loaded loan info: ', processedData);
            this.setState(
                {
                    loaded: true,
                    data: processedData,
                    loanValidationFunc: validateLoanSum(processedData.minLoanSum,processedData.maxLoanSum),
                    interestValidationFunc: validateInterestRate(processedData.minLoanInterestRate,processedData.maxLoanInterestRate),
                }
            );
        }
        this.loadLoanFunc = loadLoan()
            .then(loadFunc)
            .catch((err) => {console.log("Failed to load data.")});
    }

    onTermSelect(value) {
        this.setState({formValues: { ...this.state.formValues, selectedTerm: value}});
    }

    onSubmit(event) {
        event.preventDefault();
        getSchedule(parseInt(this.state.formValues.loanSum), parseFloat(this.state.formValues.interestRate) * 100, parseInt(this.state.formValues.selectedTerm))
            .then(({data}) => this.setState({schedule:data.schedule}))
            .catch(() => console.log('Failed to retrieve loan schedule.'));
    }

    onInterestInput(event) {
        event.preventDefault();
        this.setState({
            formValues: { ...this.state.formValues, interestRate: event.target.value},
            formValidationErrors: { ...this.state.formValidationErrors, interestRateValid: this.state.interestValidationFunc(event.target.value)}
        });
    }

    onLoanSumChange(event) {
        event.preventDefault();
        this.setState({
            formValues: { ...this.state.formValues, loanSum: event.target.value},
            formValidationErrors: { ...this.state.formValidationErrors, loanSumValid: this.state.loanValidationFunc(event.target.value)}
        });
    }

    render() {
        return(
            <LoanCalculatorView 
                loaded={this.state.loaded} 
                loanData={this.state.data}
                i18n={this.props.i18n}
                onTermSelect={this.onTermSelect}
                onInterestChange={this.onInterestInput}
                onLoanSumChange={this.onLoanSumChange}
                onSubmit={this.onSubmit}
                formValidationErrors={this.state.formValidationErrors}
                formValues={this.state.formValues}
                schedule={this.state.schedule}
            />
        )
    }
}
export default LoanCalculatorContainer;