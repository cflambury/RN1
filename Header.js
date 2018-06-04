//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';



// create a component
class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Header</Text>
                <TextInput style = {styles.texto}
                    onChangeText = { this.props.cambiarTexto}
                    placeholder = "escribe un texto."
                    onSubmitEditing = {this.props.agregar}
                    value = {this.props.texto}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: '#00ff00',
    },
    texto:{
        paddingHorizontal: 16,
        fontSize:24,
    },
});

//make this component available to the app
export default Header;
