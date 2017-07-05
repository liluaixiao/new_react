import reset from '../reset';
import {Dimensions, Platform} from 'react-native';

const {width,height} = Dimensions.get('window');
let style = Object.assign({
   list: {
       backgroundColor: '#f5f5f5'
   }
}, reset);

export default style;