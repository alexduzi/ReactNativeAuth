import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCZGtDH9cJfTr3i0SFzVuclRUcNy6hyCZY',
            authDomain: 'authentication-cba57.firebaseapp.com',
            databaseURL: 'https://authentication-cba57.firebaseio.com',
            projectId: 'authentication-cba57',
            storageBucket: 'authentication-cba57.appspot.com',
            messagingSenderId: '54329292883'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (<CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>);
            case false:
                return <LoginForm />;
            default:
                return <CardSection><Spinner size={'large'} /></CardSection>;
        }
    }

    render() {
        return (
            <View>
                <Header headerText={'Authentication'} />
                {this.renderContent()}
            </View>
        );
    }
};

export default App;