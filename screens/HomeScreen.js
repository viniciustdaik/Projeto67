import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Header,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

import AppHeader from '../components/AppHeader';
import db from '../config';

import firebase from 'firebase';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: false,
      teamAVotes: undefined,
      teamBVotes: undefined,
      teamWinning: "",
    };
  }

  teamA() {
    if (this.state.voted === false) {
      //db.ref('/').update({
      //  'teamA': 1
      //});
      firebase
        .database()
        .ref('/teamA')
        .set(firebase.database.ServerValue.increment(1));
      db.ref('/').on('value', (data) => {
        console.log("teamA: " + data.val().teamA);
        console.log("teamB: " + data.val().teamB);
        var teamWinning;
        if (data.val().teamA > data.val().teamB) {
          teamWinning = "teamA";
        } else if (data.val().teamA < data.val().teamB) {
          teamWinning = "teamB";
        } else {
          teamWinning = "teamAteamB";
        }
        this.setState({
          teamAVotes: data.val().teamA,
          teamBVotes: data.val().teamB,
          teamWinning: teamWinning,
        })
      });
    }
  }

  teamB() {
    if (this.state.voted === false) {
      console.log(db);
      //db.ref('/').update({
      //  'teamB': 2
      //});
      firebase
        .database()
        .ref('/teamB')
        .set(firebase.database.ServerValue.increment(1));

      db.ref('/').on('value', (data) => {
        console.log("teamA: " + data.val().teamA);
        console.log("teamB: " + data.val().teamB);
        var teamWinning;
        if (data.val().teamA > data.val().teamB) {
          teamWinning = "teamA";
        } else if (data.val().teamA < data.val().teamB) {
          teamWinning = "teamB";
        } else {
          teamWinning = "teamAteamB";
        }
        this.setState({
          teamAVotes: data.val().teamA,
          teamBVotes: data.val().teamB,
          teamWinning: teamWinning,
        })
      });
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: "#877", }}>
        <SafeAreaView style={styles.droidSafeArea} />
        <AppHeader />
        <View style={styles.container}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <Image
                style={{ width: 300, height: 220, marginLeft: 5 }}
                source={require('../assets/TeamImage.png')}
              />
            </TouchableOpacity>
          </View>
          {this.state.teamAVotes === undefined ?
            <View style={styles.ratingContainer}>
              <Text style={{ textAlign: 'center', fontSize: 25 }}>Vote Aqui</Text>
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  this.setState({
                    voted: true,
                  }); this.teamA();
                }}>
                <Text style={{ fontSize: 20 }}>Equipe A</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  this.setState({
                    voted: true,
                  }); this.teamB();
                }}>
                <Text style={{ fontSize: 20 }}>Equipe B</Text>
              </TouchableOpacity>


            </View>
            : <View style={{ textAlign: 'center' }}>
              <Text style={{
                fontSize: 20, color: "blue",
                alignSelf: "center",
              }}>
                Votou!</Text>

              <Text style={{
                fontSize: 25, color: this.state.teamWinning.includes("teamA") ?
                  this.state.teamWinning.includes("teamB") ? "purple" : "orange" : "red",
                alignSelf: "center",
              }}>Equipe A: {this.state.teamAVotes}</Text>
              <Text style={{
                fontSize: 25, color: this.state.teamWinning.includes("teamB") ?
                  this.state.teamWinning.includes("teamA") ? "purple" : "orange" : "red",
                alignSelf: "center",
              }}>Equipe B: {this.state.teamBVotes}</Text>
              <Text style={{
                fontSize: 22.5, color: "blue",
                alignSelf: "center",
              }}>Total De Votos: {this.state.teamAVotes + this.state.teamBVotes}</Text>
            </View>}
        </View>
        <View style={[styles.container, { height: "34.9%", }]} />
        <View style={[styles.container, { height: this.state.voted == true ? "29.1%" : 0, }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#877",//"EFDBCD"
  },
  droidSafeArea: {
    marginTop: Platform.OS !== "web" && Platform.OS !== "macos" && Platform.OS !== "windows" ?
      Platform.OS === 'android' ? StatusBar.currentHeight : 0 : 0,
  },
  buttonsContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
  buttons: {
    backgroundColor: "coral",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    margin: 10,
    width: 150,
    height: 50,
  },
  ratingContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
});
