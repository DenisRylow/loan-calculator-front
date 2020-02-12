import React from 'react';
import './ApplicationView.css';
import Header from './Header';
import LoanCalculatorContainer from './LoanCalculatorContainer';

class ApplicationView extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        return(
            <React.Fragment>
                <Header i18n={this.props.i18n}/>
                <LoanCalculatorContainer i18n={this.props.i18n}/>
            </React.Fragment>
        )
    }
}
export default ApplicationView;