import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PackageSection from "../components/packagesSection";

const Orthopedics = () => {
  return (
    <Container className="mt-5 pt-5">
      {/* Description */}
      <section className="mb-5">
        <h2 className="text-primary fw-bold">Orthopedics Treatment</h2>
        <p>
          Cardiology involves heart-related diagnosis and surgery with modern equipment...
        </p>
      </section>

      {/* Static packages */}
      <PackageSection />

      {/* Cancellation policy */}
      <section className="mb-5">
        <h4 className="text-danger">Cancellation & Refund Policy</h4>
        <p>
          Cancel 7 days before arrival for a full refund. After that, partial refunds may apply.
        </p>
      </section>

      {/* Gallery */}
      <section>
        <h4 className="text-info mb-3">Gallery</h4>
        <Row>
          {[1, 2, 3].map((num) => (
            <Col md={4} key={num}>
              <img
                src={`https://source.unsplash.com/400x250/?cardiology,hospital,${num}`}
                alt={`Gallery ${num}`}
                className="img-fluid rounded shadow-sm mb-3"
              />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Orthopedics;
