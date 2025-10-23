// src/client/src/components/TreatmentPage.js

import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { FaHeartbeat, FaTooth, FaEye, FaBone, FaBrain } from 'react-icons/fa';
import { LanguageContext } from '../context/languageContext';

// The "database" of your treatment content - now complete with i18n
const treatmentsData = {
  cardiology: {
    name: {
      en: 'Cardiology',
      fa: 'قلب و عروق'
    },
    Icon: FaHeartbeat,
    color: 'text-danger',
    description: {
      en: 'Our world-class cardiology department offers comprehensive care for heart-related conditions. We utilize the latest technology for diagnosis and treatment, ensuring the best possible outcomes for our patients.',
      fa: 'بخش قلب و عروق درجه یک ما مراقبت جامع برای شرایط مرتبط با قلب ارائه می‌دهد. ما از آخرین فناوری برای تشخیص و درمان استفاده می‌کنیم و بهترین نتایج ممکن را برای بیماران خود تضمین می‌کنیم.'
    },
    journey: [
      {
        step: 1,
        title: {
          en: 'Initial Consultation',
          fa: 'مشاوره اولیه'
        },
        description: {
          en: 'Comprehensive assessment of your heart health through advanced diagnostics.',
          fa: 'ارزیابی جامع سلامت قلب شما از طریق تشخیص پیشرفته.'
        }
      },
      {
        step: 2,
        title: {
          en: 'Personalized Treatment Plan',
          fa: 'برنامه درمانی شخصی‌سازی شده'
        },
        description: {
          en: 'Tailored strategies including medication, lifestyle changes, or surgical options.',
          fa: 'استراتژی‌های سفارشی شامل دارو، تغییرات سبک زندگی یا گزینه‌های جراحی.'
        }
      },
      {
        step: 3,
        title: {
          en: 'Procedure & Care',
          fa: 'روش و مراقبت'
        },
        description: {
          en: 'State-of-the-art procedures performed by expert cardiologists.',
          fa: 'روش‌های پیشرفته توسط متخصصان قلب انجام می‌شود.'
        }
      },
      {
        step: 4,
        title: {
          en: 'Recovery & Follow-up',
          fa: 'بهبودی و پیگیری'
        },
        description: {
          en: 'Ongoing support and monitoring for long-term heart health.',
          fa: 'پشتیبانی مداوم و نظارت برای سلامت قلب بلندمدت.'
        }
      }
    ],
    procedures: {
      en: ['Angioplasty', 'Bypass Surgery', 'Echocardiogram', 'Heart Valve Repair'],
      fa: ['آنژیوپلاستی', 'جراحی بای پس', 'اکوکاردیوگرام', 'تعمیر دریچه قلب']
    },
  },
  'dental-care': {
    name: {
      en: 'Dental Care',
      fa: 'دندان‌پزشکی'
    },
    Icon: FaTooth,
    color: 'text-warning',
    description: {
      en: 'Achieve a perfect smile with our extensive dental services. From cosmetic dentistry to complex implants and root canals, our specialists are here to help.',
      fa: 'با خدمات دندانپزشکی گسترده ما لبخند کاملی به دست آورید. از دندانپزشکی زیبایی تا ایمپلنت‌های پیچیده و درمان ریشه، متخصصان ما اینجا هستند تا کمک کنند.'
    },
    journey: [
      {
        step: 1,
        title: {
          en: 'Dental Examination',
          fa: 'معاینه دندانپزشکی'
        },
        description: {
          en: 'Thorough check-up and imaging to assess oral health.',
          fa: 'معاینه کامل و تصویربرداری برای ارزیابی سلامت دهان.'
        }
      },
      {
        step: 2,
        title: {
          en: 'Treatment Planning',
          fa: 'برنامه‌ریزی درمان'
        },
        description: {
          en: 'Customized plan for restorations, cosmetics, or preventive care.',
          fa: 'برنامه سفارشی برای ترمیم، زیبایی یا مراقبت پیشگیرانه.'
        }
      },
      {
        step: 3,
        title: {
          en: 'Procedure Execution',
          fa: 'اجرای روش'
        },
        description: {
          en: 'Painless treatments using cutting-edge dental technology.',
          fa: 'درمان‌های بدون درد با استفاده از فناوری دندانپزشکی پیشرفته.'
        }
      },
      {
        step: 4,
        title: {
          en: 'Aftercare & Maintenance',
          fa: 'مراقبت پس از درمان و نگهداری'
        },
        description: {
          en: 'Guidance on oral hygiene and regular check-ups.',
          fa: 'راهنمایی در مورد بهداشت دهان و معاینات منظم.'
        }
      }
    ],
    procedures: {
      en: ['Dental Implants', 'Veneers & Crowns', 'Teeth Whitening', 'Root Canal Therapy'],
      fa: ['ایمپلنت‌های دندانی', 'ونیر و تاج', 'سفید کردن دندان‌ها', 'درمان ریشه']
    },
  },
  // ✅ ADDED: The missing entry for Eye Surgery
  'eye-surgery': {
    name: {
      en: 'Eye Surgery',
      fa: 'جراحی چشم'
    },
    Icon: FaEye,
    color: 'text-info',
    description: {
      en: 'State-of-the-art ophthalmic services, including LASIK, cataract surgery, and treatments for various eye diseases to restore and preserve your vision.',
      fa: 'خدمات چشم‌پزشکی پیشرفته، شامل جراحی لیزیک، آب مروارید و درمان بیماری‌های مختلف چشم برای بازگرداندن و حفظ بینایی شما.'
    },
    journey: [
      {
        step: 1,
        title: {
          en: 'Vision Assessment',
          fa: 'ارزیابی بینایی'
        },
        description: {
          en: 'Detailed eye exams and diagnostic tests.',
          fa: 'معاینات چشم دقیق و آزمایش‌های تشخیصی.'
        }
      },
      {
        step: 2,
        title: {
          en: 'Surgical Planning',
          fa: 'برنامه‌ریزی جراحی'
        },
        description: {
          en: 'Precise planning for laser or surgical interventions.',
          fa: 'برنامه‌ریزی دقیق برای مداخلات لیزری یا جراحی.'
        }
      },
      {
        step: 3,
        title: {
          en: 'Vision Correction',
          fa: 'تصحیح بینایی'
        },
        description: {
          en: 'Advanced procedures like LASIK or cataract removal.',
          fa: 'روش‌های پیشرفته مانند لیزیک یا برداشتن آب مروارید.'
        }
      },
      {
        step: 4,
        title: {
          en: 'Post-Operative Care',
          fa: 'مراقبت پس از عمل'
        },
        description: {
          en: 'Monitoring and support for optimal recovery.',
          fa: 'نظارت و پشتیبانی برای بهبودی بهینه.'
        }
      }
    ],
    procedures: {
      en: ['LASIK & PRK', 'Cataract Removal', 'Glaucoma Treatment', 'Retinal Surgery'],
      fa: ['لیزیک و PRK', 'برداشتن آب مروارید', 'درمان گلوکوم', 'جراحی شبکیه']
    },
  },
  // ✅ ADDED: The missing entry for Orthopedics
  orthopedics: {
    name: {
      en: 'Orthopedics',
      fa: 'ارتوپدی'
    },
    Icon: FaBone,
    color: 'text-secondary',
    description: {
      en: 'Specialized care for musculoskeletal issues, including joint replacement, sports injuries, and spine surgery to improve mobility and quality of life.',
      fa: 'مراقبت تخصصی برای مشکلات اسکلتی-عضلانی، شامل تعویض مفصل، آسیب‌های ورزشی و جراحی ستون فقرات برای بهبود تحرک و کیفیت زندگی.'
    },
    journey: [
      {
        step: 1,
        title: {
          en: 'Injury Evaluation',
          fa: 'ارزیابی آسیب'
        },
        description: {
          en: 'Physical exams and imaging to diagnose musculoskeletal conditions.',
          fa: 'معاینات فیزیکی و تصویربرداری برای تشخیص شرایط اسکلتی-عضلانی.'
        }
      },
      {
        step: 2,
        title: {
          en: 'Rehabilitation Plan',
          fa: 'برنامه توانبخشی'
        },
        description: {
          en: 'Custom therapy and surgical options for recovery.',
          fa: 'درمانی سفارشی و گزینه‌های جراحی برای بهبودی.'
        }
      },
      {
        step: 3,
        title: {
          en: 'Surgical Intervention',
          fa: 'مداخله جراحی'
        },
        description: {
          en: 'Minimally invasive surgeries for joints and bones.',
          fa: 'جراحی‌های کم تهاجمی برای مفاصل و استخوان‌ها.'
        }
      },
      {
        step: 4,
        title: {
          en: 'Physical Therapy',
          fa: 'فیزیوتراپی'
        },
        description: {
          en: 'Guided exercises and support for full mobility restoration.',
          fa: 'تمرین‌های هدایت شده و پشتیبانی برای بازگرداندن کامل تحرک.'
        }
      }
    ],
    procedures: {
      en: ['Knee & Hip Replacement', 'Arthroscopic Surgery', 'Spinal Fusion', 'Fracture Care'],
      fa: ['تعویض زانو و لگن', 'جراحی آرتروسکوپی', 'ادغام ستون فقرات', 'مراقبت از شکستگی']
    },
  },
  // ✅ ADDED: The missing entry for Neurology
  neurology: {
    name: {
      en: 'Neurology',
      fa: 'نورولوژی'
    },
    Icon: FaBrain,
    color: 'text-primary',
    description: {
      en: 'Advanced diagnosis and treatment for disorders of the nervous system, brain, and spinal cord by our team of expert neurologists and neurosurgeons.',
      fa: 'تشخیص و درمان پیشرفته برای اختلالات سیستم عصبی، مغز و نخاع توسط تیم متخصصان نورولوژیست و جراحان مغز و اعصاب ما.'
    },
    journey: [
      {
        step: 1,
        title: {
          en: 'Neurological Assessment',
          fa: 'ارزیابی نورولوژیکی'
        },
        description: {
          en: 'Comprehensive tests including MRI and EEG for diagnosis.',
          fa: 'آزمایش‌های جامع شامل MRI و EEG برای تشخیص.'
        }
      },
      {
        step: 2,
        title: {
          en: 'Treatment Strategy',
          fa: 'استراتژی درمان'
        },
        description: {
          en: 'Medication, therapy, or surgical plans tailored to your condition.',
          fa: 'برنامه‌های دارویی، درمانی یا جراحی سفارشی برای وضعیت شما.'
        }
      },
      {
        step: 3,
        title: {
          en: 'Therapeutic Procedures',
          fa: 'روش‌های درمانی'
        },
        description: {
          en: 'Advanced treatments for epilepsy, strokes, or brain tumors.',
          fa: 'درمان‌های پیشرفته برای صرع، سکته مغزی یا تومورهای مغزی.'
        }
      },
      {
        step: 4,
        title: {
          en: 'Ongoing Management',
          fa: 'مدیریت مداوم'
        },
        description: {
          en: 'Long-term care and monitoring for neurological health.',
          fa: 'مراقبت بلندمدت و نظارت برای سلامت نورولوژیکی.'
        }
      }
    ],
    procedures: {
      en: ['Epilepsy Treatment', 'Stroke Care', 'Brain Tumor Surgery', 'Movement Disorder Therapy'],
      fa: ['درمان صرع', 'مراقبت از سکته', 'جراحی تومور مغزی', 'درمانی اختلالات حرکتی']
    },
  },
};

const TreatmentPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const treatment = treatmentsData[slug];

  const handleSelectTreatment = () => {
    navigate('/packages', {
      state: {
        treatment: treatment.name.en, // Always pass English name to match treatmentDetails keys
      },
    });
  };

  const t = {
    en: {
      notFound: "Treatment Not Found",
      notFoundDesc: "The treatment you are looking for does not exist.",
      goHome: "Go to Homepage",
      selectBtn: "Select Treatment & View Packages",
      journeyTitle: "Your Treatment Journey",
      proceduresTitle: "Common Procedures"
    },
    fa: {
      notFound: "درمان یافت نشد",
      notFoundDesc: "درمانی که به دنبال آن هستید وجود ندارد.",
      goHome: "برو به صفحه اصلی",
      selectBtn: "انتخاب درمان و مشاهده بسته‌ها",
      journeyTitle: "سفر درمانی شما",
      proceduresTitle: "روش‌های رایج"
    }
  }[language];

  if (!treatment) {
    return (
      <Container className="text-center mt-5 pt-5">
        <h2>{t.notFound}</h2>
        <p>{t.notFoundDesc}</p>
        <Button onClick={() => navigate('/home')}>{t.goHome}</Button>
      </Container>
    );
  }

  const IconComponent = treatment.Icon;

  return (
    <Container className="mt-5 pt-5">
      <Row className="align-items-center text-center text-md-start">
        <Col md={8}>
          <h1 className={`fw-bold d-inline-flex align-items-center ${treatment.color}`}>
            <IconComponent className="me-3" size={50} />
            {treatment.name[language]}
          </h1>
          <p className="lead text-muted">{treatment.description[language]}</p>
        </Col>
        <Col md={4} className="text-center">
          <Button size="lg" variant="primary" onClick={handleSelectTreatment}>
            {t.selectBtn}
          </Button>
        </Col>
      </Row>

      <hr className="my-5" />

      <h3 className="text-center mb-4">{t.journeyTitle}</h3>
      <Row className="justify-content-center">
        {treatment.journey.map((step, index) => (
          <Col key={index} md={3} sm={6} className="mb-4">
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '50px', height: '50px' }}>
                  <span className="fw-bold">{step.step}</span>
                </div>
                <Card.Title className="fw-bold h6">{step.title[language]}</Card.Title>
                <Card.Text className="text-muted small">{step.description[language]}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <hr className="my-5" />

      <h3 className="text-center mb-4">{t.proceduresTitle}</h3>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <ul className="list-unstyled">
                {treatment.procedures[language].map((proc, index) => (
                  <li key={index} className="mb-2 fs-5">✓ {proc}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TreatmentPage;