import {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, } from 'react-native';

export default function App() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [definitiva, setDefinitiva] = useState('');
  const [observacion, setObservacion] = useState('');
  const [notas,setNotas] = useState([]);
  // Referencias a elementos
  let refId = useRef()
  const guardar = () => {
    //Agregar datos al array a través del método setNotas para el array Notas
    setNotas(minotas => [...minotas,{id:id,nombre:nombre,asignatura:asignatura,nota1:nota1,nota2:nota2,nota3:nota3,definitiva:definitiva,observacion:observacion}] );
    //console.log(notas);
    setId('');
    setNombre('')
    setAsignatura('')
    setNota1('');
    setNota2('');
    setNota3('');
    setDefinitiva('');
    setObservacion('');
    refId.current.focus();
  }
  function promedio(){
    // nota1*0.3
    // nota2*0.35
    // nota3*0.35
    promedio = (parseFloat(nota1*0.3)+parseFloat(nota2*0.35)+parseFloat(nota3*0.35))
    setDefinitiva(promedio)
    if(promedio>=3){
        setObservacion('Aprueba')
    }
    if(promedio <=2.94){
        setObservacion('Habilita')
    }
    if(promedio<2){
        setObservacion('reprueba')
    }
  }
  function finalizar(){
    promedio();
    guardar();
  }
  function limpiar(){
    setId('');
    setNombre('')
    setAsignatura('')
    setNota1('');
    setNota2('');
    setNota3('');
    setDefinitiva('');
    setObservacion('');
  }
  let buscar = (buscid) =>{
    let buscrId = notas.find(not => not.id == id);
    if (buscrId != undefined){
      setNombre(buscrId.nombre);
      setAsignatura(buscrId.asignatura);
      setNota1(buscrId.nota1);
      setNota2(buscrId.nota2);
      setNota3(buscrId.nota3);
      setDefinitiva(buscrId.definitiva);
      setObservacion(buscrId.observacion);
    }
    else{
      alert("Identificacion no encontrda");
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.banner}>Sistema de Notas</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder='Identificacion'      
        onChangeText={id => setId(id)}
        value={id}
        ref={refId}
        textContentType='username'
      />
      <TextInput
        style={styles.input}
        placeholder='Nombre'      
        onChangeText={nombre => setNombre(nombre)}
        value={nombre}
        textContentType='name'
      /> 
      <TextInput
        style={styles.input}
        placeholder='Asignatura'      
        onChangeText={asignatura => setAsignatura(asignatura)}
        value={asignatura}
        textContentType='name'
      />         
      <TextInput
        style={styles.input}
        placeholder='Nota 1 (30%)'      
        onChangeText={nota1 => setNota1(nota1)}
        value={nota1}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder='Nota 2 (35%)'      
        onChangeText={nota2 => setNota2(nota2)}
        value={nota2}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder='Nota 3 (35%)'      
        onChangeText={nota3 => setNota3(nota3)}
        value={nota3}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.input}
        placeholder='Definitiva'      
        onChangeText={definitiva => setDefinitiva(definitiva)}
        value={definitiva}
        keyboardType='numeric'
        numberOfLines={1.0}
      />
      <TextInput
        style={styles.input}
        placeholder='Observacion'      
        onChangeText={observacion => setObservacion(observacion)}
        value={observacion}
      />
      <TouchableOpacity
        onPress={promedio}
        style={styles.button}
      >
      <Text style={{color:'white', padding:5}}>Calcular promedio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={guardar}
        style={styles.button}
      >
      <Text style={{color:'white', padding:5}}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={buscar}
        style={styles.button}
      >
      <Text style={{color:'white', padding:5}}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={limpiar}
        style={styles.button}
      >
      <Text style={{color:'white', padding:5}}>Limpiar</Text>
      </TouchableOpacity>
      <Text>{'\n'}</Text>
      <View>
        {
          /*
          notas.map(not => {
             return (
               <View>
                <Text style={{marginRight:10}}>{not.id}</Text>
                <Text style={{marginRight:10}}>{not.nota}</Text>
                <Text style={{marginRight:10}}>{not.asignatura}</Text>
                <Text style={{marginRight:10}}>{new Intl.NumberFormat('es-CO').format(not.nota1)}</Text>
                <Text style={{marginRight:10}}>{new Intl.NumberFormat('es-CO').format(not.nota2)}</Text>
                <Text style={{marginRight:10}}>{new Intl.NumberFormat('es-CO').format(not.nota3)}</Text>
                <Text style={{marginRight:10}}>{new Intl.NumberFormat('es-CO').format(not.definitiva)}</Text>
                <Text style={{marginRight:10}}>{not.observacion}</Text>
               </View>
             );
           })
           */
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 30,
    margin: 5,
    width:200,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "flex-start",
    backgroundColor: "green",
    width:200,
    marginTop:5
  },
  banner:{
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize:20,
    marginBottom:30
  }
});