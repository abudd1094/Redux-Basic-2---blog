import React from 'react';
import { connect } from 'react-redux';

class UserHeader extends React.Component{
  render() {
    const { user } = this.props;  // destructure user from the props passed in from mapStateToProps
    
    if (!user) {
      return null;  // if we don't find the appropriate user, return nothing
    }
    
    return <div className="header">{user.name}</div>;
  }
}

const mapStateToProps = (state, ownProps) => { // moving find logic from render to the mapStateToProps, we pass ownProps to refer to the props we are about to pass into the above component
  return { user: state.users.find(user => user.id === ownProps.userId) }; // instead of props user ownProps
};

export default connect(
  mapStateToProps
)(UserHeader);