import {Alert} from 'react-native';

export default function(option){
	let title = '';
	if(option.title && typeof option.title == 'string') {
		title = option.title;
	}
	let onConfirm = ()=>{};
	if(option.onConfirm && typeof option.onConfirm == 'function') {
		onConfirm = option.onConfirm;
	}

	let onCancel = ()=>{};
	if(option.onCancel && typeof option.onCancel == 'function') {
		onCancel = option.onCancel;
	}

	let cancelable = true;
	if(option.cancelable && typeof option.title == 'boolean') {
		cancelable = option.cancelable;
	}

	let confirmText = '确认';
	if(option.confirmText && typeof option.confirmText == 'string') {
		confirmText = option.confirmText;
	}

	let cancelText = '取消';
	if(option.cancelText && typeof option.cancelText == 'string') {
		cancelText = option.cancelText;
	}

	Alert.alert(
		title,
		null,
		[
			{text: cancelText, onPress: onCancel},
			{text: confirmText, onPress: onConfirm},
		],
		{cancelable}
	)
}