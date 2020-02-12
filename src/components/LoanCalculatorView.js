import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import './LoanCalculatorView.css';
import Table from 'react-bootstrap/Table';
import {numberOfDigitsPastFractionDelimiter} from '../config';

class LoanCalculatorView extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    formatMoney(value) {
        const castValue = "" + value;
        const position = castValue.indexOf('.');
        if (Number.isInteger(value) || position == -1) {
            return value;
        } 
        const fractionLength = castValue.length - position - 1;
        if (fractionLength < numberOfDigitsPastFractionDelimiter) {
            return castValue + "0".repeat(numberOfDigitsPastFractionDelimiter - fractionLength); 
        } else {
            return castValue;
        }
    }

    render() {
        return(
            <div className="loanCalcBlock">
                <Jumbotron fluid>
                    <Form className="inputBlock">
                        <div className="inputForms">
                            <Form.Group controlId="formLoan">
                            <Form.Label>{this.props.i18n.t('formLoan')}</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder={!this.props.loaded ? null : this.props.loanData.defaultLoanSum} 
                                    disabled={!this.props.loaded}
                                    onChange={this.props.onLoanSumChange}
                                    isInvalid={!this.props.formValidationErrors.loanSumValid}
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    {this.props.loaded && (this.props.i18n.t('formInvalidLoanTerm1') + this.props.loanData.minLoanSum + this.props.i18n.t('formInvalidLoanTerm2') + this.props.loanData.maxLoanSum)}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formPercent">
                            <Form.Label>{this.props.i18n.t('formInterestRate')}</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder={!this.props.loaded ? null : this.props.loanData.defaultLoanInterestRate}
                                    disabled={!this.props.loaded}
                                    onChange={this.props.onInterestChange}
                                    isInvalid={!this.props.formValidationErrors.interestRateValid}
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    {this.props.loaded && (this.props.i18n.t('formInvalidInterestRate1') + this.props.loanData.minLoanInterestRate + this.props.i18n.t('formInvalidInterestRate2') + this.props.loanData.maxLoanInterestRate)}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Dropdown>
                            <Dropdown.Toggle 
                                variant='Info' 
                                id="dropdown-basic"
                                disabled={!this.props.loaded}
                            >
                                {!this.props.formValues.selectedTerm ? this.props.i18n.t('formLoanTerm') : this.props.i18n.t('loanFor') + this.props.formValues.selectedTerm + ' ' + this.props.i18n.t('months')}
                            </Dropdown.Toggle>
                            <Dropdown.Menu onSelect={this.props.onTermSelect} >
                                {!this.props.loaded ? null : this.props.loanData.possibleLoanTerms.map( (value) => 
                                        <Dropdown.Item onSelect={this.props.onTermSelect} key={value} eventKey={value}>{this.props.i18n.t('loanFor')} {value} {this.props.i18n.t('months')}</Dropdown.Item>)
                                }
                            </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="inputButton">
                            <Button 
                                disabled={!this.props.loaded || !this.props.formValidationErrors.loanSumValid || !this.props.formValidationErrors.interestRateValid || !this.props.formValues.selectedTerm } 
                                onClick={this.props.onSubmit} 
                                variant="primary" 
                                type="submit"
                            >
                                {this.props.i18n.t('formButton')}
                            </Button>
                        </div>
                    </Form>
          
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>{this.props.i18n.t('tableCol1')}</th>
                        <th>{this.props.i18n.t('tableCol2')}</th>
                        <th>{this.props.i18n.t('tableCol3')}</th>
                        <th>{this.props.i18n.t('tableCol4')}</th>
                        <th>{this.props.i18n.t('tableCol5')}</th>
                        <th>{this.props.i18n.t('tableCol6')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!this.props.schedule || this.props.schedule.map( (value, ind) => {
                            console.log(value);
                            return (                      
                                <tr key={ind}>
                                    <td>{ind + 1}</td>
                                    <td>{value.month + 1}/{value.year}</td>
                                    <td>{this.formatMoney(value.paymentToPrincipal)}</td>
                                    <td>{this.formatMoney(value.paymentToInterest)}</td>
                                    <td>{this.formatMoney(value.debt)}</td>
                                    <td>{this.formatMoney(value.totalPayment)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </Table>
                </Jumbotron>
            </div>
        )
    }
}
export default LoanCalculatorView;