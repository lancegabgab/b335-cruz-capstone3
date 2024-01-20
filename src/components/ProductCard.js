import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import {Link} from 'react-router-dom';

export default function ProductCard({productsProp}){
	const { _id, name, description, price} = productsProp;

	return(
		<Card>
		    <Card.Body>
		        <Card.Title>{name}</Card.Title>
		        <Card.Subtitle>Description:</Card.Subtitle>
		        <Card.Text>{description}</Card.Text>
		        <Card.Subtitle>Price:</Card.Subtitle>
		        <Card.Text>{price}</Card.Text>
		        <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
		    </Card.Body>
		</Card>
	)
}