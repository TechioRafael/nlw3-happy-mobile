import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageDetails from './pages/OrphanageDetails';
import Header from './components/header';

const {Navigator, Screen} = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>
                <Screen name="OrphanagesMap" component={OrphanagesMap} />
                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title='Preencha os Dados' showCancel={false}></Header>
                    }}
                />
                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition} 
                    options={{
                        headerShown: true,
                        header: () => <Header title='Selecione no mapa' showCancel={false}></Header>
                    }}
                />
                <Screen 
                    name="OrphanageDetails" 
                    component={OrphanageDetails} 
                    options={{
                        headerShown: true,
                        header: () => <Header title='Detalhe do Orfanato'></Header>
                    }}
                />

            </Navigator>
        </NavigationContainer>
    );
}