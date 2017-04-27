import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
axios.defaults.headers.common={
	'DAIWAN-API-TOKEN':'32133-23493-43483-4A83A'
}
Vue.use(vuex)
export default new vuex.Store({
	//状态集合
	state:{
		title:'默认标题',
		championList:[],
		head:[],
	},
	//突变
	mutations:{
		SET_TITLE:(state,title)=>{state.title = title},
		SETCHAMPIONLIST:(state,list)=>{state.championList=list},
		SET_HEAD:(state,head) =>{state.head = head}
	},
	//指令集合
	actions:{
		setTitle:({commit},title)=>{
			commit('SET_TITLE',title)
		},
		setChampionList:({commit})=>{
			// console.log('this.ajax',this.ajax);
			axios.get('/api/champion').then(res=>{
				// this.heros = res.data.data;
				commit('SETCHAMPIONLIST',res.data.data)
				// console.log(res.data.data);
			},err=>{
				console.log(err);
			})
		},
		setHead:({commit})=>{
			commit('SET_HEAD',head)
		}
	},
	getters:{
		title:state => state.title,
		championList:state => state.championList,
		head:state => state.head,

	}
})