import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';

const App = () => {
  const [genero, setGenero] = useState('');
  const [filmesSugeridos, setFilmesSugeridos] = useState([]);
  const [erro, setErro] = useState('');

  const buscarFilmes = async () => {
    try {
      const response = await axios.get(`http://10.136.63.228:3000/filmes`);
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        const filmesFiltrados = response.data.filter(filme =>
          filme.Genre.toLowerCase().includes(generoFilme.toLowerCase())
        );
        console.log(filmesFiltrados);
        if (filmesFiltrados.length > 0) {
          setFilmesEncontrados(filmesFiltrados);
          setErro('');
          setModalVisible(true);
        } else {
          setFilmesEncontrados([]);
          setErro('Nenhum filme encontrado.');
        }
      } else {
        setFilmesEncontrados([]);
        setErro('Nenhum filme encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setFilmesSugeridos([]);
      setErro('Erro ao buscar os filmes. Verifique sua conexão ou tente novamente mais tarde.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.Poster }} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text>{item.Plot}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sugestão de Filmes por Gênero</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o gênero do filme"
        value={genero}
        onChangeText={text => setGenero(text)}
      />
      <Button
        title="Buscar Filmes"
        onPress={buscarFilmes}
      />
      {erro ? <Text style={styles.error}>{erro}</Text> : null}
      <FlatList
        data={filmesSugeridos}
        renderItem={renderItem}
        keyExtractor={item => item.imdbID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 100,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default App;
