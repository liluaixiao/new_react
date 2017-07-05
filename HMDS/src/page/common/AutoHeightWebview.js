import Component from '../../util/component';
import React from 'react';
import {WebView,Platform, Dimensions} from 'react-native';
import app from '../../util/app';

export default class AutoHeightWebview extends Component{
	constructor(props){
		super(props);

		this.state = {
			height: 0
		};
	}

	content(body){

		let html =
			`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
		<style>
		html,body{padding:0;margin:0;overflow:hidden;}
		*{word-break:break-all}
		img{max-width:100%;}
		</style>
	</head>
	<body>
		${body || ''}
		<script>
		window.onload=function(){
			var checker=window.setInterval(function(){
				if(/postMessage/.test(String(window.postMessage))){
					window.clearInterval(checker);
					var links=document.getElementsByTagName('a');
					for(var i=0;i<links.length;i++){
						if(links[i].href) {
							links[i].onclick=function(event){
								event.preventDefault();
								window.postMessage(JSON.stringify({
									type:'intercept',
									value:event.currentTarget.href
								}));
							}
						}
					}

                    var height = document.body.getBoundingClientRect().height;
					window.postMessage(JSON.stringify({type:'autoHeight',value:height}));
				}
			},1000/60);
		}
		</script>
	</body>
</html>`;

		return html;
	}

	render(){

		return (
			<WebView
				style={{
					height: this.state.height,
					margin: 0,
					padding: 0
				}}
				javaScriptEnabled={true}
				source={{
					html: this.content(this.props.body)
				}}
				bounces={false}
				dataDetectorTypes="none"
				onMessage={(event)=>{
					let msg = JSON.parse(event.nativeEvent.data);
					if(msg.type == 'autoHeight' && msg.value > 0) {
						this.setState({height:msg.value}, ()=>{
							if(this.props.onLoad && typeof this.props.onLoad == 'function') {
								this.props.onLoad();
							}
						});
					} else if(msg.type == 'intercept'){
						app.open(msg.value);
					}
				}}
			/>
		);
	}
}