//@ts-check
import React from 'react'
import { useTranslation } from 'react-i18next';

class ErrorBoundaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className="row justify-content-center my-3">
                <div className="col-md-4 col-12 text-danger text-center text-lg">
                    <i className="ni ni-user-run text-lg"></i>
                </div>
                <div className="col-12">
                    <div className="text-center">
                        <span className="text-muted">
                            <small>{this.props.message}</small>
                        </span>
                    </div>
                </div>
            </div>;
        }
        return this.props.children;
    }
}

const ErrorBoundary = ({ children, message = null }) => {
    const { t } = useTranslation()
    return <ErrorBoundaryComponent message={
        message || t("Une erreur s'est produite. Veuillez réessayer en réactualisant la page")
    }>
        {children}
    </ErrorBoundaryComponent>
}

export default ErrorBoundary