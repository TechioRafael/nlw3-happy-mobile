import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps'
import { Feather } from '@expo/vector-icons';

import MapMarker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export default function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    useFocusEffect(()=>{
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    })
    
    const navigation = useNavigation();

    function handleNavigationToOrphanageDetails(id: number){
        navigation.navigate('OrphanageDetails', {id});
    }
    function handleNavigationToSelectMapPosition(){
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
        <MapView 
            provider={PROVIDER_GOOGLE}
            style={styles.map} 
            initialRegion={{
            latitude:-25.523586, 
            longitude:-54.585966,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
            }}
        >
            {orphanages.map(orphanage => {
                return (
                    <Marker
                    key={orphanage.id}
                    icon={MapMarker}
                    calloutAnchor={{
                        x: 2.2,
                        y: 0.8,
                    }}
                    coordinate={{
                        latitude:orphanage.latitude, 
                        longitude:orphanage.longitude,
                    }}
                    >
                    <Callout tooltip={true} onPress={() => handleNavigationToOrphanageDetails(orphanage.id)}>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>{orphanage.name}</Text>
                        </View>
                    </Callout>
                    </Marker>
                )
            })}
        </MapView>

        <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>

            <RectButton style={styles.createOrphanageButton} onPress={handleNavigationToSelectMapPosition}>
                <Feather name="plus" size={20} color="#fff"></Feather>
            </RectButton>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      
    },
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
    },
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 60,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation:3,
    },
    footerText:{
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
    },
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  