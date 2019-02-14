import React, { Fragment } from 'react';
import Head from '../../Components/Head';
import Content from '../../Components/Content';
import { t } from '../../Components/Languages';
import styles from './Home.css';

class Home extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			term: '',
			checkCValue:'Complete',
			checkICValue:'Incomplete',
			SelectStatus:'',
			myValue:'',
			items: 	[],
			showerror0: false,
			showerror1: false,
			incomarr:[],
			comarr:[],
			completeTodo:[],
			isToggleOn:true,
			totalItem:'',
			pushItem:true,
			emptyTodo: true,
			showbtn:false
		}
		this.deleteitem = this.deleteitem.bind(this);
		this.todoClick = this.todoClick.bind(this);
		this.sorttodo = this.sorttodo.bind(this);
		this.showincomtodo = this.showincomtodo.bind(this);
	}

	componentDidMount() { 

		const mydata = JSON.parse(localStorage.getItem('tododata'));
		const myalldata = JSON.parse(localStorage.getItem('Alltododata'));
		if(mydata != null){
            this.setState({
				items: mydata,
				completeTodo: mydata
			},  () => {
				if(myalldata != null){
				this.setState({
					completeTodo : mydata
				})
				localStorage.setItem('Alltododata', JSON.stringify(this.state.completeTodo));
			 }
			 if(this.state.items.length == 0){
				this.setState({
					emptyTodo:true,
					showbtn:false
				})
			}
			else if(this.state.items.length != 0){
				this.setState({
					emptyTodo:false,
					showbtn:true
				})
			}
			})
		}
	 }

	onChange = (event) => {
		this.setState({term: event.target.value});
	  }

	  onComplete = (event) => {
		this.setState({SelectStatus: this.state.checkCValue});
	 }

	  onInComplete = (event) => {
		this.setState({SelectStatus: this.state.checkICValue});
	 }

     onSubmit = (event) => {
		console.log('hi i am deepak');
		 event.preventDefault();
			const now = new Date().toLocaleDateString();
			if( this.state.term == '' ){
				this.setState({
					showerror0:true,
					showerror1:false,
					});
			}
			else if( this.state.SelectStatus == '' ){
				this.setState({
					showerror1:true,
					showerror0:false,
					});
			}
			else if( this.state.term != '' && this.state.SelectStatus != '' ){
				    this.setState({
					showerror0:false,
					showerror1:false,

					});
					const todoData = { 'task': this.state.term ,'date': now , 'status': this.state.SelectStatus};
					this.state.items.push(todoData);
					const totalTodo = this.state.items.length;
					this.setState({
					completeTodo : this.state.items,
					totalItem : totalTodo,
					emptyTodo: false,
					showbtn:true
					},  () => {
						this.setState({
							totalItem : totalTodo
						})
					localStorage.setItem('totalItem', this.state.totalItem);	
					})
					localStorage.setItem('tododata', JSON.stringify(this.state.items));	
			}
		}

		showincomtodo(){
			this.state.incomarr =[];
			this.setState(prevState => ({ isToggleOn: !prevState.isToggleOn }));const mytotalItem = localStorage.getItem('totalItem');
			if(this.state.isToggleOn == true){
            this.state.pushItem = true;
			{this.state.items.map((item,index1) =>{ 
			if(item.status ==  'Incomplete'){
					if(this.state.pushItem == true){
						this.state.incomarr.push(item);
					}
					this.setState({
							items : this.state.incomarr
						},  () => {
							this.setState({
								items : this.state.incomarr
							})
						localStorage.setItem('tododata', JSON.stringify(this.state.items));
						})
					}
				}
				)}
			}
			else if(this.state.isToggleOn == false){
				this.setState({
					items : this.state.completeTodo,
					pushItem : false
				},  () => {
					this.setState({
						items : this.state.completeTodo,
						pushItem : false
					})
					
				localStorage.setItem('tododata', JSON.stringify(this.state.items));
				})
			}
		 
		}
		
		todoClick(index){
		  {[this.state.items].map((item,index1) =>{
			 if(item[index].status == 'Complete' ){
				item[index].status = 'Incomplete'
			 }
			 else  if(item[index].status == 'Incomplete' ){
				item[index].status = 'Complete'
			 }
		  }	
		  )}
		  this.setState({
			items:this.state.items,
			pushItem : true
		  },  () => {
			this.setState({
				items:this.state.items,
				pushItem : true
			})
		localStorage.setItem('tododata', JSON.stringify(this.state.items));
		})

		}


		sorttodo(){
				(this.state.items).sort(function(a, b) {
					console.log('hi i am a '+ a.date);
					console.log('hi i am b '+  b.date);
					//console.log('hi i am a '+ new Date(a.date).getTime());
					//console.log('hi i am b '+ new Date(a.date).getTime());
					return new Date(a.date).getTime() - new Date(b.date).getTime();
					//return  b.date < a.date;
					//return a.start.localeCompare(b.start);
				});
				console.log(this.state.items);
				localStorage.setItem('tododata', JSON.stringify(this.state.items));
          }
		  


        deleteitem (index){
			this.state.items.splice(index, 1);
            this.setState({
				items:this.state.items,
			})
			if(this.state.items.length == 0){
				this.setState({
					emptyTodo:true,
				    showbtn: false
				})
			}
			localStorage.setItem('tododata', JSON.stringify(this.state.items));
		}


		render(){
			return (
				<div>
                       	<Fragment>
							<Head title="React Assignment • Home" />
							<div className={styles.intro}>
								<h1 className={styles.title}>React Assignment</h1>
							</div>
						</Fragment>



                       {/* items added section */}
                        <section>
							<div className={styles.maindiv}>
							<h2 className={styles.title}>To Do List</h2>
							<form className="App" onSubmit={this.onSubmit}>
								<input className={styles.inputitem} value={this.state.term} placeholder="Please Enter Your Todo List" onChange={this.onChange} />
								<button type="submit" className={styles.addbtn}>Add Items</button>
							</form>

							<div className={styles.checkbox}> 
							    <span  className={styles.status}>Status</span>
							  	<input type="radio" name="gender" value="complete" className={styles.Cinput}  value={this.state.checkCValue} onChange={this.onComplete}/>  
								<span className={styles.Cvalue}>Complete</span>
								<input type="radio" name="gender" value="incomplete" className={styles.Cinput}  value={this.state.checkICValue} onChange={this.onInComplete}/> 
								<span className={styles.Cvalue}>InComplete</span>
                                
								{ this.state.showerror0 
                                      ? <div className={styles.formerror}> **Input Field Can't Be Empty **</div>
                                      : null
								  }
								  
								{ this.state.showerror1 
                                      ? <div className={styles.formerror}> **Please Select your Status**</div>
                                      : null
                                  }
							</div>
                             

							 {/* items list div */}
							<div className={styles.datalist}>
							<h2 className={styles.title}>Items List</h2>
							<div className={styles.Mylistdata}>
									<div className={styles.header}>
											<div className={styles.item}>Task</div>
											<div className={styles.item}>Status</div>
											<div className={styles.item}>Date</div>
									</div>
                            
							        <div className={styles.activity}>
											{this.state.items.map((items,index) => 
											<div className={styles.myitems} key={index} >
											<div className={styles.todoitems}  onClick={this.todoClick.bind(this,index)}>
											<div className={styles.item} >{items.task}</div>
											<div className={styles.item} >{items.status}</div>
											<div className={styles.item} >{items.date}</div>
											</div>
											<div><button type="button" className={styles.delbtn} onClick={this.deleteitem.bind(this,index)}>Remove</button></div>
											</div>
											)}
											{ this.state.emptyTodo
												? <div className={styles.formerror}> **Your Todo List Is Empty**</div>
												: null
											}
							        </div>
							
							 </div> 
							 </div>
							 {/* end item list div */}
							 { this.state.showbtn ?
							<div className={styles.combutton}>
								<button type="button" className={styles.todobtn}  onClick={this.showincomtodo}>ShowIncompleteTodo</button>
								<button type="button" className={styles.sortbtn}  onClick={this.sorttodo}>Sort Todo</button>
							</div>
								: null
							}

							</div>
                        </section>
                    	{/* end items added section */}
        </div>
	
	);
}
}

export default Home;
