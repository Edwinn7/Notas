import {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';

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
    promedio = (parseFloat(nota1)+parseFloat(nota2)+parseFloat(nota3))/3
    setDefinitiva(promedio)
    if(promedio=3 || promedio>3){
        setObservacion('Aprueba')
    }
    if(promedio <=2 || promedio ===2.9){
        setObservacion('Habilita')
    }
    if(promedio<2){
        setObservacion('reprueba')
    }
  }

  function limpiar(){
    setId('Identificacion');
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
      setNombre(buscrId.nota);
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
      <Text>Sistema de Notas</Text>
      <StatusBar style="auto" />
      <TextInput
        placeholder='Identificacion'      
        onChangeText={id => setId(id)}
        value={id}
        ref={refId}
      />
      <TextInput
        placeholder='Nombre'      
        onChangeText={nombre => setNombre(nombre)}
        value={nombre}
      /> 
      <TextInput
        placeholder='Asignatura'      
        onChangeText={asignatura => setAsignatura(asignatura)}
        value={asignatura}
      />         
      <TextInput
      style={styles.input}
      placeholder='Nota 1 (30%)'      
      onChangeText={nota1 => setNota1(nota1)}
      value={nota1}
        />
        <TextInput
        style={styles.input}
        placeholder='Nota 2 (35%)'      
        onChangeText={nota2 => setNota2(nota2)}
        value={nota2}
        />
        <TextInput
        style={styles.input}
        placeholder='Nota 3 (35%)'      
        onChangeText={nota3 => setNota3(nota3)}
        value={nota3}
        />
        <TextInput
        style={styles.input}
        placeholder='Definitiva'      
        onChangeText={definitiva => setDefinitiva(definitiva)}
        value={definitiva}
        />
        <TextInput
        style={styles.input}
        placeholder='Observacion'      
        onChangeText={observacion => setObservacion(observacion)}
        value={observacion}
        />


      <TouchableOpacity
        onPress={guardar}
        style={{backgroundColor:'green'}}
      >
        <Text style={{color:'white', padding:5}}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={buscar}
        style={{backgroundColor:'green'}}
      >
        <Text style={{color:'white', padding:5}}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={limpiar}
        style={{backgroundColor:'green'}}
      >
        <Text style={{color:'white', padding:5}}>limpiar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={promedio}
        style={{backgroundColor:'green'}}
      >
        <Text style={{color:'white', padding:5}}>promedio</Text>
      </TouchableOpacity>
      <Text>{'\n'}</Text>
      <View>
      {
          notas.map(not => {
            return (
              <View style={{flex:1, flexDirection:'row',flexWrap:'wrap'}}>
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
});