import { View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Text from 'components/app-text'

const ForgetPassword = () => {
    return (
        <View className='items-center flex-1 justify-center'>
            <Text>forget password isn't implemented yet!</Text>
            <Link
                className=' mx-auto rounded px-5 py-2 my-4  bg-blue-500'
                href={'/(auth)/login'}

            >
                <Text classes='text-white mx-auto'>back to login</Text>
            </Link>
        </View>
    )
}

export default ForgetPassword