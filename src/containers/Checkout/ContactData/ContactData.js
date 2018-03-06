import React, { Component } from 'react';
import axios from '../../../axios-ordered';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Olya',
                address: {
                    street: 'Hataitai',
                    zipCode: '123456',
                    country: 'New Zealand'
                },
                email: 'olya@ivanovs.info'
            },
            deliveryMethod: 'fastest'
        };
        this.setState({loading: true});
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error =>  {
                console.log(error);
                this.setState({loading: false});
            })
    }

    render () {
        let form = (<form>
            <input className={classes.Input} type='text' 
                name='name' placeholder='Your Name' />
            <input className={classes.Input} type='email' 
                name='email' placeholder='Your Mail' />
            <input className={classes.Input} type='text' 
                name='street' placeholder='Street' />
            <input className={classes.Input} type='text' 
                name='postal' placeholder='Postal Code' />
            <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>); 
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (<div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>);
    } 
}

export default ContactData;