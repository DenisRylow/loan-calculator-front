import React from 'react';
import ApplicationView from './ApplicationView';
import i18n from '../i18n';

class ApplicationContainer extends React.Component {
    
    render() {
        return <ApplicationView i18n={i18n}/>;
    }
}
export default ApplicationContainer;