import React from 'react'
import { Card } from 'react-bootstrap'
import classes from './Search.module.css'

const NoProducts = () => {
    return (
        <div className={classes.games}>          
        <Card>
        <Card.Img variant="top" src="https://www.teahub.io/photos/full/289-2899388_matrix-error.jpg"/>
        <Card.Body>
        <Card.Title style={{color:"red",fontFamily:"monospace"}}><h1>No Games Found !!</h1></Card.Title>
        </Card.Body>
        </Card>
        </div>
    )
}

export default NoProducts
