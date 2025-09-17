import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Medical Tourism: Trends to Watch in 2024",
      content: "The medical tourism industry is evolving rapidly, driven by technological advancements and changing patient expectations. In 2024, we're seeing a surge in telemedicine integration, where patients can consult with specialists remotely before traveling for treatment. AI-powered diagnostic tools are becoming more prevalent, offering faster and more accurate assessments. Personalized treatment plans are gaining traction, with treatments tailored to individual genetic profiles and lifestyle factors. Additionally, there's a growing emphasis on holistic wellness packages that combine medical procedures with wellness retreats, mental health support, and nutritional guidance. Sustainability is also becoming a key focus, with more clinics adopting eco-friendly practices and patients seeking destinations that prioritize environmental responsibility. As the industry matures, we're likely to see increased regulation and standardization, ensuring higher quality care and better patient outcomes worldwide.",
      image: "https://via.placeholder.com/400x250.png?text=Medical+Tourism+Trends",
      category: "Industry Insights"
    },
    {
      id: 2,
      title: "Top 5 Destinations for Cardiac Care Worldwide",
      content: "When it comes to cardiac care, certain destinations have established themselves as global leaders in heart surgery and treatment. India stands out with its combination of highly skilled cardiologists, state-of-the-art facilities, and significantly lower costs compared to Western countries. Patients can expect world-class care at hospitals accredited by international organizations like JCI. Thailand offers excellent cardiac care with a focus on minimally invasive procedures and quick recovery times. The country's medical facilities are modern and well-equipped, with many surgeons trained in the US and Europe. Turkey has emerged as a strong contender, particularly for complex heart surgeries, with success rates comparable to top US hospitals but at a fraction of the cost. Mexico provides accessible cardiac care for North American patients, with shorter travel times and no language barriers. Finally, South Korea leads in innovative cardiac procedures, including advanced robotic surgeries and cutting-edge research in heart disease prevention.",
      image: "https://via.placeholder.com/400x250.png?text=Cardiac+Care+Destinations",
      category: "Treatment Guides"
    },
    {
      id: 3,
      title: "Patient Stories: Life-Changing Dental Transformations",
      content: "Medical tourism isn't just about major surgeries—dental procedures are becoming increasingly popular among international patients. Take Maria from Spain, who traveled to Turkey for full-mouth reconstruction. After years of dental anxiety and failed treatments at home, she found comprehensive care that included dental implants, veneers, and orthodontic work—all completed in just three weeks. The total cost was 70% less than what she would have paid in Spain, and the quality exceeded her expectations. Another inspiring story comes from John, an American expat in Thailand, who underwent extensive cosmetic dentistry including teeth whitening, bonding, and crown work. The transformation was remarkable, boosting his confidence and even helping with his career advancement. These stories highlight how dental tourism can provide not just physical improvements but also significant psychological benefits. Patients often combine their dental work with a vacation, making the experience both medically beneficial and enjoyable.",
      image: "https://via.placeholder.com/400x250.png?text=Dental+Transformations",
      category: "Patient Stories"
    },
    {
      id: 4,
      title: "Understanding Your Treatment Options: A Comprehensive Guide",
      content: "Choosing the right medical tourism package requires careful consideration of several factors. First, evaluate the type of procedure you need and research destinations known for excellence in that specific area. For example, orthopedic surgeries might be best in Thailand or Singapore, while dental work could be more cost-effective in Turkey or Mexico. Consider the package inclusions—comprehensive packages typically include airport transfers, accommodation, translation services, and follow-up care. Medical insurance is crucial; ensure your policy covers international treatment or purchase travel medical insurance. Research the hospital's accreditation and doctor's credentials thoroughly. Success rates and patient reviews are important indicators of quality. Also factor in recovery time and whether you'll need to stay in the destination country during recuperation. Language barriers can be a concern, so look for hospitals with English-speaking staff or translation services. Finally, consider the total cost including travel, accommodation, and any additional expenses beyond the medical procedure itself.",
      image: "https://via.placeholder.com/400x250.png?text=Treatment+Options+Guide",
      category: "Education"
    },
    {
      id: 5,
      title: "Recovery and Aftercare: What to Expect Post-Treatment",
      content: "The recovery phase is a critical part of any medical tourism journey, and proper aftercare ensures the best possible outcomes. Most reputable medical tourism providers include follow-up care in their packages, which may involve virtual consultations with your treating physician. It's important to follow all post-operative instructions carefully, including medication schedules, wound care, and activity restrictions. Many patients choose to extend their stay in the treatment destination for initial recovery, taking advantage of hotel accommodations designed for medical tourists. Physical therapy and rehabilitation services are often available on-site. Nutrition plays a key role in recovery, and many facilities provide dietary guidance and meal planning. Mental health support is increasingly recognized as important, with counseling services available for patients adjusting to their new health status. Keep detailed records of your treatment and recovery progress to share with your home doctor. Most importantly, schedule follow-up appointments with local healthcare providers upon returning home to ensure continued monitoring and care.",
      image: "https://via.placeholder.com/400x250.png?text=Recovery+Guide",
      category: "Aftercare"
    },
    {
      id: 6,
      title: "The Benefits of Combining Medical Treatment with Tourism",
      content: "Medical tourism offers a unique opportunity to combine necessary healthcare with enjoyable travel experiences, creating what many call 'medication.' Patients can recover in beautiful destinations while receiving top-quality medical care. For instance, someone undergoing dental work in Thailand can spend their recovery time exploring ancient temples and relaxing on pristine beaches. Cardiac patients in India might visit the Taj Mahal or enjoy cultural experiences during their rehabilitation period. This approach can make the medical journey less stressful and more rewarding. Many medical tourism packages now include wellness activities like yoga, meditation, or spa treatments to support recovery. The psychological benefits are significant—patients often return home not just healthier physically, but also mentally refreshed from their travel experiences. However, it's important to balance medical needs with activity levels during recovery. Always consult with your medical team about appropriate activities. The key is choosing destinations and packages that align both your healthcare requirements and your desire for a positive travel experience.",
      image: "https://via.placeholder.com/400x250.png?text=Medical+Tourism+Benefits",
      category: "Lifestyle"
    }
  ];

  return (
    <Container className="mt-5 pt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Medical Tourism Blog</h1>
        <p className="lead text-muted">
          Stay informed with the latest insights, patient stories, and expert advice in medical tourism
        </p>
      </div>

      <Row>
        {blogPosts.map((post) => (
          <Col key={post.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src={post.image} alt={post.title} />
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <span className="badge bg-primary mb-2">{post.category}</span>
                </div>
                <Card.Title className="fw-bold h5">{post.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">
                  {post.excerpt}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <h3 className="fw-bold text-secondary">Want to Share Your Story?</h3>
        <p className="text-muted mb-4">
          Have an experience with medical tourism? We'd love to hear from you!
        </p>
        <button className="btn btn-primary btn-lg">
          Contact Us
        </button>
      </div>
    </Container>
  );
};

export default Blogs;
