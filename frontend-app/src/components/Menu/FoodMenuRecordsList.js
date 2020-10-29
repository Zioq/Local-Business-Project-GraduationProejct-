import React,  {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class FoodMenuRecordsList extends Component {
    constructor(props) {
        super (props);
        this.delete = this.delete.bind(this);
        this.state = {
            redirect :false
        }
    }
    
    delete() {
        axios.get('http://localhost:8888/reactJsCRUD/FoodCRUD/foodDelete.php?id='+this.props.obj.foodId)
         .then(
             this.setState({redirect: true})
         )
         .catch(err=>console.log(err));
    }
    
    render() { 

        const {redirect} =this.state;
        if(redirect) {
            return < Redirect to='/Menu'/>
        }

        return (  
            <tr>
                <td>
                    {this.props.obj.foodName}
                </td>
                <td>
                    {this.props.obj.foodSize}
                </td>
                <td>
                    {this.props.obj.foodPrice}
                </td>
                <td>
                    {this.props.obj.foodDescription}
                </td>
                <td>
                    <Link to={"/edit/" +this.props.obj.employeeId} className = "btn btn-primary"> Edit</Link>
                </td>
                <td>
                    <button onClick={this.delete} className = "btn btn-danger"> Delete</button>
                </td>
            </tr>
        );
    }
}
 
export default FoodMenuRecordsList;