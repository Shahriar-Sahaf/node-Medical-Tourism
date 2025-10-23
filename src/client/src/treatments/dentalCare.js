import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PackageSection from "../components/packagesSection";
import { LanguageContext } from "../context/languageContext";

const DentalCare = () => {
  const { language } = useContext(LanguageContext);

  const t = {
    en: {
      title: "Dental Care Treatment",
      description: "Our dental care services include cosmetic, surgical, and general dentistry with experienced professionals and state-of-the-art equipment at competitive prices.",
      cancellationTitle: "Cancellation & Refund Policy",
      cancellationDesc: "Cancel 7 days before arrival for a full refund. After that, partial refunds may apply depending on the service stage.",
      gallery: "Gallery",
    },
    fa: {
      title: "درمان دندان‌پزشکی",
      description: "خدمات دندان‌پزشکی ما شامل دندان‌پزشکی زیبایی، جراحی و عمومی با متخصصان با تجربه و تجهیزات پیشرفته با قیمت‌های رقابتی است.",
      cancellationTitle: "سیاست لغو و بازپرداخت",
      cancellationDesc: "لغو ۷ روز قبل از ورود برای بازپرداخت کامل. پس از آن، بازپرداخت جزئی بسته به مرحله خدمات ممکن است اعمال شود.",
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

export default DentalCare;
