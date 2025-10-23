import React, { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LanguageContext } from '../context/languageContext';

const Blogs = () => {
  const { language } = useContext(LanguageContext);

  const blogPosts = [
    {
      id: 1,
      title: {
        en: "The Future of Medical Tourism: Trends to Watch in 2024",
        fa: "آینده گردشگری پزشکی: روندهایی که باید در سال 2024 مشاهده کنید"
      },
      content: {
        en: "The medical tourism industry is evolving rapidly, driven by technological advancements and changing patient expectations. In 2024, we're seeing a surge in telemedicine integration, where patients can consult with specialists remotely before traveling for treatment. AI-powered diagnostic tools are becoming more prevalent, offering faster and more accurate assessments. Personalized treatment plans are gaining traction, with treatments tailored to individual genetic profiles and lifestyle factors. Additionally, there's a growing emphasis on holistic wellness packages that combine medical procedures with wellness retreats, mental health support, and nutritional guidance. Sustainability is also becoming a key focus, with more clinics adopting eco-friendly practices and patients seeking destinations that prioritize environmental responsibility. As the industry matures, we're likely to see increased regulation and standardization, ensuring higher quality care and better patient outcomes worldwide.",
        fa: "صنعت گردشگری پزشکی به سرعت در حال تحول است، که توسط پیشرفت‌های فناوری و انتظارات در حال تغییر بیماران هدایت می‌شود. در سال 2024، شاهد افزایش ادغام پزشکی از راه دور هستیم، جایی که بیماران می‌توانند قبل از سفر برای درمان، با متخصصان از راه دور مشورت کنند. ابزارهای تشخیصی مبتنی بر هوش مصنوعی در حال رایج شدن هستند و ارزیابی‌های سریع‌تر و دقیق‌تری ارائه می‌دهند. برنامه‌های درمانی شخصی‌سازی شده در حال جذب هستند، با درمان‌هایی که به پروفایل ژنتیکی و عوامل سبک زندگی فرد tailoring شده‌اند. علاوه بر این، تأکید فزاینده‌ای بر بسته‌های سلامتی جامع وجود دارد که روش‌های پزشکی را با بازنشستگی‌های سلامتی، حمایت سلامت روان و راهنمایی تغذیه‌ای ترکیب می‌کنند. پایداری نیز به یک تمرکز کلیدی تبدیل شده است، با پذیرش بیشتر کلینیک‌ها از شیوه‌های دوستدار محیط زیست و بیماران که به دنبال مقصدهایی هستند که مسئولیت محیطی را اولویت می‌دهند. با成熟 صنعت، احتمالاً شاهد افزایش مقررات و استانداردسازی خواهیم بود که مراقبت با کیفیت بالاتر و نتایج بهتر بیمار را در سراسر جهان تضمین می‌کند."
      },
      image: "https://via.placeholder.com/400x250.png?text=Medical+Tourism+Trends",
      category: {
        en: "Industry Insights",
        fa: "بینش‌های صنعت"
      }
    },
    {
      id: 2,
      title: {
        en: "Top 5 Destinations for Cardiac Care Worldwide",
        fa: "5 مقصد برتر برای مراقبت قلبی در سراسر جهان"
      },
      content: {
        en: "When it comes to cardiac care, certain destinations have established themselves as global leaders in heart surgery and treatment. India stands out with its combination of highly skilled cardiologists, state-of-the-art facilities, and significantly lower costs compared to Western countries. Patients can expect world-class care at hospitals accredited by international organizations like JCI. Thailand offers excellent cardiac care with a focus on minimally invasive procedures and quick recovery times. The country's medical facilities are modern and well-equipped, with many surgeons trained in the US and Europe. Turkey has emerged as a strong contender, particularly for complex heart surgeries, with success rates comparable to top US hospitals but at a fraction of the cost. Mexico provides accessible cardiac care for North American patients, with shorter travel times and no language barriers. Finally, South Korea leads in innovative cardiac procedures, including advanced robotic surgeries and cutting-edge research in heart disease prevention.",
        fa: "وقتی صحبت از مراقبت قلبی می‌شود، برخی مقصدهای خاص خود را به عنوان رهبران جهانی در جراحی قلب و درمان تثبیت کرده‌اند. هند با ترکیبی از متخصصان قلب بسیار ماهر، امکانات پیشرفته و هزینه‌های بسیار پایین‌تر نسبت به کشورهای غربی برجسته است. بیماران می‌توانند انتظار مراقبت درجه یک جهانی را در بیمارستان‌هایی داشته باشند که توسط سازمان‌های بین‌المللی مانند JCI اعتبار دارند. تایلند مراقبت قلبی عالی با تمرکز بر روش‌های کم تهاجمی و زمان‌های بهبودی سریع ارائه می‌دهد. امکانات پزشکی کشور مدرن و مجهز است، با بسیاری از جراحان آموزش دیده در آمریکا و اروپا. ترکیه به عنوان یک رقیب قوی ظاهر شده است، به ویژه برای جراحی‌های قلب پیچیده، با نرخ موفقیت قابل مقایسه با بیمارستان‌های برتر آمریکا اما با کسری از هزینه. مکزیک مراقبت قلبی قابل دسترسی برای بیماران آمریکای شمالی فراهم می‌کند، با زمان‌های سفر کوتاه‌تر و بدون موانع زبانی. سرانجام، کره جنوبی در روش‌های قلبی نوآورانه رهبری می‌کند، از جمله جراحی‌های رباتیک پیشرفته و تحقیقات پیشرفته در پیشگیری از بیماری قلبی."
      },
      image: "https://via.placeholder.com/400x250.png?text=Cardiac+Care+Destinations",
      category: {
        en: "Treatment Guides",
        fa: "راهنماهای درمان"
      }
    },
    {
      id: 3,
      title: {
        en: "Patient Stories: Life-Changing Dental Transformations",
        fa: "داستان‌های بیماران: تحولات دندانپزشکی تغییر دهنده زندگی"
      },
      content: {
        en: "Medical tourism isn't just about major surgeries—dental procedures are becoming increasingly popular among international patients. Take Maria from Spain, who traveled to Turkey for full-mouth reconstruction. After years of dental anxiety and failed treatments at home, she found comprehensive care that included dental implants, veneers, and orthodontic work—all completed in just three weeks. The total cost was 70% less than what she would have paid in Spain, and the quality exceeded her expectations. Another inspiring story comes from John, an American expat in Thailand, who underwent extensive cosmetic dentistry including teeth whitening, bonding, and crown work. The transformation was remarkable, boosting his confidence and even helping with his career advancement. These stories highlight how dental tourism can provide not just physical improvements but also significant psychological benefits. Patients often combine their dental work with a vacation, making the experience both medically beneficial and enjoyable.",
        fa: "گردشگری پزشکی فقط درباره جراحی‌های بزرگ نیست—روش‌های دندانپزشکی در حال محبوبیت فزاینده بین بیماران بین‌المللی هستند. ماریا از اسپانیا را بگیرید که برای بازسازی کامل دهان به ترکیه سفر کرد. پس از سال‌ها اضطراب دندانپزشکی و درمان‌های ناموفق در خانه، مراقبت جامعی پیدا کرد که شامل ایمپلنت‌های دندانی، ونیرها و کار ارتودنسی بود—همه در فقط سه هفته تکمیل شد. هزینه کل 70% کمتر از آنچه در اسپانیا پرداخت می‌کرد بود و کیفیت فراتر از انتظاراتش بود. داستان الهام‌بخشی دیگر از جان، یک آمریکایی مقیم تایلند می‌آید که تحت دندانپزشکی زیبایی گسترده‌ای قرار گرفت که شامل سفید کردن دندان‌ها، باندینگ و کار تاج بود. این تحول چشمگیر بود و اعتماد به نفس او را افزایش داد و حتی به پیشرفت شغلی او کمک کرد. این داستان‌ها نشان می‌دهند که چگونه گردشگری دندانپزشکی می‌تواند نه تنها بهبودهای جسمی بلکه مزایای روانی قابل توجهی نیز فراهم کند. بیماران اغلب کار دندانپزشکی خود را با تعطیلات ترکیب می‌کنند و تجربه را هم از نظر پزشکی مفید و هم لذت‌بخش می‌کنند."
      },
      image: "https://via.placeholder.com/400x250.png?text=Dental+Transformations",
      category: {
        en: "Patient Stories",
        fa: "داستان‌های بیماران"
      }
    },
    {
      id: 4,
      title: {
        en: "Understanding Your Treatment Options: A Comprehensive Guide",
        fa: "درک گزینه‌های درمانی شما: راهنمای جامع"
      },
      content: {
        en: "Choosing the right medical tourism package requires careful consideration of several factors. First, evaluate the type of procedure you need and research destinations known for excellence in that specific area. For example, orthopedic surgeries might be best in Thailand or Singapore, while dental work could be more cost-effective in Turkey or Mexico. Consider the package inclusions—comprehensive packages typically include airport transfers, accommodation, translation services, and follow-up care. Medical insurance is crucial; ensure your policy covers international treatment or purchase travel medical insurance. Research the hospital's accreditation and doctor's credentials thoroughly. Success rates and patient reviews are important indicators of quality. Also factor in recovery time and whether you'll need to stay in the destination country during recuperation. Language barriers can be a concern, so look for hospitals with English-speaking staff or translation services. Finally, consider the total cost including travel, accommodation, and any additional expenses beyond the medical procedure itself.",
        fa: "انتخاب بسته گردشگری پزشکی مناسب نیاز به بررسی دقیق چندین عامل دارد. ابتدا، نوع روش مورد نیاز خود را ارزیابی کنید و مقصدهایی را که برای برتری در آن حوزه خاص شناخته شده‌اند، تحقیق کنید. به عنوان مثال، جراحی‌های ارتوپدی ممکن است بهترین در تایلند یا سنگاپور باشد، در حالی که کار دندانپزشکی می‌تواند در ترکیه یا مکزیک مقرون به صرفه‌تر باشد. شامل بسته‌ها را در نظر بگیرید—بسته‌های جامع معمولاً شامل انتقال فرودگاهی، اقامت، خدمات ترجمه و مراقبت پیگیری می‌شود. بیمه پزشکی ضروری است؛ اطمینان حاصل کنید که بیمه‌نامه شما درمان بین‌المللی را پوشش می‌دهد یا بیمه مسافرتی پزشکی خریداری کنید. اعتبار بیمارستان و گواهینامه‌های پزشک را به طور کامل تحقیق کنید. نرخ موفقیت و نظرات بیماران شاخص‌های مهمی از کیفیت هستند. همچنین زمان بهبودی را در نظر بگیرید و اینکه آیا نیاز به ماندن در کشور مقصد در طول بهبودی دارید یا نه. موانع زبانی می‌تواند نگرانی باشد، بنابراین بیمارستان‌هایی را جستجو کنید که کارکنان انگلیسی‌زبان یا خدمات ترجمه دارند. سرانجام، هزینه کل را از جمله سفر، اقامت و هر هزینه اضافی فراتر از خود روش پزشکی در نظر بگیرید."
      },
      image: "https://via.placeholder.com/400x250.png?text=Treatment+Options+Guide",
      category: {
        en: "Education",
        fa: "آموزش"
      }
    },
    {
      id: 5,
      title: {
        en: "Recovery and Aftercare: What to Expect Post-Treatment",
        fa: "بهبودی و مراقبت پس از درمان: چه انتظاری داشته باشید"
      },
      content: {
        en: "The recovery phase is a critical part of any medical tourism journey, and proper aftercare ensures the best possible outcomes. Most reputable medical tourism providers include follow-up care in their packages, which may involve virtual consultations with your treating physician. It's important to follow all post-operative instructions carefully, including medication schedules, wound care, and activity restrictions. Many patients choose to extend their stay in the treatment destination for initial recovery, taking advantage of hotel accommodations designed for medical tourists. Physical therapy and rehabilitation services are often available on-site. Nutrition plays a key role in recovery, and many facilities provide dietary guidance and meal planning. Mental health support is increasingly recognized as important, with counseling services available for patients adjusting to their new health status. Keep detailed records of your treatment and recovery progress to share with your home doctor. Most importantly, schedule follow-up appointments with local healthcare providers upon returning home to ensure continued monitoring and care.",
        fa: "فاز بهبودی بخشی حیاتی از هر سفر گردشگری پزشکی است و مراقبت مناسب پس از درمان بهترین نتایج ممکن را تضمین می‌کند. اکثر ارائه‌دهندگان گردشگری پزشکی معتبر مراقبت پیگیری را در بسته‌های خود شامل می‌کنند، که ممکن است شامل مشاوره‌های مجازی با پزشک درمان‌کننده شما باشد. مهم است که تمام دستورالعمل‌های پس از عمل را به دقت دنبال کنید، از جمله برنامه‌های دارویی، مراقبت از زخم و محدودیت‌های فعالیت. بسیاری از بیماران انتخاب می‌کنند که اقامت خود را در مقصد درمان برای بهبودی اولیه تمدید کنند و از اقامتگاه‌های هتل طراحی شده برای گردشگران پزشکی استفاده کنند. فیزیوتراپی و خدمات توانبخشی اغلب در محل موجود هستند. تغذیه نقش کلیدی در بهبودی دارد و بسیاری از امکانات راهنمایی غذایی و برنامه‌ریزی وعده‌های غذایی ارائه می‌دهند. حمایت سلامت روان به طور فزاینده‌ای به عنوان مهم شناخته می‌شود، با خدمات مشاوره‌ای موجود برای بیماران در حال تنظیم با وضعیت سلامت جدید خود. سوابق دقیقی از درمان و پیشرفت بهبودی خود نگه دارید تا با پزشک خانگی خود به اشتراک بگذارید. مهم‌تر از همه، پس از بازگشت به خانه، قرارهای پیگیری با ارائه‌دهندگان مراقبت بهداشتی محلی برنامه‌ریزی کنید تا نظارت و مراقبت مداوم تضمین شود."
      },
      image: "https://via.placeholder.com/400x250.png?text=Recovery+Guide",
      category: {
        en: "Aftercare",
        fa: "مراقبت پس از درمان"
      }
    },
    {
      id: 6,
      title: {
        en: "The Benefits of Combining Medical Treatment with Tourism",
        fa: "مزایای ترکیب درمان پزشکی با گردشگری"
      },
      content: {
        en: "Medical tourism offers a unique opportunity to combine necessary healthcare with enjoyable travel experiences, creating what many call 'medication.' Patients can recover in beautiful destinations while receiving top-quality medical care. For instance, someone undergoing dental work in Thailand can spend their recovery time exploring ancient temples and relaxing on pristine beaches. Cardiac patients in India might visit the Taj Mahal or enjoy cultural experiences during their rehabilitation period. This approach can make the medical journey less stressful and more rewarding. Many medical tourism packages now include wellness activities like yoga, meditation, or spa treatments to support recovery. The psychological benefits are significant—patients often return home not just healthier physically, but also mentally refreshed from their travel experiences. However, it's important to balance medical needs with activity levels during recovery. Always consult with your medical team about appropriate activities. The key is choosing destinations and packages that align both your healthcare requirements and your desire for a positive travel experience.",
        fa: "گردشگری پزشکی فرصتی منحصر به فرد برای ترکیب مراقبت بهداشتی ضروری با تجربیات سفر لذت‌بخش ارائه می‌دهد و چیزی که بسیاری آن را 'دارو' می‌نامند ایجاد می‌کند. بیماران می‌توانند در مقصدهای زیبا بهبود یابند در حالی که مراقبت پزشکی درجه یک دریافت می‌کنند. به عنوان مثال، کسی که تحت کار دندانپزشکی در تایلند قرار می‌گیرد می‌تواند زمان بهبودی خود را صرف کاوش معابد باستانی و استراحت در سواحل دست نخورده کند. بیماران قلبی در هند ممکن است از تاج محل بازدید کنند یا از تجربیات فرهنگی در طول دوره توانبخشی خود لذت ببرند. این رویکرد می‌تواند سفر پزشکی را کمتر استرس‌زا و ارزشمندتر کند. بسیاری از بسته‌های گردشگری پزشکی اکنون فعالیت‌های سلامتی مانند یوگا، مدیتیشن یا درمان‌های اسپا را برای حمایت از بهبودی شامل می‌شوند. مزایای روانی قابل توجه هستند—بیماران اغلب نه تنها از نظر جسمی سالم‌تر، بلکه از تجربیات سفر خود از نظر ذهنی تازه شده به خانه برمی‌گردند. با این حال، مهم است که نیازهای پزشکی را با سطوح فعالیت در طول بهبودی متعادل کنید. همیشه با تیم پزشکی خود در مورد فعالیت‌های مناسب مشورت کنید. کلید انتخاب مقصد و بسته‌هایی است که هم نیازهای مراقبت بهداشتی شما و هم میل شما به تجربه سفر مثبت را هم‌راستا کند."
      },
      image: "https://via.placeholder.com/400x250.png?text=Medical+Tourism+Benefits",
      category: {
        en: "Lifestyle",
        fa: "سبک زندگی"
      }
    }
  ];

  const t = {
    en: {
      blogTitle: "Medical Tourism Blog",
      blogSubtitle: "Stay informed with the latest insights, patient stories, and expert advice in medical tourism",
      shareStory: "Want to Share Your Story?",
      shareStoryText: "Have an experience with medical tourism? We'd love to hear from you!",
      contactUs: "Contact Us"
    },
    fa: {
      blogTitle: "بلاگ گردشگری پزشکی",
      blogSubtitle: "با آخرین بینش‌ها، داستان‌های بیماران و مشاوره‌های تخصصی در گردشگری پزشکی مطلع باشید",
      shareStory: "می‌خواهید داستان خود را به اشتراک بگذارید؟",
      shareStoryText: "تجربه‌ای با گردشگری پزشکی دارید؟ دوست داریم از شما بشنویم!",
      contactUs: "تماس با ما"
    }
  }[language];

  return (
    <Container className="mt-5 pt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">{t.blogTitle}</h1>
        <p className="lead text-muted">
          {t.blogSubtitle}
        </p>
      </div>

      <Row>
        {blogPosts.map((post) => (
          <Col key={post.id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src={post.image} alt={post.title[language]} />
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <span className="badge bg-primary mb-2">{post.category[language]}</span>
                </div>
                <Card.Title className="fw-bold h5">{post.title[language]}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">
                  {post.content[language].substring(0, 150)}...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <h3 className="fw-bold text-secondary">{t.shareStory}</h3>
        <p className="text-muted mb-4">
          {t.shareStoryText}
        </p>
        <button className="btn btn-primary btn-lg">
          {t.contactUs}
        </button>
      </div>
    </Container>
  );
};

export default Blogs;
