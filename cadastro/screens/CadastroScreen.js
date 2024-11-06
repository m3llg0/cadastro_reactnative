import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'

const buscarEnderecoPorCep = async (cep) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
            Alert.alert('Erro', 'CEP não encontrado');
        } else {
            return {
                rua: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf,
            };
        }
    } catch (error) {
        Alert.alert('Erro', 'Falha ao buscar o endereço');
    }
};

export default function CadastroScreen() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');


    const handleCepChange = async (newCep) => {
        setCep(newCep);
        if (newCep.length === 8) { 
            const endereco = await buscarEnderecoPorCep(newCep);
            if (endereco) {
                setRua(endereco.rua);
                setBairro(endereco.bairro);
                setCidade(endereco.cidade);
                setEstado(endereco.estado);
            }
        }
    };


    const handleCadastro = () => {
        Alert.alert('Cadastro', 'Cadastro realizado com sucesso!');
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder='Nome'
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />
            <TextInput
                style={styles.input}
                placeholder='CEP'
                keyboardType='numeric'
                value={cep}
                onChangeText={handleCepChange} 
            />
            <TextInput
                style={styles.input}
                placeholder='Rua'
                value={rua}
                onChangeText={setRua}
            />
            <TextInput
                style={styles.input}
                placeholder='Número'
                keyboardType='numeric'
                value={numero}
                onChangeText={setNumero}
            />
            <TextInput
                style={styles.input}
                placeholder='Bairro'
                value={bairro}
                onChangeText={setBairro}
            />
            <TextInput
                style={styles.input}
                placeholder='Cidade'
                value={cidade}
                onChangeText={setCidade}
            />
            <TextInput
                style={styles.input}
                placeholder='Estado'
                value={estado}
                onChangeText={setEstado}
            />
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#ff779e',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
