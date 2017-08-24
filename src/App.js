import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDMJ32IQc7e3KBraYvfEhKJMyyxUF7tjRw',
            authDomain: 'authentication-6e615.firebaseapp.com',
            databaseURL: 'https://authentication-6e615.firebaseio.com',
            projectId: 'authentication-6e615',
            storageBucket: 'authentication-6e615.appspot.com',
            messagingSenderId: '524174131374'
          });

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
          });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <View>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </View>
                        );
            case false:
                return <LoginForm />;
            default:
                return <Spinner />;
        }
    }

    render() {
        return (
            <View>
                <Header text="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
