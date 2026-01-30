import React from "react";
import { TouchableOpacity , StyleSheet} from "react-native";
import { globalStyles , Colors } from "../../styles/globalStyles";

const IconButton = ({onPress , icon , style}) => {
    return(
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.button , globalStyles.shadow , style]}
            activeOpacity={0.8}
        >
            {icon}
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    button :{
        width : 44,
        height : 44,
        borderRadius : 22,
        backgroundColor : Colors.white,
        justifyContent : 'center' ,
        alignItems : 'center'
    },
})

export default IconButton