// Manage state locally

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
 
  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  submitMessage() {
    this.setState({
      messages: this.state.messages.concat(this.state.input),
      input: ''
    })    
  }

  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input type="text"
              value={this.state.input} 
              onChange={this.handleChange}></input>
        <button type="button"
                onClick={this.submitMessage}>Add message</button>
        <ul>{this.state.messages.map(x => <li>{x}</li>)}</ul>
      </div>
    );
  }
};

// Extract state logic

const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
}

const messageReducer = (previousState, action) => {
  let newArr = [...previousState, action.message];
  return newArr;
}

let store = {
  state: [],
  getState: () => store.state,
  dispatch: (action) => {
    if (action.type === ADD) {
      store.state = messageReducer(store.state, action);
    }
  }
}

// ADDING A PROVIDER

// Redux Code:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React Code:

class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (
        <Provider store={store}>
            <DisplayMessages />
        </Provider>
      )    
  }  
};

// MAP STATE TO PROPS

const state = [];

// change code below this line
const mapStateToProps = (state) => {
  const newObj = {
    messages: state
  }
  return newObj;
}

// MAP DISPATCH TO PROPS

const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

// change code below this line
const mapDispatchToProps = (dispatch) => {
    const newObj = {
        submitNewMessage: function(message) {
            dispatch(addMessage(message));
        }
    }
    return newObj;
}

// ADDING CONNECT

const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapStateToProps = (state) => {
  return {
    messages: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message));
    }
  }
};

class Presentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h3>This is a Presentational Component</h3>
  }
};

const connect = ReactRedux.connect;
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Presentational)
