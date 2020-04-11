import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Box(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <button id={props.id} className="box" onClick={props.boxClicked}>
                        {props.img}
                    </button>
                </Col>
            </Row>

        </Container>
    )
}

export default Box