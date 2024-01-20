import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TurnTable from '../images/cats/TurnTable.png';
import CatTunnel from '../images/cats/CatTunnel.png';
import Scratcher from '../images/cats/Scratcher.png';
import FetchToy from '../images/dogs/FetchToy.png';
import BoneChewToy from '../images/dogs/BoneChewToy.png';
import FlirtPole from '../images/dogs/FlirtPole.png';

export default function Home() {
  const catsSectionStyle = {
    backgroundColor: '#f7f7f7',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
  };

  const dogsSectionStyle = {
    backgroundColor: '#e6f7ff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '10px',
    fontFamily: 'Verdana, sans-serif',
  };

  return (
    <Container className="text-center">
      <h1 style={{ fontFamily: 'Impact, sans-serif', fontSize: '3.5em', color: '#333' }}>FEATURED PRODUCTS</h1>

      {/* For Cats */}
      <div style={catsSectionStyle}>
        <h1 style={{ fontFamily: 'Impact, sans-serif', fontSize: '3em', color: '#333' }}>FOR CATS</h1>
        <Row>
          {/* Card 1 */}
          <Col sm={6} md={4}>
            <Card style={{ borderWidth: '3px', margin: '10px', fontFamily: 'Verdana, sans-serif' }}>
              <Card.Img variant="top" src={TurnTable} alt="Cat TurnTable" />
              <Card.Body>
                <Card.Title>Cat TurnTable</Card.Title>
                <Card.Text>
                  The Cat Turn Table is an interactive toy designed to engage and entertain your cat with its rotating platform and strategically placed openings. This dynamic play station stimulates your cat's natural instincts, providing both mental and physical exercise. With built-in compartments for treats or toys, the Cat Turn Table makes playtime a rewarding and enriching experience for your feline companion.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col sm={6} md={4}>
            <Card style={{ borderWidth: '3px', margin: '10px', fontFamily: 'Verdana, sans-serif' }}>
              <Card.Img variant="top" src={CatTunnel} alt="Cat Tunnel" />
              <Card.Body>
                <Card.Title>Cat Tunnel</Card.Title>
                <Card.Text>
                  The Cat Tunnel offers a durable and collapsible design, providing a stimulating environment for cats to play and exercise. Its vibrant colors, crinkly texture, and dangling toys capture feline curiosity, promoting engaging activities. The tunnel's soft, plush interior also serves as a cozy retreat for napping, making it a versatile and beloved addition to a cat-friendly space.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col sm={6} md={4}>
            <Card style={{ borderWidth: '3px', margin: '10px', fontFamily: 'Verdana, sans-serif' }}>
              <Card.Img variant="top" src={Scratcher} alt="Scratcher Toy" />
              <Card.Body>
                <Card.Title>Scratcher Toy</Card.Title>
                <Card.Text>
                  The Scratcher Toy offers a satisfying outlet for your cat's natural scratching instincts, featuring durable sisal material or sturdy cardboard construction. This feline-friendly accessory not only promotes healthy claws but also keeps your furniture protected from scratches. Compact in design and often infused with catnip, the Scratcher Toy provides an entertaining and stress-relieving experience for your cat.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* For Dogs */}
      <div style={dogsSectionStyle}>
        <h1 style={{ fontFamily: 'Impact, sans-serif', fontSize: '3em', color: '#333' }}>FOR DOGS</h1>
        <Row>
          {/* Card 1 */}
          <Col sm={6} md={4}>
            <Card style={{ borderWidth: '3px', margin: '10px', fontFamily: 'Verdana, sans-serif' }}>
              <Card.Img variant="top" src={FetchToy} alt="Fetching Toy" />
              <Card.Body>
                <Card.Title>Fetching Toy</Card.Title>
                <Card.Text>
                  The Fetch Toy is a lightweight and durable accessory designed for interactive play, allowing dogs to engage in thrilling games of fetch. Its vibrant colors and buoyant design make it a lively choice for outdoor activities, promoting hours of energetic playtime. The toy's ergonomic design ensures easy grasping, fostering a strong bond between you and your pup during fun and stimulating play sessions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 2 */}
          <Col sm={6} md={4}>
            <Card style={{ borderWidth: '3px', margin: '10px', fontFamily: 'Verdana, sans-serif' }}>
              <Card.Img variant="top" src={BoneChewToy} alt="Bone Chew Toy" />
              <Card.Body>
                <Card.Title>Bone Chew Toy</Card.Title>
                <Card.Text>
                  The Bone Chew Toy is a durable and non-toxic accessory designed to promote healthy dental habits in dogs. Its textured surface provides a satisfying chewing experience, reducing boredom and preventing destructive chewing behaviors. Constructed from high-quality, bite-resistant materials, this engaging toy supports dental health by minimizing plaque and tartar buildup, contributing to both oral hygiene and mental stimulation for your pet.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Card 3 */}
          <Col sm={6} md={4}>
            <Card style={{ borderWidth: '3px', margin: '10px', fontFamily: 'Verdana, sans-serif' }}>
              <Card.Img variant="top" src={FlirtPole} alt="Flirt Pole" />
              <Card.Body>
                <Card.Title>Flirt Pole</Card.Title>
                <Card.Text>
                  The Flirt Pole is an interactive toy designed for active dogs, featuring an extendable pole and an enticing lure to simulate the excitement of chasing prey. With its lightweight design and erratic lure movements, this toy promotes both physical exercise and mental stimulation, keeping your dog engaged and entertained. The Flirt Pole offers a dynamic and versatile play experience, fostering a strong bond between you and your canine companion during lively play sessions.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}