import { useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddTransactionScreen, TransactionDetailsScreen, TransactionListScreen } from '../screens';
import type { TransactionsStackParamList, TransactionsStackRoute } from '../types';

const TransactionsStack = createStackNavigator<TransactionsStackParamList>();

export const TransactionsStackNavigation: React.FC = () => {
    const stackRoutes = useMemo<TransactionsStackRoute[]>(() => ([
        {
            name: 'TransactionList',
            component: TransactionListScreen,
            options: {
                title: 'Transacciones',
                headerShown: true,
            },
        },
        {
            name: 'AddTransaction',
            component: AddTransactionScreen,
            options: {
                title: 'Nueva Transacción',
                headerShown: true,
            },
        },
        {
            name: 'TransactionDetails',
            component: TransactionDetailsScreen,
            options: {
                title: 'Detalle de Transacción',
                headerShown: true,
            },
        },
    ]), []);

    return (
        <TransactionsStack.Navigator>
            {stackRoutes.map((route) => (
                <TransactionsStack.Screen
                    key={route.name}
                    name={route.name}
                    component={route.component}
                    options={{
                        ...route.options,
                        headerShown: false,
                    }}
                />
            ))}
        </TransactionsStack.Navigator>
    );
};
