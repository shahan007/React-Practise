import { Component } from "react";
import { Link , Redirect} from "react-router-dom";

class ErrorBoundary extends Component {
    
    state = {
        hasError : false,
        redirect : false,
    }

    static getDerivedStateFromError() {
        return {hasError:true}
    }

    componentDidCatch(error,info){
        setTimeout(() => this.setState({ redirect: true }), 5000)
        console.log("ErrorBoundary caught an error",error,info)
    }
    
    render () {       
        if(this.state.redirect){
            return <Redirect to="/"/>
        } 
        if (this.state.hasError){
            return (
                <h2>
                    Ooops ! Error. <Link to={"/"}>Return to main</Link>
                </h2>
            )
        }
        return this.props.children;
    }
    
}

export default ErrorBoundary;