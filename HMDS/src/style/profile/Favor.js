import reset from '../reset';


let style = Object.assign({
    body: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    btnAction: {
        flex: 1,
        width: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    btnText: {
        color: 'white',
        fontSize: 16
    }
}, reset);

export default style;