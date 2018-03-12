// import React from 'react';
// import { connect } from 'react-redux';
// import {withRouter,Redirect} from 'react-router-dom';
// import PropTypes from 'prop-types';
//
// export default function(wrappedComponent) {
//     class ErrorHoccedComp extends React.Component {
//       componentWillMount() {
//         if (!this.props.notFound) {
//            this.props.history.push('/notFound');
//         }
//       }
//
//       componentWillUpdate(nextProps) {
//         if (!nextProps.notFound) {
//           this.props.history.push('/notFound');
//         }
//       }
//       render() {
//         const { error } = this.props; // pass it here somehow.
//         if (!error) {
//             return <WrappedComponent {...this.props}/>
//         }
//         if (error == '404') {
//             return <h1>404</h1>
//         }
//         if (error == '500') {
//             return <h1>500</h1>
//         }
//         return <h1>unknown error happened.</h1>
//       }
//     }
//
//     function mapStateToProps(state) {
//       return {
//         isAuthenticated: state.page.isAuthenticated
//       };
//     }
//
//     return withRouter(connect(mapStateToProps, null)(ErrorHoccedComp));
// }
