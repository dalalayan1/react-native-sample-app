
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  Button,
  AppRegistry
} from 'react-native';

export default class HomePageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: ''
        };
    }

    getInfo = event => {
        this.setState({
            userID: event.nativeEvent.text
        }, this.makeApiCall);
    }

    makeApiCall = () => {
        fetch(constants.githubApiUrl.replace('{github_id}',this.state.userID))
        .then(response => response.json())
        .then(responseJSON => {
            this.setState({
                userDetails: responseJSON
            })
        });
    }

    render() {
        const { userDetails } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.sectionContainer}>
                <Text style={styles.heading}>{constants.welcomeText}</Text>
                <Text>{this.state.text}</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder={constants.placeholder}
                    onSubmitEditing={(evt) => this.getInfo(evt)}
                />
                </View>
                { userDetails && 
                    <View style={styles.sectionContainer}>
                        <View style={styles.detail}>
                            <Text style={styles.heading}>Details</Text>
                        </View>
                        <View style={styles.detail}>
                            <Image
                                style={styles.avatar}
                                source={{uri: userDetails.avatar_url}}
                            />
                        </View>
                        <View style={styles.detail}>
                        <Text>Name : { userDetails.name ? userDetails.name : userDetails.login }</Text>
                        </View>
                        <View style={styles.detail}>
                        <Text>Public repos : { userDetails.public_repos }</Text>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

AppRegistry.registerComponent('HomePageComponent', () => HomePageComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        padding: 20
    },
    heading: {
        fontSize: 30
    },
    inputField: {
        height: 50,
        width: '100%',
        borderBottomWidth: 2,
        borderColor: '#000'
    },
    sectionContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
    },
    detail: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#000'
    },
    avatar: {
        height: 80,
        width: 80,
        borderRadius: 40
    }
});

const constants = {
    welcomeText: 'Welcome!',
    placeholder: 'Enter github ID...',
    githubApiUrl: `https://api.github.com/users/{github_id}`
}
