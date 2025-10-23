import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PackageSection from "../components/packagesSection";
import { LanguageContext } from "../context/languageContext";

const Orthopedics = () => {
  const { language } = useContext(LanguageContext);

  const t = {
    en: {
      title: "Orthopedics Treatment",
      description: "Specialized care for musculoskeletal issues, including joint replacement, sports injuries, and spine surgery.",
      cancellationTitle: "Cancellation & Refund Policy",
      cancellationDesc: "Cancel 7 days before arrival for a full refund. After that, partial refunds may apply.",
      gallery: "Gallery",
    },
    fa: {
      title: "درمان ارتوپدی",
      description: "مراقبت تخصصی برای مشکلات اسکلتی-عضلانی، شامل تعویض مفصل، آسیب‌های ورزشی و جراحی ستون فقرات.",
      cancellationTitle: "سیاست لغو و بازپرداخت",
      cancellationDesc: "لغو ۷ روز قبل از ورود برای بازپرداخت کامل. پس از آن، بازپرداخت جزئی ممکن است اعمال شود.",
      gallery: "گالری",
    },
  }[language];

  return (
    <Container className="mt-5 pt-5">
      {/* Description */}
      <section className="mb-5">
        <h2 className="text-primary fw-bold">{t.title}</h2>
        <p>
          {t.description}
        </p>
      </section>

      {/* Static packages */}
      <PackageSection />

      {/* Cancellation policy */}
      <section className="mb-5">
        <h4 className="text-danger">{t.cancellationTitle}</h4>
        <p>
          {t.cancellationDesc}
        </p>
      </section>

      {/* Gallery */}
      <section>
        <h4 className="text-info mb-3">{t.gallery}</h4>
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
