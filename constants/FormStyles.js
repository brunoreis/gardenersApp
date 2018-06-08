import Fonts from './Fonts';
import Colors from './Colors';

export default {
    label: {
        marginBottom: 8,
        ...Fonts.descriptionText
    },
    textField: {
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        color: Colors.darkGray,
        ...Fonts.descriptionText,
        borderColor: Colors.darkGray
    },
    multilineTextField: {
        height: 100,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        color: Colors.darkGray,
        ...Fonts.descriptionText,
        borderColor: Colors.darkGray
    },
    notCheckedBox: {
        flex: 0,
        width: 20,
        height: 20,
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 10
    },
    checkedBox: {
        flex: 0,
        width: 20,
        height: 20,
        marginRight: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.secondaryBlue
    },
    checked: {
        width: 10,
        height: 10,
        margin: 4,
        borderRadius: 5,
        backgroundColor: Colors.secondaryBlue
    },
    deleteButton: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: Colors.red
    }
}
