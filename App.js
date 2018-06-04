import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';
import Header from './Header';
import Body from './Body';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = { 
      tareas: [],
      texto:'' ,
      cargando: true,
    };
  }
  // se ejecuta despues de que todo se haya ejecutado y solo una ves 
  componentDidMount(){
    this.recuperarEnTelefono();
  }
  establecerTexto =(value) => {
    console.log(value);
    this.setState({ texto:value });
  }
  agregarTarea= () =>{
    const nuevasTareas = [...this.state.tareas, {texto: this.state.texto, key: Date.now()} ];
    this.guardarEnTelefono(nuevasTareas);
    this.setState({
      tareas: nuevasTareas,
      texto: '',
    });
    //console.log(this.state.tareas.length);
  }

  eliminarTarea = (id) =>{
    // filter : ejecuta para cada elemento una funcion.
    const nuevasTareas = this.state.tareas.filter((tarea) => {
      // retorna todas las tareas menos la que va ser eliminada.
      return tarea.key !== id;
    });
    this.guardarEnTelefono(nuevasTareas);
    this.setState({
      tareas : nuevasTareas,
    });
  }

  guardarEnTelefono = (tareas)=> {
    AsyncStorage.setItem('@AppPrueba: tareas', JSON.stringify(tareas) )
    .then((valor) => {
      console.log(valor);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  recuperarEnTelefono = ()=> {
    AsyncStorage.getItem('@AppPrueba: tareas')
    .then((valor) => {
      console.log(valor);
      console.log(JSON.parse(valor));
      // setTimeout hace que en un tiempo se esjecute constatemente una funcion
      setTimeout(() => {
        this.setState({
          cargando: false,
        });
      },5000);
        
      if(valor !== null){
        const nuevasTareas = JSON.parse(valor);
        this. setState({
          tareas: nuevasTareas,
        });
      } 
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        cargando: false,
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header 
          texto = {this.state.texto}
          cambiarTexto={this.establecerTexto} 
          agregar={this.agregarTarea}
        /> 
        <Button 
          title  = "Guardar"
          onPress = {() => {this.guardarEnTelefono()}}
        />
        <Button 
          title  = "Recuperar"
          onPress = {() => {this.recuperarEnTelefono()}}
        />
        <Body
          tareas = {this.state.tareas}
          eliminar = {this.eliminarTarea}
          cargando = {this.state.cargando}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
