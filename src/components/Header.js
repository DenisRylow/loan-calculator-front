import React from 'react';
import './Header.css';

class Header extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        return(
            <div className="header">
                <div className="text">
                    <p className="calc">{this.props.i18n.t('header')}</p>
                    <p className="company">{this.props.i18n.t('company')}</p>
                </div>
            </div>
        )
    }
}
export default Header;