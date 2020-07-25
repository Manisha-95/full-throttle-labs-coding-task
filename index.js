import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal} from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      name:"",
      activity:[],
      date: new Date(),
      dayActiveStrt:"",
      dayActiveEnd:"",
       pickerOpen: false,

    };
  }
  componentDidMount()
  {
    axios.get("https://0e7ec0ea-9031-40a1-bb70-42c72fdcba0a.mock.pstmn.io/Mani").then
    (response=>
    {
      this.setState({users:response.data.members});
      this.state.users.map(n=>console.log(n.activity_periods))
      
      // response.data.members.map(a=>{console.log(a.id)
      // console.log(a.real_name)})
    })
  }
  modal=(e)=>
  {
    console.log(e.target.getAttribute("data-index"));
    let a=e.target.getAttribute("data-index");
   
    this.setState({name:this.state.users[a].real_name,
    activity:this.state.users[a].activity_periods,dayActiveStrt:this.state.users[a].activity_periods[0].start_time,
    dayActiveEnd:this.state.users[a].activity_periods[0].end_time});
     console.log(this.state.users[a].activity_periods[0].start_time);

  }
   onChange = (date) => this.setState({ date })
  togglePicker = () => {
    this.setState({pickerOpen: !this.state.pickerOpen});
}

  render() {
    return (
      <div>
        <table>
        <tbody>
        <thead>
        <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Time_Zone</th>
     <th>Action</th>
  </tr>
 
  {this.state.users.map((a,i)=>
  {
    return(
<tr key={i}><td>{a.id}</td>
<td>{a.real_name}</td>
<td>{a.tz}</td>
<td><button type="button" class="btn btn-primary mod checkout" data-toggle="modal" data-target="#exampleModal" key={i} data-index={i} onClick={this.modal}>View</button>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{this.state.name} The day you were active.</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
   <li>{this.state.dayActiveStrt} - {this.state.dayActiveEnd.substr(10)}</li>
   
      </div>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <a type="button" class="btn btn-primary"  data-toggle="modal" href="#myModal2">More</a>
      </div>
    
    </div>
  </div>
 </div>
 <div class="modal" id="myModal2" role="document">
	<div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Other days Activity</h4>
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        </div><div class="container"></div>
        <div class="modal-body">
        {this.state.activity.map(m=>{return(<button style={{margin:"10px"}} class="btn btn-outline-info" onClick={this.togglePicker}>{m.start_time} - {m.end_time.substr(10)}
   </button>
   )})}
   
   {this.state.pickerOpen
   ?
         <Calendar
          onChange={this.onChange}
          value={this.state.date}/>
          :""}
        </div>
        <div class="modal-footer">
          <a type="button" href="#" data-dismiss="modal" class="btn btn-primary">Close</a>
         
        </div>
      </div>
    </div>
</div>
 </td></tr>
)

  }
    
 )}
  </thead>
 </tbody>
 </table>
 
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
